const Users = require(model + "pengguna/users.model")
const Roles = require(model + "pengguna/roles.model")
const { Validator } = require(base+'service/Validator');
const storage = require(base+'service/Storage');
async function index(req, res){
    let data = await this.DB('SELECT * FROM pengguna.users u INNER JOIN pengguna.roles r ON u.role_id=r.id_role ORDER BY id_user ASC');

    this.responseSuccess({
        code: 200,
        status: true,
        values: data.get(),
        message: 'Data Users berhasil di dapatkan'
    })    
}

async function store(req,res){

    let request = req.body

    let UsernameUnique = await Users.query().where('username', request.username).first();
    let EmailUnique = await Users.query().where('email', request.email).first();
    let noUnique = await Users.query().where('no_handphone', request.no_handphone).first();

    Validator.register('UsernameUnique', function(value, requirement, attribute) {
        return typeof UsernameUnique == 'undefined'
    }, 'Username sudah ada yang menggunakan.');

    Validator.register('EmailUnique', function(value, requirement, attribute) {
        return typeof EmailUnique == 'undefined'
    }, 'Email sudah ada yang menggunakan.');

    Validator.register('noUnique', function(value, requirement, attribute) {
        return typeof noUnique == 'undefined'
    }, 'No Handphone sudah ada yang menggunakan.');


    this.validation(request, {
        role: 'required',
        username: 'required|UsernameUnique',
        email: 'required|EmailUnique|email',
        password: 'required|min:8',
        nama: 'required',
        no_handphone: 'required|numeric|noUnique',
    })

    if(req.body.foto){
        await storage.putAs('foto_user', req.body.foto[0].filename, req.body.foto[0].data)

        await Users.query().insert({
            role_id: request.role, 
            username: request.username,
            email: request.email,
            password: this.bcrypt(request.password),
            nama: request.nama,
            no_handphone: request.no_handphone,
            foto: req.body.foto[0].filename
        })
    }else{
        await Users.query().insert({
            role_id: request.role,
            username: request.username,
            email: request.email,
            password: this.bcrypt(request.password),
            nama: request.nama,
            no_handphone: request.no_handphone,
        })
    }


    this.responseSuccess({
        code:200,
        status: true,
        values: {},
        message: 'Data Users Berhasil di Simpan'
    })
}

async function edit(req, res){
    let data = await Users.query().findById(req.params.id)
    if(data){
        this.responseSuccess({
            code:200,
            status:true,
            values: data,
            message: 'Data User Berhasi di Dapatkan'
        })
    }else{
        this.responseSuccess({
            code:400,
            status:false,
            values: {},
            message: 'Data Users Tidak di Temukan'
        })
    }
}

async function update(req,res){
    let request = req.body

    let UsernameUnique = await Users.query().where('id_user', '<>', request.id).whereRaw('lower(username::text) = lower(\'' + request.username + '\')').first();

    let EmailUnique = await Users.query().where('id_user', '<>', request.id).whereRaw('lower(email::text) = lower(\'' + request.email + '\')').first();

    let noUnique = await Users.query().where('id_user', '<>', request.id).whereRaw('lower(no_handphone::text) = lower(\'' + request.no_handphone + '\')').first();

    Validator.register('UsernameUnique', function(value, requirement, attribute) {
        return typeof UsernameUnique == 'undefined'
    }, 'Username sudah ada yang menggunakan.');

    Validator.register('EmailUnique', function(value, requirement, attribute) {
        return typeof EmailUnique == 'undefined'
    }, 'Email sudah ada yang menggunakan.');

    Validator.register('noUnique', function(value, requirement, attribute) {
        return typeof noUnique == 'undefined'
    }, 'No Handphone sudah ada yang menggunakan.');

    this.validation(request, {
        role: 'required',
        username: 'required|UsernameUnique',
        email: 'required|EmailUnique|email',
        password: 'required|min:8',
        nama: 'required',
        no_handphone: 'required|numeric|noUnique'
    })

    
    if(req.body.foto){
        await storage.putAs('foto_user', req.body.foto[0].filename, req.body.foto[0].data)
        await Users.query().update({
                role_id: request.role,
                username: request.username,
                email: request.email,
                password: this.bcrypt(request.password),
                nama: request.nama,
                no_handphone: request.no_handphone,
                foto: req.body.foto[0].filename
            })
            .where('id_user', request.id)
    }else{
        await Users.query().update({
            role_id: request.role,
            username: request.username,
            email: request.email,
            password: this.bcrypt(request.password),
            nama: request.nama,
            no_handphone: request.no_handphone
        })
        .where('id_user', request.id)
    }

    this.responseSuccess({
        code:200,
        status:true,
        values: {},
        message: 'Data User Berhasil di Update'
    })
    
}

async function destroy(req,res){
    let hapus = await Users.query().deleteById(req.params.id)
    if(hapus){
        this.responseSuccess({
            code:200,
            status:true,
            values: {},
            message: 'Data User Berhasil di Hapus'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Data User Gagal di Hapus'
        })
    }
    
}

async function ddlRoles(req,res){
    let data = await Roles.query()
    this.responseSuccess({
        code:200,
        status:true,
        values: data,
        message: 'Data Roles Berhasil di Dapatkan'
    })
}

async function ddlRolesAndorid(req,res){
    let data = await Roles.query().where("role", "<>", "ADMIN").orderBy('id_role')
    this.responseSuccess({
        code:200,
        status:true,
        values: data,
        message: 'Data Roles Berhasil di Dapatkan'
    })
}

