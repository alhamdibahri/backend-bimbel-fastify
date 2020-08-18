const Genders = require(model + 'support/genders.model')
async function index(req,res){
    let data = await Genders.query()
    this.responseSuccess({
        code:200,
        status: true,
        values: data,
        message: 'Data Genders Berhasil di Dapatkan'
    })
}

async function store(req,res){
    let request = req.body

    await this.validation(request,{
        jenis_kelamin: 'required'
    })

    await Genders.query().insert({
        gender: request.jenis_kelamin
    })

    this.responseSuccess({
        code:201,
        status: true,
        values:{},
        message: 'Data Genders Berhasil di Tambahkan'
    })
}

async function update(req,res){
    let request = req.body

    await this.validation(request, {
        jenis_kelamin: 'required'
    })

    let update = await Genders.query().update({
        gender: request.jenis_kelamin
    }) 
    .where('id_gender', request.id)

    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values:{},
            message: 'Data Genders Berhasil di Update'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: `Data Genders Gagal di Update`
        })
    }

}

async function destroy(req,res){
    let hapus = await Genders.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'Data Genders Berhasil di Hapus'
        })
        
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Genders Gagal di Hapus'
        })
    }
    
}

module.exports = {
    index, store, update, destroy
}