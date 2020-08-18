const History = require(model + "siswa/history.model")
const Siswa = require(model + 'siswa/siswa.model')
const { uuid } = require('uuidv4');

async function index(req,res){

    let request = req.body
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    const yyyy = today.getFullYear();
    if(dd<10) { dd=`0${dd}`; }
    if(mm<10) { mm=`0${mm}`; }

    today = `${yyyy}-${mm}-${dd}`;

    if(req.users.status == "0"){
        this.responseError({
            code: 404,
            status: false,
            values: {},
            message: "Segera Lengkapi profil anda, agar di verifikasi oleh admin"
        })
    }else if(req.users.status == "1"){
        let cek = await Siswa.query().where('user_id', req.users.id_user)
        if(cek.length > 0){
            const uuid1 = uuid()
            await History.query().insert({
                id_history: uuid1,
                tanggal_history: today,
                status_history:"0",
                jadwal_history:request.jadwal,
                guru_kd: request.kd_guru,
                siswa_kd: cek[0].kd_siswa
            }) 

            this.responseSuccess({
                code:200,
                status: true,
                values: uuid1,
                message: 'Pengajuan Bimbingan Berhasil di Ajukan, Silahkan cek menu history'
            })
        }else{
            this.responseError({
                code:403,
                status: true,
                values: {},
                message: 'Lengkapi profil anda agar bisa mengajukan bimbingan'
            })
        }
    }else{
        this.responseError({
            code: 404,
            status: false,
            values: {},
            message: "Verifikasi anda ditolak, cek kembali data diri anda untuk mengajukan verifikasi ulang"
        })
    }
    
}

async function history(req, res){
    let data = ""
    if(req.users.role == "SISWA"){
         data = await this.DB('SELECT u.uid, u.nama, u.foto, mp.mata_pelajaran, h.id_history, h.tanggal_history, h.status_history, kk.kategori_kelas FROM pengguna.users u JOIN (((guru.guru g JOIN guru.kategori_kelas kk ON g.kategori_kelas_id=kk.id_kategori_kelas) JOIN (siswa.history h JOIN siswa.siswa s ON h.siswa_kd=s.kd_siswa) ON g.kd_guru=h.guru_kd) JOIN guru.mata_pelajaran mp ON g.mata_pelajaran_id=mp.id_mata_pelajaran) ON u.id_user=g.user_id WHERE s.user_id=$1 AND h.status_history=$2', [req.users.id_user, req.params.status])
    }else{
        data = await this.DB('SELECT u.uid, u.nama, u.foto, h.tanggal_history, h.status_history,h.id_history, sl.sekolah, kk.kategori_kelas FROM pengguna.users u JOIN (guru.guru g JOIN (siswa.history h JOIN ((siswa.siswa s JOIN guru.kategori_kelas kk ON s.kategori_kelas_id=kk.id_kategori_kelas) LEFT JOIN support.schools sl ON sl.id_school=s.school_id) ON h.siswa_kd=s.kd_siswa) ON g.kd_guru=h.guru_kd) ON u.id_user=s.user_id WHERE g.user_id=$1 AND h.status_history=$2', [req.users.id_user, req.params.status])
    }

    this.responseSuccess({
        code:200,
        status: true,
        values: data.get(),
        message: 'Data History Berhasil di dapatkan'
    })
}

