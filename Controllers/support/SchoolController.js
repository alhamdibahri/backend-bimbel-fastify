const Schools = require(model + "support/schools.model")
const { Validator } = require(base+'service/Validator');
async function index(req, res){
    let data = await this.DB('SELECT * FROM support.schools s INNER JOIN support.regencies r ON s.regency_id=r.id_regency ORDER BY r.id_regency ASC, s.npsn ASC')
    
    this.responseSuccess({
        code: 200,
        status: true,
        values: data.get(),
        message: 'Data Sekolah SD berhasil di dapatkan'
    })    
}

async function store(req,res){
    let request = req.body

    let unique = await Schools.query().where('npsn', request.npsn).first();

    Validator.register('unique', function(value, requirement, attribute){
        return typeof unique == 'undefined'
    }, 'npsn sudah ada yang menggunakan')

    await this.validation(request,{
        kabupaten: 'required',
        kecamatan: 'required',
        npsn: 'required|unique',
        nama_sekolah: 'required',
        bentuk: 'required',
        status: 'required',
        alamat: 'required',
    })

    await Schools.query().insert({
        regency_id: request.kabupaten,
        kecamatan: request.kecamatan,
        npsn: request.npsn,
        sekolah: request.nama_sekolah,
        bentuk: request.bentuk,
        status: request.status,
        alamat: request.alamat,
        bintang: request.bintang,
        bujur: request.bujur
    })

    this.responseSuccess({
        code:200,
        status:true,
        values:{},
        message: 'Data Sekolah Berhasil di Tambahkan'
    })
}

async function edit(req, res){
    let data = await Schools.query().findById(req.params.id)
    if(data){
        this.responseSuccess({
            code:200,
            status:true,
            values: data,
            message: 'Data Sekolah Berhasil di Dapatkan'
        })
    }else{
        this.responseSuccess({
            code:400,
            status:false,
            values: {},
            message: 'Data Sekolah Tidak di Temukan'
        })
    }
}

async function update(req,res){
    let request = req.body

    let unique = await Schools.query().where('id_school', '<>', request.id).where('npsn', request.npsn).first();

    Validator.register('unique', function(value, requirement, attribute){
        return typeof unique == 'undefined'
    }, 'npsn sudah ada yang menggunakan')

    this.validation(request, {
        kabupaten: 'required',
        kecamatan: 'required',
        npsn: 'required|unique',
        nama_sekolah: 'required',
        bentuk: 'required',
        status: 'required',
        alamat: 'required',
    })

    let update = await Schools.query().update({
        regency_id: request.kabupaten,
        kecamatan: request.kecamatan,
        npsn: request.npsn,
        sekolah: request.nama_sekolah,
        bentuk: request.bentuk,
        status: request.status,
        alamat: request.alamat,
        bintang: request.bintang,
        bujur: request.bujur
    })
    .where('id_school', request.id)

    if(update){
        this.responseSuccess({
            code:200,
            status:true,
            values: {},
            message: 'Data Sekolah Berhasil di Update'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: 'Data Sekolah Gagal di Update'
        })
    }
    
}

async function destroy(req,res){
    let hapus = await Schools.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status:true,
            values: {},
            message: 'Data Sekolah Berhasil di Hapus'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Sekolah Gagal di Hapus'
        })
    }
}

module.exports = {
    index, store, destroy, edit, update
}