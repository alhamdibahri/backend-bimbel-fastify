const Users = require(model + "pengguna/users.model")
const Guru = require(model + 'guru/guru.model')
const JenisHarga = require(model + 'guru/jenis-harga.model')
const Pelajaran = require(model + 'guru/mata-pelajaran.model')
const { Validator } = require(base+'service/Validator');
const Educations = require(model + 'support/educations.model')
const storage = require(base+'service/Storage');

async function index(req,res){
    
    let data = await this.DB('SELECT * FROM (pengguna.users u JOIN pengguna.roles r ON u.role_id=r.id_role) LEFT JOIN guru.guru g ON u.id_user=g.user_id WHERE role=$1 AND status=$2 ORDER BY id_user DESC', ['GURU', req.params.status])

    this.responseSuccess({
        code: 200,
        status: true,
        values: data.get(),
        message: 'Data Guru berhasil di dapatkan'
    })
}

async function update(req,res){
    
    let request = req.body

    let unique = await Users.query().where('id_user', '<>', request.id).whereRaw('lower(no_handphone::text) = lower(\'' + request.no_handphone + '\')').first();

    Validator.register('unique', function(value, requirement, attribute) {
        return typeof unique == 'undefined'
    }, 'No Handphone sudah ada yang menggunakan.');

    let cek = await Guru.query().where('user_id', request.id)

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
        pendidikan: 'required',
        kategori_kelas: 'required',
        kelas: 'required',
        mata_pelajaran: 'required',
        jenis_harga: 'required',
        harga: 'required'
    })

    if(cek.length > 0){
        await Guru.query().patch({
            education_id:request.pendidikan,
            kategori_kelas_id:request.kategori_kelas,
            kelas_id:request.kelas,
            mata_pelajaran_id:request.mata_pelajaran,
            jenis_harga_id: request.jenis_harga,
            harga: request.harga
        }).where('user_id', request.id)
    }else{
        await Guru.query().insert({
            user_id: request.id,
            education_id:request.pendidikan,
            kategori_kelas_id:request.kategori_kelas,
            kelas_id:request.kelas,
            mata_pelajaran_id:request.mata_pelajaran,
            jenis_harga_id: request.jenis_harga,
            harga: request.harga
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
            message: 'Data Guru berhasil di Simpan'
        })
    }else{
        this.responseError({
            code:404,
            status: true,
            values: {},
            message: 'Data Admin Gagal di Simpan'
        })
    }

    
}

async function show(req,res){
    let data = await Users.query().eager('[religions,genders,provinces,regencies,districts,villages,roles, guru.[educations,kategori_kelas,kelas,mata_pelajaran,jenis_harga,pekerjaan]]').where('id_user', req.params.id)

    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Guru Berhasil di dapatkan'
    })
}

async function edit(req,res){

    let cek = await Guru.query().where('user_id', req.params.id)
    
    if(cek.length > 0){
        let data = await Users.query().eager('guru').where('id_user', req.params.id)
        this.responseSuccess({
            code: 200,
            status: true,
            values: data,
            message: 'Data Guru Berhasil di dapatkan'
        })
    }else{
        let data = await Users.query().where('id_user', req.params.id)
        this.responseSuccess({
            code: 200,
            status: true,
            values: data,
            message: 'Data Guru Berhasil di dapatkan'
        })
    }
}

async function ddleducation(req,res){
    let data = await Educations.query()

    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Pendidikan Berhasil di dapatkan'
    })
}

async function ddlpelajaran(req,res){
    let data = await Pelajaran.query().where('kelas_id', req.params.id)

    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Pelajaran Berhasil di dapatkan'
    })
}


async function ddljenisharga(req,res){
    let data = await JenisHarga.query()

    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Jenis Harga Berhasil di dapatkan'
    })
}