async function detail_history(req, res){
    let data = "" 
    if(req.users.role == "SISWA"){
         data = await this.DB('SELECT u.id_user,u.uid, u.nama, u.foto, mp.mata_pelajaran, h.id_history, h.tanggal_history, h.status_history, h.jadwal_history, kk.kategori_kelas, k.kelas, g.harga, kh.jenis_harga, g.kd_guru, s.kd_siswa, r.nilai_rating, h.keterangan_history FROM pengguna.users u JOIN (((((guru.guru g JOIN guru.jenis_harga kh ON kh.id_jenis_harga=g.jenis_harga_id) JOIN guru.kelas k ON g.kelas_id=k.id_kelas) JOIN guru.kategori_kelas kk ON g.kategori_kelas_id=kk.id_kategori_kelas) JOIN ((siswa.history h LEFT JOIN siswa.ratings r ON r.history_id=h.id_history) JOIN siswa.siswa s ON h.siswa_kd=s.kd_siswa) ON g.kd_guru=h.guru_kd) JOIN guru.mata_pelajaran mp ON g.mata_pelajaran_id=mp.id_mata_pelajaran) ON u.id_user=g.user_id WHERE h.id_history=$1', [req.params.id])
    }else{
        data = await this.DB('SELECT u.id_user, u.uid, u.nama, u.foto, h.tanggal_history, h.status_history, h.jadwal_history, sl.sekolah, kk.kategori_kelas, k.kelas, g.harga, jh.jenis_harga, g.kd_guru, s.kd_siswa, h.keterangan_history FROM pengguna.users u JOIN ((guru.guru g JOIN guru.jenis_harga jh ON jh.id_jenis_harga=g.jenis_harga_id) JOIN (siswa.history h JOIN (((siswa.siswa s JOIN guru.kelas k ON k.id_kelas=s.kelas_id) JOIN guru.kategori_kelas kk ON kk.id_kategori_kelas=s.kategori_kelas_id) LEFT JOIN support.schools sl ON sl.id_school=s.school_id) ON h.siswa_kd=s.kd_siswa) ON g.kd_guru=h.guru_kd)  ON u.id_user=s.user_id WHERE h.id_history=$1', [req.params.id])
    }

    if(data.first()){
        this.responseSuccess({
            code:200,
            status: true,
            values: data.first(),
            message: 'Data History Berhasil di dapatkan'
        })
    }else{
        this.responseError({
            code:404,
            status: false,
            values: {},
            message: 'Data History Gagal di dapatkan'
        })
    }
    
}

async function terima(req,res){
    await History.query()
    .patch({
        status_history:"1"
    }).where('id_history', req.params.id)

    this.responseSuccess({
        code:200,
        status: true,
        values: '',
        message: 'Berhasil menerima persetejuan siswa'
    })
}

async function selesai(req,res){
    await History.query()
    .patch({
        status_history:"2"
    }).where('id_history', req.params.id)

    this.responseSuccess({
        code:200,
        status: true,
        values: '',
        message: 'Bimbingan berhasil di selesaikan'
    })
}

async function tolak(req,res){
    await History.query()
    .patch({
        status_history:"3",
        keterangan_history: req.body.keterangan
    }).where('id_history', req.body.id)

    this.responseSuccess({
        code:200,
        status: true,
        values: '',
        message: 'Berhasil menolak persetejuan siswa'
    })
}

async function batalkan(req,res){
    await History.query()
    .patch({
        status_history:"4",
        keterangan_history: req.body.keterangan
    }).where('id_history', req.body.id)

    this.responseSuccess({
        code:200,
        status: true,
        values: '',
        message: 'Berhasil Batalkan pengajuan bimbingan'
    })
}

async function history_guru(req,res){
    data = await this.DB('SELECT u.uid, u.nama, u.foto, h.tanggal_history, h.status_history,h.id_history, sl.sekolah, kk.kategori_kelas FROM pengguna.users u JOIN (guru.guru g JOIN (siswa.history h JOIN ((siswa.siswa s JOIN guru.kategori_kelas kk ON s.kategori_kelas_id=kk.id_kategori_kelas) LEFT JOIN support.schools sl ON sl.id_school=s.school_id) ON h.siswa_kd=s.kd_siswa) ON g.kd_guru=h.guru_kd) ON u.id_user=s.user_id WHERE g.user_id=$1', [req.params.id])


    this.responseSuccess({
        code:200,
        status: true,
        values: data.get(),
        message: 'Data History Berhasil di dapatkan'
    }) 
}


