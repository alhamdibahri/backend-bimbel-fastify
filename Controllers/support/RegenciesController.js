const Regencies = require(model + "support/regencies.model")
const Provinces = require(model + "support/provinces.model")
async function index(req,res){
    let data = await this.DB('SELECT * FROM support.regencies r INNER JOIN support.provinces p ON r.province_id=p.id_province ORDER BY p.id_province ASC')
    this.responseSuccess({
        code:200,
        status: true,
        values: data.get(),
        message: 'Data Kota/Kabupaten Berhasil di Dapatkan'
    })
}
async function store(req,res){
    let request = req.body
    await this.validation(request, {
        provinsi: 'required',
        kabupaten: 'required'
    })
    await Regencies.query().insert({
        province_id: request.provinsi,
        regency: request.kabupaten.toUpperCase()
    })
    this.responseSuccess({
        code:200,
        status: true,
        values: {},
        message: 'Data Kabupaten/Kota Berhasil di Tambahkan'
    })
}

async function update(req,res){
    let request = req.body
    await this.validation(request, {
        provinsi: 'required',
        kabupaten: 'required'
    })
    
    let update = await Regencies.query().update({
        province_id: request.provinsi,
        regency: request.kabupaten.toUpperCase()
    })
    .where('id_regency', request.id)

    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values:{},
            message: 'Data Kota/Kabupaten Berhasil di Update'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: 'Data Kota/Kabupaten Gagal di Update'
        })
    }
}

async function destroy(req,res){
    let hapus = await Regencies.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'Data Kabupaten/Kota Berhasil di Hapus'
        })
        
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Kabupaten/Kota Gagal di Hapus'
        })
    }
    
}
async function ddlProvinces(req,res){
    let data = await Provinces.query()
    this.responseSuccess({
        code:200,
        status: true,
        values: data,
        message: 'Data Provinsi Berhasil di Dapatkan'
    })
}

module.exports = {
    index, store, update, destroy, ddlProvinces
}