async function allguru(req, res){

    let column = ""
    let where = ""
    let parameter = ['GURU', req.users.id_user]

    //sorting
    if(req.body.sort == "terbaru"){
        column = "ORDER BY u.nama DESC"
    }else if(req.body.sort == "terlama"){
        column = "ORDER BY u.nama ASC"
    }else if(req.body.sort == "tertinggi"){
        column = "ORDER BY count DESC, rating DESC, u.nama ASC"
    }else if(req.body.sort == "terendah"){
        column = "ORDER BY count ASC, rating ASC, u.nama ASC"
    }else if(req.body.sort == "termahal"){
        column = "ORDER BY jh.jenis_harga ASC, g.harga DESC, u.nama ASC"
    }else if(req.body.sort == "termurah"){
        column = "ORDER BY jh.jenis_harga ASC, g.harga ASC, u.nama ASC"
    }else{
        column = "ORDER BY d.id_district DESC"
    }

    //filter
    if(req.body.kategori_kelas){
        where = `AND kk.id_kategori_kelas=$3`
        parameter = ['GURU', req.users.id_user, req.body.kategori_kelas]
    }
    if(req.body.jenis_harga){
        where = `AND jh.id_jenis_harga=$3`
        parameter = ['GURU', req.users.id_user, req.body.jenis_harga]
    }
    if(req.body.kategori_kelas && req.body.kelas){
        where = `AND kk.id_kategori_kelas=$3 AND k.id_kelas=$4`
        parameter = ['GURU', req.users.id_user, req.body.kategori_kelas, req.body.kelas]
    }
    if(req.body.kategori_kelas && req.body.jenis_harga){
        where = `AND kk.id_kategori_kelas=$3 AND jh.id_jenis_harga=$4`
        parameter = ['GURU', req.users.id_user, req.body.kategori_kelas, req.body.jenis_harga]
    }
    if(req.body.kategori_kelas && req.body.kelas && req.body.mata_pelajaran){
        where = `AND kk.id_kategori_kelas=$3 AND k.id_kelas=$4 AND mp.id_mata_pelajaran=$5`
        parameter = ['GURU', req.users.id_user, req.body.kategori_kelas, req.body.kelas,req.body.mata_pelajaran]
    }
    if(req.body.kategori_kelas && req.body.kelas && req.body.jenis_harga){
        where = `AND kk.id_kategori_kelas=$3 AND k.id_kelas=$4 AND jh.id_jenis_harga=$5`
        parameter = ['GURU', req.users.id_user, req.body.kategori_kelas, req.body.kelas, req.body.jenis_harga]
    }
    if(req.body.kategori_kelas && req.body.kelas && req.body.mata_pelajaran && req.body.jenis_harga){
        where = `AND kk.id_kategori_kelas=$3 AND k.id_kelas=$4 AND mp.id_mata_pelajaran=$5 AND jh.id_jenis_harga=$6`
        parameter = ['GURU', req.users.id_user, req.body.kategori_kelas, req.body.kelas, req.body.mata_pelajaran, req.body.jenis_harga]
    }


    let data = await this.DB(`SELECT u.id_user, g.kd_guru, u.nama, u.foto, g.harga, d.district,d.id_district, kk.kategori_kelas, mp.mata_pelajaran, k.kelas, jh.jenis_harga, CAST(COALESCE(round(CAST((SELECT CAST(SUM(nilai_rating)AS DOUBLE PRECISION)/(SELECT COUNT(*) FROM siswa.ratings r JOIN guru.guru gr ON r.guru_kd=gr.kd_guru WHERE g.kd_guru=gr.kd_guru) FROM siswa.ratings r JOIN guru.guru gr ON r.guru_kd=gr.kd_guru WHERE g.kd_guru=gr.kd_guru) as numeric), 1) ,0) AS DOUBLE PRECISION) AS rating, (SELECT gf.id_guru_favorite FROM siswa.guru_favorite gf JOIN siswa.siswa sw ON gf.siswa_kd=sw.kd_siswa AND gf.guru_kd=g.kd_guru WHERE sw.user_id=$2), CAST((SELECT COUNT(*) FROM siswa.ratings WHERE guru_kd=g.kd_guru) AS DOUBLE PRECISION) FROM ((pengguna.users u LEFT JOIN support.districts d ON u.district_id=d.id_district) JOIN pengguna.roles r ON u.role_id=r.id_role) LEFT JOIN ((((guru.guru g JOIN guru.jenis_harga jh ON g.jenis_harga_id=jh.id_jenis_harga) JOIN guru.kelas k ON g.kelas_id=k.id_kelas) JOIN guru.mata_pelajaran mp ON g.mata_pelajaran_id=mp.id_mata_pelajaran) JOIN guru.kategori_kelas kk ON g.kategori_kelas_id=kk.id_kategori_kelas) ON u.id_user=g.user_id WHERE r.role=$1 AND u.status=1::varchar ${where} ${column} `, parameter)
    

    this.responseSuccess({
        code: 200,
        status: true,
        values: data.get(),
        message: 'Data Guru Berhasil di dapatkan'
    })

    
}