async function history_detail_siswa(req,res){
   
         data = await this.DB('SELECT u.id_user,u.uid, u.nama, u.foto, mp.mata_pelajaran, h.id_history, h.tanggal_history, h.status_history, h.jadwal_history, kk.kategori_kelas, k.kelas, g.harga, kh.jenis_harga, g.kd_guru, s.kd_siswa, r.nilai_rating FROM pengguna.users u JOIN (((((guru.guru g JOIN guru.jenis_harga kh ON kh.id_jenis_harga=g.jenis_harga_id) JOIN guru.kelas k ON g.kelas_id=k.id_kelas) JOIN guru.kategori_kelas kk ON g.kategori_kelas_id=kk.id_kategori_kelas) JOIN ((siswa.history h LEFT JOIN siswa.ratings r ON r.history_id=h.id_history) JOIN siswa.siswa s ON h.siswa_kd=s.kd_siswa) ON g.kd_guru=h.guru_kd) JOIN guru.mata_pelajaran mp ON g.mata_pelajaran_id=mp.id_mata_pelajaran) ON u.id_user=g.user_id WHERE h.id_history=$1', [req.params.id])

    if(data.first()){
        this.responseSuccess({
            code:200,
            status: true,
            values: data.first(),
            message: 'Data History Berhasil di dapatkan'
        })
    }else{
        this.responseError({
            code:404,
            status: false,
            values: {},
            message: 'Data History Gagal di dapatkan'
        })
    }
}

async function history_detail_guru(req,res){
   
    data = await this.DB('SELECT u.id_user, u.uid, u.nama, u.foto, h.tanggal_history, h.status_history, h.jadwal_history, sl.sekolah, kk.kategori_kelas, k.kelas, g.harga, jh.jenis_harga, g.kd_guru, s.kd_siswa FROM pengguna.users u JOIN ((guru.guru g JOIN guru.jenis_harga jh ON jh.id_jenis_harga=g.jenis_harga_id) JOIN (siswa.history h JOIN (((siswa.siswa s JOIN guru.kelas k ON k.id_kelas=s.kelas_id) JOIN guru.kategori_kelas kk ON kk.id_kategori_kelas=s.kategori_kelas_id) LEFT JOIN support.schools sl ON sl.id_school=s.school_id) ON h.siswa_kd=s.kd_siswa) ON g.kd_guru=h.guru_kd)  ON u.id_user=s.user_id WHERE h.id_history=$1', [req.params.id])

if(data.first()){
   this.responseSuccess({
       code:200,
       status: true,
       values: data.first(),
       message: 'Data History Berhasil di dapatkan'
   })
}else{
   this.responseError({
       code:404,
       status: false,
       values: {},
       message: 'Data History Gagal di dapatkan'
   })
}
}


async function history_siswa(req,res){
    data = await this.DB('SELECT u.id_user,u.uid, u.nama, u.foto, mp.mata_pelajaran, h.id_history, h.tanggal_history, h.status_history, h.jadwal_history, kk.kategori_kelas, k.kelas, g.harga, kh.jenis_harga, g.kd_guru, s.kd_siswa, r.nilai_rating FROM pengguna.users u JOIN (((((guru.guru g JOIN guru.jenis_harga kh ON kh.id_jenis_harga=g.jenis_harga_id) JOIN guru.kelas k ON g.kelas_id=k.id_kelas) JOIN guru.kategori_kelas kk ON g.kategori_kelas_id=kk.id_kategori_kelas) JOIN ((siswa.history h LEFT JOIN siswa.ratings r ON r.history_id=h.id_history) JOIN siswa.siswa s ON h.siswa_kd=s.kd_siswa) ON g.kd_guru=h.guru_kd) JOIN guru.mata_pelajaran mp ON g.mata_pelajaran_id=mp.id_mata_pelajaran) ON u.id_user=g.user_id WHERE s.user_id=$1', [req.params.id])


    this.responseSuccess({
        code:200,
        status: true,
        values: data.get(),
        message: 'Data History Berhasil di dapatkan'
    })
}


async function destroy(req,res){
    let hapus = await History.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status:true,
            values: {},
            message: 'Data History Berhasil di Hapus'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data History Gagal di Hapus'
        })
    }
}

module.exports = {
    index, history, detail_history, terima, tolak, batalkan, selesai, history_guru, destroy, history_siswa, history_detail_guru, history_detail_siswa
}