async function changePassword(req,res){
    let request = req.body

    let password = await this.bcryptCheck(request.password_lama, req.users.password)

    Validator.register('cek', function(value, requirement, attribute) {
        return password
    }, 'password lama anda salah.');

    this.validation(request, {
        password_lama: 'required|cek',
        password_baru: 'required',
        konfirmasi_password: 'required|same:password_baru'
    })

    await Users.query().update({
        password: this.bcrypt(request.password_baru),
    })
    .where('id_user', req.users.id_user)

    this.responseSuccess({
        code:200,
        status:true,
        values: {},
        message: 'Password Berhasil di Ubah'
    })
}

async function editakun(req,res){
    let request = req.body

    let UsernameUnique = await Users.query().where('id_user', '<>', request.id).whereRaw('lower(username::text) = lower(\'' + request.username + '\')').first();

    let EmailUnique = await Users.query().where('id_user', '<>', request.id).whereRaw('lower(email::text) = lower(\'' + request.email + '\')').first();

    Validator.register('UsernameUnique', function(value, requirement, attribute) {
        return typeof UsernameUnique == 'undefined'
    }, 'Username sudah ada yang menggunakan.');

    Validator.register('EmailUnique', function(value, requirement, attribute) {
        return typeof EmailUnique == 'undefined'
    }, 'Email sudah ada yang menggunakan.');

    this.validation(request, {
        username: 'required|UsernameUnique',
        email: 'required|EmailUnique',
        password: 'min:8'
    })

    if(request.password){
        await Users.query().update({
            username: request.username,
            email: request.email,
            password: this.bcrypt(request.password),
            password_asli: request.password
        })
        .where('id_user', req.users.id_user)
    }else{
        await Users.query().update({
            username: request.username,
            email: request.email,
        })
        .where('id_user', req.users.id_user)
    }

    this.responseSuccess({
        code:200,
        status:true,
        values: '',
        message: 'Akun anda Berhasil di Perbaharui'
    })
}

async function tolak(req,res){
    let email = await this.DB('SELECT email, nama FROM pengguna.users WHERE id_user=$1', [req.params.id])
    let data = email.first()
    let update = await Users.query()
                            .update({
                                status: '2'
                            })
                            .where('id_user', req.params.id)

    let html = `Hello ${data.nama}, Mohon maaf verifikasi akun anda di tolak, tolong cek kembali profil anda dengan benar`

    await this.sendEmail(data.email, html)

    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'User Berhasil di Verifikasi'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'User Gagal di Verifikasi'
        })
    }
    
}

async function terima(req,res){
    let email = await this.DB('SELECT email, nama FROM pengguna.users WHERE id_user=$1', [req.params.id])
    let data = email.first()
    let update = await Users.query()
                            .update({
                                status: '1'
                            })
                            .where('id_user', req.params.id)
    let html = `Hello ${data.nama}, Selamat akun anda berhasil kami verifikasi :)`

    await this.sendEmail(data.email, html)

    if(update){
        this.responseSuccess({
            code:200,
            status: true,
            values: {},
            message: 'User Berhasil di Verifikasi'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'User Gagal di Verifikasi'
        })
    }
    
}

async function verifikasi(req, res){

    let data = await this.DB('SELECT * FROM (pengguna.users u JOIN pengguna.roles r ON u.role_id=r.id_role) LEFT JOIN guru.guru g ON u.id_user=g.user_id WHERE role!=$1 AND status=$2 ORDER BY id_user DESC', ['ADMIN', req.params.status])

    this.responseSuccess({
        code: 200,
        status: true,
        values: data.get(),
        message: 'Data Verifikasi berhasil di dapatkan'
    })
}

async function notifikasi(req, res){

    let count = await this.DB('SELECT * FROM pengguna.users u JOIN pengguna.roles r ON u.role_id=r.id_role WHERE r.role!=$1 AND u.status=$2 AND u.baca=$3 ORDER BY u.id_user DESC', ['ADMIN', '0', '0'])

    let data = await this.DB('SELECT * FROM pengguna.users u JOIN pengguna.roles r ON u.role_id=r.id_role WHERE r.role!=$1 AND u.status=$2 AND u.baca=$3 ORDER BY u.id_user DESC LIMIT 3', ['ADMIN', '0', '0'])

    this.responseSuccess({
        code: 200,
        status: true,
        values: {
            data:data.get(),
            count: count.count()
        },
        message: 'Data Notifikasi berhasil di dapatkan'
    })
}

async function updatebaca(req, res){

    if(req.params.id != null){
        await Users.query()
        .update({
            baca: '1'
        })
        .where('id_user', req.params.id)
    }else{
        await this.DB('UPDATE pengguna.users SET baca=1::varchar')
    }

    this.responseSuccess({
        code: 200,
        status: true,
        values: {},
        message: 'Data Notifikasi berhasil di update'
    })
}


async function updatebacaall(req, res){

   
    await this.DB('UPDATE pengguna.users SET baca=1::varchar')

    this.responseSuccess({
        code: 200,
        status: true,
        values: {},
        message: 'Data Notifikasi berhasil di update'
    })
}


module.exports = {
    index, store, ddlRoles, edit, destroy, update, changePassword, ddlRolesAndorid, editakun, tolak, terima, verifikasi, notifikasi, updatebaca, updatebacaall
}