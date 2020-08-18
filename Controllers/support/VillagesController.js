const Districts = require(model + "support/districts.model")
const Villages = require(model + "support/villages.model")
async function index(req,res){
    let data = await this.DB('SELECT * FROM support.villages v INNER JOIN support.districts d ON d.id_district=v.district_id ORDER BY d.id_district ASC')
    this.responseSuccess({
        code:200,
        status: true,
        values: data.get(),
        message: 'Data Desa Berhasil di Dapatkan'
    })
}
async function ddlDistricts(req,res){
    let data = await Districts.query()
    this.responseSuccess({
        code:200,
        status: true,
        values: data,
        message: 'Data Kecamatan Berhasil di Dapatkan'
    })
}

async function store(req, res){
    let request = req.body

    await this.validation(request, {
        kecamatan: 'required',
        desa: 'required'
    })

    await Villages.query().insert({
        district_id: request.kecamatan,
        village: request.desa.toUpperCase()
    })

    this.responseSuccess({
        code:201,
        status: true,
        values:{},
        message: 'Data Desa Berhasil di Tambahkan'
    })
}

async function update(req,res){
    let request = req.body
    await this.validation(request, {
        kecamatan: 'required',
        desa: 'required'
    })
    
    let update = await Villages.query().update({
        district_id: request.kecamatan,
        village: request.desa.toUpperCase()
    })
    .where('id_village', request.id)

    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values:{},
            message: 'Data Desa Berhasil di Update'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: 'Data Desa Gagal di Update'
        })
    }
}

async function destroy(req,res){
    let hapus = await Villages.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'Data Desa Berhasil di Hapus'
        })
        
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Desa Gagal di Hapus'
        })
    }
    
}
module.exports = {
    index, ddlDistricts, store, destroy, update
}