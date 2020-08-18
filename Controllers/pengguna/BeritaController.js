const Berita = require(model + "pengguna/berita.model")
const KategoriBerita = require(model + "pengguna/kategori_berita.model")
const storage = require(base+'service/Storage');

async function index(req, res){
    let data = await this.DB('SELECT * FROM pengguna.kategori_berita kb INNER JOIN pengguna.berita b ON kb.id_kategori_berita=b.kategori_berita_id INNER JOIN pengguna.users u ON b.user_id=u.id_user ORDER BY b.id_berita ASC');

    this.responseSuccess({
        code: 200,
        status: true,
        values: data.get(),
        message: 'Data Berita berhasil di dapatkan'
    })    
}

async function store(req,res){

    let request = req.body

    this.validation(request, {
        kategori_berita: 'required',
        judul_berita: 'required',
        tanggal: 'required|date',
        foto: 'required',
        deskripsi: 'required',
    })

    storage.putAs('foto_berita', req.body.foto[0].filename, req.body.foto[0].data)
    
    await Berita.query().insert({
        kategori_berita_id: request.kategori_berita,
        user_id: req.users.id_user,
        judul_berita: request.judul_berita,
        tanggal_berita: request.tanggal,
        foto_berita: req.body.foto[0].filename,
        deskripsi: request.deskripsi
    })

    this.responseSuccess({
        code:200,
        status: true,
        values: {},
        message: 'Data Berita Berhasil di Simpan'
    })
}

async function edit(req, res){
    let data = await Berita.query().findById(req.params.id)
    if(data){
        this.responseSuccess({
            code:200,
            status:true,
            values: data,
            message: 'Data Berita Berhasi di Dapatkan'
        })
    }else{
        this.responseSuccess({
            code:400,
            status:false,
            values: {},
            message: 'Data Berita Tidak di Temukan'
        })
    }
}

async function update(req,res){
    let request = req.body

    this.validation(request, {
        kategori_berita: 'required',
        judul_berita: 'required',
        tanggal: 'required|date',
        deskripsi: 'required',
    })

    
    if(req.body.foto){
        storage.putAs('foto_berita', req.body.foto[0].filename, req.body.foto[0].data)
        await Berita.query().update({
                kategori_berita_id: request.kategori_berita,
                user_id: req.users.id_user,
                judul_berita: request.judul_berita,
                tanggal_berita: request.tanggal,
                foto_berita: req.body.foto[0].filename,
                deskripsi: request.deskripsi
            })
            .where('id_berita', request.id)
    }else{
        await Berita.query().update({
            kategori_berita_id: request.kategori_berita,
            user_id: req.users.id_user,
            judul_berita: request.judul_berita,
            tanggal_berita: request.tanggal,
            deskripsi: request.deskripsi
        })
        .where('id_berita', request.id)
    }

    this.responseSuccess({
        code:200,
        status:true,
        values: {},
        message: 'Data Berita Berhasil di Update'
    })
    
}

async function destroy(req,res){
    let hapus = await Berita.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status:true,
            values: {},
            message: 'Data Berita Berhasil di Hapus'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data Berita Gagal di Hapus'
        })
    }
    
}

async function ddlKategoriBerita(req,res){
    let data = await KategoriBerita.query()
    this.responseSuccess({
        code:200,
        status:true,
        values: data,
        message: 'Data Kategori Berita Berhasil di Dapatkan'
    })
}

async function show(req,res){
    let data = await this.DB('SELECT * FROM pengguna.kategori_berita kb INNER JOIN pengguna.berita b ON kb.id_kategori_berita=b.kategori_berita_id WHERE id_berita=$1', [req.params.id]);

    this.responseSuccess({
        code: 200,
        status: true,
        values: data.get(),
        message: 'Data Berita berhasil di dapatkan'
    }) 
}

module.exports = {
    index, store, ddlKategoriBerita, edit, destroy, update, show
}