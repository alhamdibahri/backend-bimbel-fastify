const Users = require(model + "pengguna/users.model")
const Siswa = require(model + 'siswa/siswa.model')
const Schools = require(model + 'support/schools.model')
const { Validator } = require(base+'service/Validator');
const storage = require(base+'service/Storage');
async function index(req,res){
    
    let data = await this.DB('SELECT * FROM (pengguna.users u JOIN pengguna.roles r ON u.role_id=r.id_role) LEFT JOIN guru.guru g ON u.id_user=g.user_id WHERE role=$1 AND status=$2 ORDER BY id_user DESC', ['SISWA', req.params.status])

    this.responseSuccess({
        code: 200,
        status: true,
        values: data.get(),
        message: 'Data Siswa berhasil di dapatkan'
    })
}

async function update(req,res){
    
    let request = req.body

    let unique = await Users.query().where('id_user', '<>', request.id).whereRaw('lower(no_handphone::text) = lower(\'' + request.no_handphone + '\')').first();

    Validator.register('unique', function(value, requirement, attribute) {
        return typeof unique == 'undefined'
    }, 'No Handphone sudah ada yang menggunakan.');

    let cek = await Siswa.query().where('user_id', request.id)

    this.validation(request, {
        jenis_kelamin: 'required',
        agama: 'required',
        provinsi: 'required',
        kabupaten: 'required',
        kecamatan: 'required',
        desa: 'required',
        nama: 'required',
        tempat_lahir: 'required',
        tanggal_lahir: 'required',
        alamat: 'required',
        no_handphone: 'required|unique',
        kategori_kelas: 'required',
        kelas: 'required',
        sekolah: 'required'
    })

    if(cek.length > 0){
        await Siswa.query().patch({
            kategori_kelas_id:request.kategori_kelas,
            kelas_id:request.kelas,
            school_id:request.sekolah
        }).where('user_id', request.id)
    }else{
        await Siswa.query().insert({
            user_id: request.id,
            kategori_kelas_id:request.kategori_kelas,
            kelas_id:request.kelas,
            school_id:request.sekolah
        }) 
    }

    let update = await 
                Users
                .query()
                .patch({
                    gender_id:request.jenis_kelamin,
                    religion_id:request.agama,
                    province_id:request.provinsi,
                    regency_id:request.kabupaten,
                    district_id:request.kecamatan,
                    village_id:request.desa,
                    nama:request.nama,
                    tempat_lahir:request.tempat_lahir,
                    tanggal_lahir:request.tanggal_lahir,
                    alamat:request.alamat,
                    no_handphone:request.no_handphone
                }).where('id_user', request.id)

    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'Data Siswa berhasil di Simpan'
        })
    }else{
        this.responseError({
            code:404,
            status: true,
            values: {},
            message: 'Data Siswa Gagal di Simpan'
        })
    }

    
}

async function show(req,res){
    let data = await Users
                        .query()
                        .eager('[religions,genders,provinces,regencies,districts,villages,roles, siswa.[schools,kategori_kelas,kelas]]')
                        .where('id_user', req.params.id)

    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Siswa Berhasil di dapatkan'
    })
}

async function edit(req,res){
    let cek = await Siswa.query().where('user_id', req.params.id)
    
    if(cek.length > 0){
        let data = await Users.query().eager('siswa').where('id_user', req.params.id)
        this.responseSuccess({
            code: 200,
            status: true,
            values: data,
            message: 'Data Siswa Berhasil di dapatkan'
        })
    }else{
        let data = await Users.query().where('id_user', req.params.id)
        this.responseSuccess({
            code: 200,
            status: true,
            values: data,
            message: 'Data Siswa Berhasil di dapatkan'
        })
    }

}

async function ddlschool(req,res){
    let data = ""
    if(req.params.bentuk == 'Umum'){
        data = {}
    }else{
        data = await Schools.query()
            .where('bentuk', req.params.bentuk)
            .where('regency_id', req.params.regency)
    }

    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Sekolah Berhasil di dapatkan'
    })
}

async function editprofil(req,res){
    let data = await Users
                    .query()
                    .eager('[religions,genders,provinces,regencies,districts,villages, siswa.[schools,kategori_kelas,kelas]]')
                    .where('id_user', req.params.id)
                    .where('role_id', 3)

    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Siswa Berhasil di dapatkan'
    })
}

