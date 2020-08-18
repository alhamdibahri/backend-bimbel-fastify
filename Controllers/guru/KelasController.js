const Kelas = require(model + 'guru/kelas.model')
const KategoriKelas = require(model + 'guru/kategori-kelas.model')
async function index(req,res){
    let data = await this.DB('SELECT * FROM guru.kelas k INNER JOIN guru.kategori_kelas kk ON k.kategori_kelas_id=kk.id_kategori_kelas ORDER BY k.id_kelas ASC')

    this.responseSuccess({
        code:200,
        status: true,
        values: data.get(),
        message: 'Data Kelas Berhasil di Dapatkan'
    })
}

async function store(req,res){
    let request = req.body

    await this.validation(request,{
        kategori_kelas: 'required',
        kelas: 'required'
    })

    await Kelas.query().insert({
        kategori_kelas_id: request.kategori_kelas,
        kelas: request.kelas
    })

    this.responseSuccess({
        code:201,
        status: true,
        values: {},
        message: 'Data Kelas Berhasil di Tambahkan'
    })
}

async function update(req,res){
    let request = req.body

    await this.validation(request,{
        kategori_kelas: 'required',
        kelas: 'required'
    })

    let update = await Kelas.query().update({
        kategori_kelas_id: request.kategori_kelas,
        kelas: request.kelas
    })
    .where('id_kelas', request.id)

    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values:{},
            message: 'Data Kelas Berhasil di Update'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: 'Data Kelas Gagal di Update'
        })
    }
}

async function ddlKategori(req,res){
    let data = await KategoriKelas.query()
    this.responseSuccess({
        code:200,
        status: true,
        values: data,
        message: 'Data Kategori Kelas Berhasil di Dapatkan'
    })
}

async function destroy(req,res){
    let hapus = await Kelas.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'Data Kelas Berhasil di Hapus'
        })
        
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Kelas Gagal di Hapus'
        })
    }
    
}

module.exports = {
    index, store, update, destroy, ddlKategori
}