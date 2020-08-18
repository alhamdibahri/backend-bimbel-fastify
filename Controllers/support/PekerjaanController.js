const Pekerjaan = require(model + "support/pekerjaan.model")
async function index(req,res){
    let data = await Pekerjaan.query().orderBy('id_pekerjaan')
    this.responseSuccess({
        code:200,
        status: true,
        values: data,
        message: 'Data Pekerjaan Berhasil di Dapatkan'
    })
}
async function store(req,res){
    let request = req.body
    await this.validation(request, {
        pekerjaan: 'required'
    })
    await Pekerjaan.query().insert({
        pekerjaan: request.pekerjaan
    })
    this.responseSuccess({
        code:200,
        status: true,
        values: {},
        message: 'Data Pekerjaan Berhasil di Tambahkan'
    })
}

async function update(req,res){
    let request = req.body
    await this.validation(request, {
        pekerjaan: 'required'
    })
    
    let update = await Pekerjaan.query().update({
        pekerjaan: request.pekerjaan    
    })
    .where('id_pekerjaan', request.id)

    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values:{},
            message: 'Data Pekerjaan Berhasil di Update'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: 'Data Pekerjaan Gagal di Update'
        })
    }
}

async function destroy(req,res){
    let hapus = await Pekerjaan.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'Data Pekerjaan Berhasil di Hapus'
        })
        
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Pekerjaan Gagal di Hapus'
        })
    }
    
}
module.exports = {
    index, store, update, destroy
}