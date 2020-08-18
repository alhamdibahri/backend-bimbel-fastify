const Users = require(model + "pengguna/users.model")
const Guru = require(model + "guru/guru.model")
const ForgotPassword = require(model + 'pengguna/forgot-password.model')
const { Validator } = require(base+'service/Validator');
async function login(request,reply){

    await this.validation(request.body, {
        'username' : 'required',
        'password' : 'required'
    })

    const { username, password } = request.body

    const user = await this.DB('SELECT * FROM pengguna.users u INNER JOIN pengguna.roles r ON u.role_id=r.id_role where email=$1 OR username=$1', [username])
    const getUser = await user.first()

    if(getUser) {
        let verify = await this.bcryptCheck(password, getUser.password);
        if (verify) {
            let values = await new Promise((resolve) => {
                    let token = this.createToken(getUser.email, getUser.id, getUser.role_id);
                    let values = {
                        id_user: getUser.id_user,
                        name: getUser.nama,
                        username: getUser.username,
                        email: getUser.email,
                        no_handphone: getUser.no_handphone,
                        refreshToken: token.refreshToken,
                        token: token.token,
                        role: getUser.role,
                        foto: getUser.foto,
                        password: getUser.password_asli
                    }
                    return resolve(values)
            })
            return this.responseSuccess({
                code:200,
                values : values,
                message : "Selamat datang, " + getUser.nama
            })
        }
    }
    return this.responseError({
        code: 401,
        values : {},
        message : "Username atau password yang anda masukkan salah!"
    })
}

async function register(req,res){

    let request = req.body

    let UsernameUnique = await Users.query().where('username', request.username).first();
    let EmailUnique = await Users.query().where('email', request.email).first();

    Validator.register('UsernameUnique', function(value, requirement, attribute) {
        return typeof UsernameUnique == 'undefined'
    }, 'Username sudah ada yang menggunakan.');

    Validator.register('EmailUnique', function(value, requirement, attribute) {
        return typeof EmailUnique == 'undefined'
    }, 'Email sudah ada yang menggunakan.');


    this.validation(request, {
        role: 'required',
        username: 'required|UsernameUnique',
        email: 'required|EmailUnique|email',
        password: 'required|min:8',
        nama: 'required',
    })

    await Users.query().insert({
        role_id: request.role,
        username: request.username,
        email: request.email,
        password: this.bcrypt(request.password),
        nama: request.nama,
        password_asli: request.password,
        status: '0',
        baca: '0'
    })

    let html = `Hello ${request.nama} segera lengkapi profil anda agar segera di verifikasi data diri anda oleh admin Bimbingan Belajar :)`

    await this.sendEmail(request.email, html)

    this.responseSuccess({
        code:200,
        status: true,
        values: '',
        message: 'Berhasil Registrasi, Silahkan Login'
    })
}


async function forgotPass(request,response){

    let req = request.body

    let cek = await Users
                    .query()
                    .select('*')
                    .joinRelation('roles')
                    .where('users.email', req.email)
                    .where('roles.role', '<>', 'ADMIN')

    if(cek.length > 0){
        let cekForgot = await ForgotPassword.query().where('user_id', cek[0].id_user)

        let kode = await this.verifikasi(6);

        if(cekForgot.length > 0){
            await ForgotPassword.query().patch({
                kode_verifikasi: kode
            }).where('user_id', cek[0].id_user)
        }else{
            await ForgotPassword.query().insert({
                user_id: cek[0].id_user,
                kode_verifikasi: kode
            })
        }

        let html = "Kode Verifikasi Lupa password anda adalah : <strong>" + kode + "</strong>"

        await this.sendEmail(req.email, html)

        this.responseSuccess({
            code:200,
            status:true,
            values: '',
            message: 'Kode Verifikasi Telah Terkirim, Silahkan Cek E-mail Anda'
        })
    }else{
        this.responseError({
            code:404,
            status:false,
            values:{},
            message: 'Email Anda Salah Silahkan Cek Ulang'
        })
    }
    
}

async function cekKode(request,response){
    let req = request.body

    let cek = await Users
                    .query()
                    .select('*')
                    .joinRelation('reset_passwords as r')
                    .where('users.email', req.email)
                    .where('r.kode_verifikasi', req.kode)

    if(cek.length > 0){
        this.responseSuccess({
            code:200,
            status:true,
            values: cek,
            message: 'Kode Verifikasi Anda Benar'
        })
    }else{
        this.responseError({
            code:404,
            status:false,
            values:{},
            message: 'Kode Verifikasi Salah, Silahkan Cek Kembali E-mail Anda'
        })
    }
}

async function ubahpassword(request, res){
    let req = request.body
    
    await this.validation(req, {
        password: 'required|min:8'
    })

    let update = await Users.query().update({
        password : this.bcrypt(req.password),
        password_asli: req.password
    })
    .where('email', req.email)

    if(update){
        this.responseSuccess({
            code:200,
            status:true,
            values: '',
            message: 'Password Berhasil di Ubah'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'Password Gagal di Ubah'
        })
    }
}

async function updateuid(request, res){
    let req = request.body

    let update = await Users.query().update({
        uid : req.uid
    })
    .where('email', req.email)

    if(update){
        this.responseSuccess({
            code:200,
            status:true,
            values: '',
            message: 'UID Berhasil di Ubah'
        })
    }else{
        this.responseError({
            code:400,
            status: false,
            values: {},
            message: 'UID Gagal di Ubah'
        })
    }
}

module.exports = { login , register, forgotPass, cekKode, ubahpassword, updateuid}
