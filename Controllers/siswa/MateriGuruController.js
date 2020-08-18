const MateriGuru = require(model + "siswa/materi_guru.model")
const storage = require(base+'service/Storage');
const { Validator } = require(base+'service/Validator');
async function upload(req,res){
    let request = req.body
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    const yyyy = today.getFullYear();
    if(dd<10) { dd=`0${dd}`; }
    if(mm<10) { mm=`0${mm}`; }

    today = `${yyyy}-${mm}-${dd}`;

    let kode_guru = await this.DB('SELECT kd_guru FROM guru.guru WHERE user_id=$1', [req.users.id_user])
    
    let file = request.file[0].filename;
    let split = file.split(".");

    Validator.register('pdf', function(value, requirement, attribute) {
        return split[1] == 'pdf'
    }, 'file harus dalam bentuk pdf.');

    this.validation(request, {
        file: 'required|pdf',
        nama_materi: 'required',
        siswa: 'required'
    })

    await storage.putAs('materi_guru', request.file[0].filename, request.file[0].data)

    await MateriGuru.query().insert({
        nama_materi: request.nama_materi,
        file_materi:request.file[0].filename,
        tanggal_upload:today,
        guru_kd:kode_guru.first().kd_guru,
        siswa_kd: request.siswa
    })

    this.responseSuccess({
        code:200,
        status: true,
        values: '',
        message: 'Materi Berhasil di Upload'
    })
}

async function ddlsiswa(req,res){
    let data = await this.DB('SELECT DISTINCT u.nama, s.kd_siswa FROM pengguna.users u JOIN (guru.guru g JOIN (siswa.history h JOIN siswa.siswa s ON h.siswa_kd=s.kd_siswa) ON g.kd_guru=h.guru_kd) ON u.id_user=s.user_id WHERE g.user_id=$1 AND h.status_history=1::varchar', [req.users.id_user])

    this.responseSuccess({
        code:200,
        status: true,
        values: data.get(),
        message: 'Data Siswa Berhasil di dapatkan'
    })
}

async function getAll(req,res){
    let data = await this.DB('SELECT mg.id_materi_guru, u.nama, mg.file_materi, mg.nama_materi, mp.mata_pelajaran FROM pengguna.users u JOIN ((guru.guru g JOIN guru.mata_pelajaran mp ON g.mata_pelajaran_id=mp.id_mata_pelajaran) JOIN (siswa.materi_guru mg JOIN siswa.siswa s ON s.kd_siswa=mg.siswa_kd) ON mg.guru_kd=g.kd_guru) ON u.id_user=g.user_id WHERE s.user_id=$1', [req.users.id_user])

    this.responseSuccess({
        code:200,
        status: true,
        values: data.get(),
        message: 'Data Materi Berhasil di dapatkan'
    })

}

module.exports = {
    upload, ddlsiswa, getAll
}