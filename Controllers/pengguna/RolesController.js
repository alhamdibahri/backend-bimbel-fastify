const Roles = require(model + "pengguna/roles.model")

async function index(req,res){
    let data = await Roles.query().orderBy('id_role')
    this.responseSuccess({
        code: 200,
        status: true,
        values: data,
        message: 'Data Roles Berhasil di Dapatkan'
    })
}
async function store(req,res){
    let request = req.body
    await this.validation(request, {
        role: 'required'
    })
    await Roles.query().insert({
        role: request.role
    })
    this.responseSuccess({
        code:200,
        status: true,
        values: {},
        message: 'Data Roles Berhasil di Simpan'
    })
}

async function update(req,res){
    let request = req.body
    
    await this.validation(request, {
        role: 'required'
    })

    let update = await Roles.query().update({
        role : request.role
    })
    .where('id_role', request.id)

    if(update){
        this.responseSuccess({
            code:200,
            status:true,
            values: {},
            message: 'Data Roles Berhasil di Update'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: 'Data Roles Gagal di Update'
        })
    }
    
}

async function destroy(req,res){
    let hapus = await Roles.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status:true,
            values: {},
            message: 'Data Roles Berhasil di Hapus'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Roles Gagal di Hapus'
        })
    }
    
}

module.exports = {
    index, store, destroy, update
}