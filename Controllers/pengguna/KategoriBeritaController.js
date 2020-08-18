const KategoriBerita = require(model + "pengguna/kategori_berita.model")

async function index(req,res){
    let data = await KategoriBerita.query().orderBy('id_kategori_berita')
    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Kategori Berita Berhasil di Dapatkan'
    })
}
async function store(req,res){
    let request = req.body
    await this.validation(request, {
        kategori_berita: 'required'
    })
    await KategoriBerita.query().insert({
        kategori_berita: request.kategori_berita
    })
    this.responseSuccess({
        code:200,
        status: true,
        values: {},
        message: 'Data Kategori Berita Berhasil di Simpan'
    })
}

async function update(req,res){
    let request = req.body
    
    await this.validation(request, {
        kategori_berita: 'required'
    })

    let update = await KategoriBerita.query().update({
        kategori_berita : request.kategori_berita
    })
    .where('id_kategori_berita', request.id)

    if(update){
        this.responseSuccess({
            code:200,
            status:true,
            values: {},
            message: 'Data Kategori Berita Berhasil di Update'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: 'Data Kategori Berita Gagal di Update'
        })
    }
    
}

async function destroy(req,res){
    let hapus = await KategoriBerita.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status:true,
            values: {},
            message: 'Data Kategori Berita Berhasil di Hapus'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Kategori Berita Gagal di Hapus'
        })
    }
    
}

module.exports = {
    index, store, destroy, update
}