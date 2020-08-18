const MataPelajaran = require(model + 'guru/mata-pelajaran.model')
const Kelas = require(model + 'guru/kelas.model')

async function index(req,res){
    let data = await this.DB('SELECT * FROM guru.kategori_kelas kk INNER JOIN guru.mata_pelajaran m ON kk.id_kategori_kelas=m.kategori_kelas_id INNER JOIN guru.kelas k ON m.kelas_id=k.id_kelas ORDER BY id_mata_pelajaran ASC')

    this.responseSuccess({
        code:200,
        status: true,
        values: data.get(),
        message: 'Data Mata Pelajaran Berhasil di Dapatkan'
    })
}

async function store(req,res){
    let request = req.body

    await this.validation(request,{
        kategori_kelas: 'required',
        kelas: 'required',
        mata_pelajaran: 'required'
    })

    await MataPelajaran.query().insert({
        kategori_kelas_id: request.kategori_kelas,
        kelas_id: request.kelas,
        mata_pelajaran: request.mata_pelajaran
    })

    this.responseSuccess({
        code:201,
        status: true,
        values: {},
        message: 'Data Mata Pelajaran Berhasil di Tambahkan'
    })
}

async function update(req,res){
    let request = req.body

    await this.validation(request,{
        kategori_kelas: 'required',
        kelas: 'required',
        mata_pelajaran: 'required'
    })

    let update = await MataPelajaran.query().update({
        kategori_kelas_id: request.kategori_kelas,
        kelas_id: request.kelas,
        mata_pelajaran: request.mata_pelajaran
    })
    .where('id_mata_pelajaran', request.id)

    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values:{},
            message: 'Data Mata Pelajaran Berhasil di Update'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: 'Data Mata Pelajaran Gagal di Update'
        })
    }
}

async function ddlKelas(req,res){
    let data = await Kelas.query().where('kategori_kelas_id', req.params.id)
    if(data){
        this.responseSuccess({
            code:200,
            status: true,
            values:data,
            message: 'Data Kelas Berhasil di Dapatkan'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: 'Data Kelas Tidak Ditemukan'
        })
    }

}

async function destroy(req,res){
    let hapus = await MataPelajaran.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'Data Mata Pelajaran Berhasil di Hapus'
        })
        
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Mata Pelajaran Gagal di Hapus'
        })
    }
    
}

module.exports = {
    index, store, update, destroy, ddlKelas
}