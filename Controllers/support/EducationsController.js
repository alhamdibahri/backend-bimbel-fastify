const Educations = require(model + 'support/educations.model')
async function index(req,res){
    let data = await Educations.query()
    this.responseSuccess({
        code:200,
        status: true,
        values: data,
        message: 'Data Pendidikan Berhasil di Dapatkan'
    })
}

async function store(req,res){
    let request = req.body

    await this.validation(request,{
        pendidikan: 'required'
    })

    await Educations.query().insert({
        education: request.pendidikan
    })

    this.responseSuccess({
        code:201,
        status: true,
        values:{},
        message: 'Data Pendidikan Berhasil di Tambahkan'
    })
}

async function update(req,res){
    let request = req.body

    await this.validation(request, {
        pendidikan: 'required'
    })

    let update  = await Educations.query().update({
        education: request.pendidikan
    }) 
    .where('id_education', request.id)
    
    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values:{},
            message: 'Data Pendidikan Berhasil di Update'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: 'Data Pendidikan Gagal di Update'
        })
    }

    

}

async function destroy(req,res){
    let hapus = await Educations.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'Data Pendidikan Berhasil di Hapus'
        })
        
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Pendidikan Gagal di Hapus'
        })
    }
    
}

module.exports = {
    index, store, update, destroy
}