async function updateprofil(req,res){
    let request = req.body

    let unique = await Users.query().where('id_user', '<>', request.id).whereRaw('lower(no_handphone::text) = lower(\'' + request.handphone + '\')').first();

    Validator.register('unique', function(value, requirement, attribute) {
        return typeof unique == 'undefined'
    }, 'No Handphone sudah ada yang menggunakan.');

    let cek = await Siswa.query().where('user_id', request.id)

    this.validation(req.body, {
        sekolah: request.bentuk == 'Umum' ? 'min:0' : 'required',
        kelas: 'required',
        kategori_kelas: 'required',
        handphone: 'required|unique',
        alamat: 'required',
        desa: 'required',
        kecamatan: 'required',
        kabupaten: 'required',
        provinsi: 'required',
        tanggal_lahir: 'required',
        tempat_lahir: 'required',
        agama: 'required',
        jenis_kelamin: 'required',
        nama: 'required',
    })

    if(req.body.foto){
        await storage.putAs('foto_user', req.body.foto[0].filename, req.body.foto[0].data)

        await Users.query()
        .update({
            gender_id:request.jenis_kelamin,
            religion_id:request.agama,
            province_id:request.provinsi,
            regency_id:request.kabupaten,
            district_id:request.kecamatan,
            village_id:request.desa,
            nama:request.nama,
            tempat_lahir: request.tempat_lahir,
            tanggal_lahir:request.tanggal_lahir,
            alamat:request.alamat,
            no_handphone:request.handphone,
            foto: req.body.foto[0].filename,
            status: req.users.status == '2' ? '0' : req.users.status,
            baca: req.users.status == '2' ? '0' : req.users.baca,
        }).where('id_user', request.id)

    }else{
        await Users.query()
        .update({
            gender_id:request.jenis_kelamin,
            religion_id:request.agama,
            province_id:request.provinsi,
            regency_id:request.kabupaten,
            district_id:request.kecamatan,
            village_id:request.desa,
            nama:request.nama,
            tempat_lahir: request.tempat_lahir,
            tanggal_lahir:request.tanggal_lahir,
            alamat:request.alamat,
            no_handphone:request.handphone,
            status: req.users.status == '2' ? '0' : req.users.status,
            baca: req.users.status == '2' ? '0' : req.users.baca,
        }).where('id_user', request.id)
    }

    if(cek.length > 0){
        await Siswa.query().patch({
            kategori_kelas_id:request.kategori_kelas,
            kelas_id:request.kelas,
            school_id: request.bentuk == 'Umum' ? null : request.sekolah
        }).where('user_id', request.id)
    }else{
        await Siswa.query().insert({
            user_id: request.id,
            kategori_kelas_id:request.kategori_kelas,
            kelas_id:request.kelas,
            school_id: request.bentuk == 'Umum' ? null : request.sekolah
        }) 
    }

   

    // if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values: '',
            message: 'Profil Berhasil di Update'
        })
    // }else{
    //     this.responseError({
    //         code:404,
    //         status: true,
    //         values: {},
    //         message: 'Data Siswa Gagal di Simpan'
    //     })
    // }
}

async function siswaguru(req,res){
    let data = await this.DB('SELECT DISTINCT u.uid, u.id_user, u.nama, u.foto, sl.sekolah, d.district, kk.kategori_kelas, k.kelas FROM (pengguna.users u JOIN support.districts d ON u.district_id=d.id_district) JOIN (guru.guru g JOIN (siswa.history h JOIN (((siswa.siswa s JOIN guru.kelas k ON k.id_kelas=s.kelas_id) JOIN guru.kategori_kelas kk ON kk.id_kategori_kelas=s.kategori_kelas_id) LEFT JOIN support.schools sl ON sl.id_school=s.school_id) ON h.siswa_kd=s.kd_siswa) ON g.kd_guru=h.guru_kd) ON u.id_user=s.user_id WHERE g.user_id=$1 AND h.status_history=1::varchar ORDER BY u.nama ASC', [req.users.id_user])

    this.responseSuccess({
        code:200,
        status: true,
        values: data.get(),
        message: 'Data History Berhasil di dapatkan'
    })
}

// async function siswaall(req, res){
//     let data = await this.DB('SELECT DISTINCT u.uid, u.id_user, u.nama, u.foto, sl.sekolah, d.district, kk.kategori_kelas, k.kelas,(SELECT nama FROM pengguna.users us WHERE us.id_user=g.user_id) AS nama_guru FROM (pengguna.users u JOIN support.districts d ON u.district_id=d.id_district) JOIN (guru.guru g JOIN (siswa.history h JOIN (((siswa.siswa s JOIN guru.kelas k ON k.id_kelas=s.kelas_id) JOIN guru.kategori_kelas kk ON kk.id_kategori_kelas=s.kategori_kelas_id) JOIN support.schools sl ON sl.id_school=s.school_id) ON h.siswa_kd=s.kd_siswa) ON g.kd_guru=h.guru_kd) ON u.id_user=s.user_id WHERE NOT s.user_id=$1 AND h.status_history=1::varchar ORDER BY u.nama ASC', [req.users.id_user])

//     this.responseSuccess({
//         code:200,
//         status: true,
//         values: data.get(),
//         message: 'Data History Berhasil di dapatkan'
//     })  
// }

module.exports = {
    index, show, update, edit, ddlschool, editprofil, updateprofil, siswaguru
}