async function editprofil(req,res){
    let data = await Users
                    .query()
                    .eager('[religions,genders,provinces,regencies,districts,villages, guru.[educations,kategori_kelas,kelas,mata_pelajaran,jenis_harga,pekerjaan]]')
                    .where('id_user', req.params.id)
                    .where('role_id', 2)

    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Guru Berhasil di dapatkan'
    })
}

async function updateprofil(req,res){
    let request = req.body

    let unique = await Users.query().where('id_user', '<>', request.id).whereRaw('lower(no_handphone::text) = lower(\'' + request.handphone + '\')').first();

    Validator.register('unique', function(value, requirement, attribute) {
        return typeof unique == 'undefined'
    }, 'No Handphone sudah ada yang menggunakan.');

    let cek = await Guru.query().where('user_id', request.id)

    this.validation(req.body, {
        keahlian: 'required',
        jadwal: 'required',
        harga: 'required',
        kategori_harga: 'required',
        mata_pelajaran: 'required',
        kelas: 'required',
        kategori_kelas: 'required',
        handphone: 'required|unique',
        alamat: 'required',
        desa: 'required',
        kecamatan: 'required',
        kabupaten: 'required',
        provinsi: 'required',
        pekerjaan: 'required',
        pendidikan: 'required',
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
        await Guru.query().patch({
            education_id: request.pendidikan,
            kategori_kelas_id:request.kategori_kelas,
            kelas_id:request.kelas,
            mata_pelajaran_id:request.mata_pelajaran,
            jenis_harga_id: request.kategori_harga,
            pekerjaan_id: request.pekerjaan,
            harga: request.harga,
            jadwal: request.jadwal,
            keahlian: request.keahlian
        }).where('user_id', request.id)
    }else{
        await Guru.query().insert({
            user_id: request.id,
            education_id: request.pendidikan,
            kategori_kelas_id:request.kategori_kelas,
            kelas_id:request.kelas,
            mata_pelajaran_id:request.mata_pelajaran,
            jenis_harga_id: request.kategori_harga,
            pekerjaan_id: request.pekerjaan,
            harga: request.harga,
            jadwal: request.jadwal,
            keahlian: request.keahlian
        }) 
    }

    this.responseSuccess({
        code:200,
        status: true,
        values: '',
        message: 'Profil Berhasil di Update'
    })
}

async function messageGuru(req,res){
    if(req.users.status == "0"){
        this.responseError({
            code: 404,
            status: false,
            values: {},
            message: "Segera Lengkapi profil anda, agar di verifikasi oleh admin"
        })
    }else if(req.users.status == "1"){
            this.responseSuccess({
                code: 200,
                status: true,
                values: {},
                message: 'Akun Berhasil di verifikasi'
            })
    }else{
        this.responseError({
            code: 404,
            status: false,
            values: {},
            message: "Verifikasi anda ditolak, cek kembali data diri anda untuk mengajukan verifikasi ulang"
        })
    }
}


module.exports = {
    index, show, update, edit, ddleducation, ddlpelajaran, allguru, ddljenisharga, editprofil, updateprofil, messageGuru
}