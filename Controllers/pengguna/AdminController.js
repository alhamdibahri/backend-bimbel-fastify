const Users = require(model + "pengguna/users.model")
const Regencies = require(model + 'support/regencies.model')
const Districts = require(model + 'support/districts.model')
const Villages = require(model + 'support/villages.model')
const Genders = require(model + 'support/genders.model')
const Religions = require(model + 'support/religions.model')
const { Validator } = require(base+'service/Validator');

async function index(req,res){
    
    let data = await Users.query()
                        .select('*')
                        .joinRelation('roles')
                        .where('roles.role', 'ADMIN')
                        .orderBy('id_user')

    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Admin berhasil di dapatkan'
    })
}

async function update(req,res){
    
    let request = req.body

    let unique = await Users.query().where('id_user', '<>', request.id).whereRaw('lower(no_handphone::text) = lower(\'' + request.no_handphone + '\')').first();

    Validator.register('unique', function(value, requirement, attribute) {
        return typeof unique == 'undefined'
    }, 'No Handphone sudah ada yang menggunakan.');

    this.validation(request, {
        jenis_kelamin: 'required',
        agama: 'required',
        provinsi: 'required',
        kabupaten: 'required',
        kecamatan: 'required',
        desa: 'required',
        nama: 'required',
        tempat_lahir: 'required',
        tanggal_lahir: 'required',
        alamat: 'required',
        no_handphone: 'required|unique'
    })

    let update = await Users.query().patch({
                    gender_id:request.jenis_kelamin,
                    religion_id:request.agama,
                    province_id:request.provinsi,
                    regency_id:request.kabupaten,
                    district_id:request.kecamatan,
                    village_id:request.desa,
                    nama:request.nama,
                    tempat_lahir:request.tempat_lahir,
                    tanggal_lahir:request.tanggal_lahir,
                    alamat:request.alamat,
                    no_handphone:request.no_handphone
                }).where('id_user', request.id)

    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'Data Admin berhasil di Simpan'
        })
    }else{
        this.responseError({
            code:404,
            status: true,
            values: {},
            message: 'Data Admin Gagal di Simpan'
        })
    }

    
}

async function show(req,res){
    let data = await Users.query().eager('[religions,genders,provinces,regencies,districts,villages,roles]').where('id_user', req.params.id)

    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Admin Berhasil di dapatkan'
    })
}

async function ddlkota(req,res){
    let data = await Regencies.query().where('province_id', req.params.id)

    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Kabupaten/Kota Berhasil di dapatkan'
    })
}

async function ddlkecamatan(req,res){
    let data = await Districts.query().where('regency_id', req.params.id)

    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Kecamatan Berhasil di dapatkan'
    })
}

async function ddldesa(req,res){
    let data = await Villages.query().where('district_id', req.params.id)

    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Desa Berhasil di dapatkan'
    })
}

async function ddlgender(req,res){
    let data = await Genders.query()

    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Gender Berhasil di dapatkan'
    })
}

async function ddlreligion(req,res){
    let data = await Religions.query()

    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Religion Berhasil di dapatkan'
    })
}

module.exports = {
    index, ddlkota, ddlkecamatan, ddldesa, update, ddlgender, ddlreligion, show
}