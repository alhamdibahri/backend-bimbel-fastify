const JenisHarga = require(model + 'guru/jenis-harga.model')

async function index(req,res){
    let data = await JenisHarga.query()

    this.responseSuccess({
        code:200,
        status: true,
        values: data,
        message: 'Data Jenis Harga Berhasil di Dapatkan'
    })
}

async function store(req,res){
    let request = req.body

    await this.validation(request,{
        jenis_harga: 'required'
    })

    await JenisHarga.query().insert({
        jenis_harga: request.jenis_harga
    })

    this.responseSuccess({
        code:201,
        status: true,
        values: {},
        message: 'Data Jenis Harga Berhasil di Tambahkan'
    })
}

async function update(req,res){
    let request = req.body

    await this.validation(request,{
        jenis_harga: 'required'
    })

    let update = await JenisHarga.query().update({
        jenis_harga: request.jenis_harga
    })
    .where('id_jenis_harga', request.id)

    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values:{},
            message: 'Data Jenis Harga Berhasil di Update'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: 'Data Jenis Harga Gagal di Update'
        })
    }
}

async function destroy(req,res){
    let hapus = await JenisHarga.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'Data Jenis Harga Berhasil di Hapus'
        })
        
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Jenis Harga Gagal di Hapus'
        })
    }
    
}

module.exports = {
    index, store, update, destroy
}