const Provinces = require(model + "support/provinces.model")
async function index(req,res){
    let data = await Provinces.query()
    this.responseSuccess({
        code:200,
        status: true,
        values: data,
        message: 'Data Provinsi Berhasil di Dapatkan'
    })
}
async function store(req,res){
    let request = req.body
    await this.validation(request, {
        provinsi: 'required'
    })
    await Provinces.query().insert({
        province: request.provinsi.toUpperCase()
    })
    this.responseSuccess({
        code:200,
        status: true,
        values: {},
        message: 'Data Provinsi Berhasil di Tambahkan'
    })
}

async function update(req,res){
    let request = req.body
    await this.validation(request, {
        provinsi: 'required'
    })
    
    let update = await Provinces.query().update({
        province: request.provinsi.toUpperCase()
    })
    .where('id_province', request.id)

    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values:{},
            message: 'Data Provinsi Berhasil di Update'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: 'Data Provinsi Gagal di Update'
        })
    }
}

async function destroy(req,res){
    let hapus = await Provinces.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'Data Provinces Berhasil di Hapus'
        })
        
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Provinces Gagal di Hapus'
        })
    }
    
}
module.exports = {
    index, store, update, destroy
}