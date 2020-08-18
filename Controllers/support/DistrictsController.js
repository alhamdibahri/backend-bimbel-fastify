const Regencies = require(model + "support/regencies.model")
const Districts = require(model + "support/districts.model")
async function index(req,res){
    let data = await this.DB('SELECT * FROM support.regencies r INNER JOIN support.districts d ON r.id_regency=d.regency_id ORDER BY r.id_regency ASC')
    this.responseSuccess({
        code:200,
        status: true,
        values: data.get(),
        message: 'Data Kecamatan Berhasil di Dapatkan'
    })
}
async function ddlRegencies(req,res){
    let data = await Regencies.query()
    this.responseSuccess({
        code:200,
        status: true,
        values: data,
        message: 'Data Kota/Kabupaten Berhasil di Dapatkan'
    })
}

async function store(req, res){
    let request = req.body

    await this.validation(request, {
        kabupaten: 'required',
        kecamatan: 'required'
    })

    await Districts.query().insert({
        regency_id: request.kabupaten,
        district: request.kecamatan.toUpperCase()
    })

    this.responseSuccess({
        code:201,
        status: true,
        values:{},
        message: 'Data Kecamatan Berhasil di Tambahkan'
    })
}

async function update(req,res){
    let request = req.body
    await this.validation(request, {
        kabupaten: 'required',
        kecamatan: 'required'
    })
    
    let update = await Districts.query().update({
        regency_id: request.kabupaten,
        district: request.kecamatan.toUpperCase()
    })
    .where('id_district', request.id)


    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values:{},
            message: 'Data Kecamatan Berhasil di Update'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: 'Data Kecamatan Gagal di Update'
        })
    }
}

async function destroy(req,res){
    let hapus = await Districts.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'Data Kecamatan Berhasil di Hapus'
        })
        
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Kecamatan Gagal di Hapus'
        })
    }
    
}
module.exports = {
    index, ddlRegencies, store, destroy, update
}