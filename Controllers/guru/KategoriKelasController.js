const KategoriKelas = require(model + 'guru/kategori-kelas.model')

async function index(req,res){
    let data = await KategoriKelas.query().eager('kelas')

    this.responseSuccess({
        code:200,
        status: true,
        values: data,
        message: 'Data Kategori Kelas Berhasil di Dapatkan'
    })
}

async function store(req,res){
    let request = req.body

    await this.validation(request,{
        kategori_kelas: 'required'
    })

    await KategoriKelas.query().insert({
        kategori_kelas: request.kategori_kelas
    })

    this.responseSuccess({
        code:201,
        status: true,
        values: {},
        message: 'Data Kategori Kelas Berhasil di Tambahkan'
    })
}

async function update(req,res){
    let request = req.body

    await this.validation(request,{
        kategori_kelas: 'required'
    })

    let update = await KategoriKelas.query().update({
        kategori_kelas: request.kategori_kelas
    })
    .where('id_kategori_kelas', request.id)

    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values:{},
            message: 'Data Kategori Kelas Berhasil di Update'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: 'Data Kategori Kelas Gagal di Update'
        })
    }
}

async function destroy(req,res){
    let hapus = await KategoriKelas.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'Data Kategori Kelas Berhasil di Hapus'
        })
        
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Kategori Kelas Gagal di Hapus'
        })
    }
    
}

module.exports = {
    index, store, update, destroy
}