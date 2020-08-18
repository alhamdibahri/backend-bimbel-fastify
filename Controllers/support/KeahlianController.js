const Keahlian = require(model + "support/keahlian.model")
async function index(req,res){
    let data = await Keahlian.query().orderBy('id_keahlian')
    this.responseSuccess({
        code:200,
        status: true,
        values: data,
        message: 'Data Keahlian Berhasil di Dapatkan'
    })
}
async function store(req,res){
    let request = req.body
    await this.validation(request, {
        keahlian: 'required'
    })
    await Keahlian.query().insert({
        keahlian: request.keahlian
    })
    this.responseSuccess({
        code:200,
        status: true,
        values: {},
        message: 'Data Keahlian Berhasil di Tambahkan'
    })
}

async function update(req,res){
    let request = req.body
    await this.validation(request, {
        keahlian: 'required'
    })
    
    let update = await Keahlian.query().update({
        keahlian: request.keahlian    
    })
    .where('id_keahlian', request.id)

    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values:{},
            message: 'Data Keahlian Berhasil di Update'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: 'Data Keahlian Gagal di Update'
        })
    }
}

async function destroy(req,res){
    let hapus = await Keahlian.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'Data Keahlian Berhasil di Hapus'
        })
        
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Keahlian Gagal di Hapus'
        })
    }
    
}
module.exports = {
    index, store, update, destroy
}