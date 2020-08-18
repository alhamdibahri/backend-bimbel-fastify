const Religions = require(model + 'support/religions.model')
async function index(req,res){
    let data = await Religions.query()
    this.responseSuccess({
        code:200,
        status: true,
        values: data,
        message: 'Data Agama Berhasil di Dapatkan'
    })
}

async function store(req,res){
    let request = req.body

    await this.validation(request,{
        agama: 'required'
    })

    await Religions.query().insert({
        religion: request.agama
    })

    this.responseSuccess({
        code:201,
        status: true,
        values:{},
        message: 'Data Agama Berhasil di Tambahkan'
    })
}

async function update(req,res){
    let request = req.body

    await this.validation(request, {
        agama: 'required'
    })

    let update  = await Religions.query().update({
        religion: request.agama
    }) 
    .where('id_religion', request.id)
    
    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values:{},
            message: 'Data Agama Berhasil di Update'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values:{},
            message: 'Data Agama Gagal di Update'
        })
    }

    

}

async function destroy(req,res){
    let hapus = await Religions.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'Data Agama Berhasil di Hapus'
        })
        
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Agama Gagal di Hapus'
        })
    }
    
}

module.exports = {
    index, store, update, destroy
}