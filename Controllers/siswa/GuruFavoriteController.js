const GuruFavorite = require(model + 'siswa/guru_favorite.model')
const Siswa = require(model + 'siswa/siswa.model')
async function index(req,res){
    let data = await GuruFavorite.query()
                    .select('id_guru_favorite')
                    .joinRelation('guru')
                    .joinRelation('siswa.[users]')
                    .where('id_user', req.users.id_user)
                    .where('guru_kd', req.body.id_guru).first()

    if(data != null){
        this.responseSuccess({
            code: 200,
            status: true,
            values: data,
            message: 'Data Guru Favorite Berhasil di dapatkan'
        })
    }else{
        this.responseError({
            code: 404,
            status: false,
            values: '',
            message: 'Data Guru Favorite Belum Ada'
        })
    }
}

async function addDelete(req,res){
    if(req.users.status == "0"){
        this.responseError({
            code: 404,
            status: false,
            values: {},
            message: "Segera Lengkapi profil anda, agar di verifikasi oleh admin"
        })
    }else if(req.users.status == "1"){
        let siswa = await Siswa.query().where('user_id', req.users.id_user).first()
        let data = await GuruFavorite.query()
                        .where('guru_kd', req.body.kd_guru)
                        .where('siswa_kd', siswa.kd_siswa).first()
        if(data != null){
            await GuruFavorite
                    .query()
                    .delete()
                    .where('guru_kd', req.body.kd_guru)
                    .where('siswa_kd', siswa.kd_siswa);
    
            this.responseSuccess({
                code: 200,
                status: true,
                values: data,
                message: 'Favorit Dihapus'
            })
            
        }else{
            await GuruFavorite
                    .query()
                    .insert({
                        guru_kd: req.body.kd_guru,
                        siswa_kd: siswa.kd_siswa
                    })
                    
                    this.responseSuccess({
                        code: 201,
                        status: true,
                        values: data,
                        message: 'Difavoritkan'
                    })
        }
    }else{
        this.responseError({
            code: 404,
            status: false,
            values: {},
            message: "Verifikasi anda ditolak, cek kembali data diri anda untuk mengajukan verifikasi ulang"
        })
    }
}
async function allfavorit(req, res){
    let data = await this.DB('SELECT u.id_user, u.foto, u.nama, g.harga, jh.jenis_harga, mp.mata_pelajaran, kk.kategori_kelas, k.kelas, g.kd_guru, d.district, CAST(COALESCE(round(CAST((SELECT CAST(SUM(nilai_rating)AS DOUBLE PRECISION)/(SELECT COUNT(*) FROM siswa.ratings r JOIN guru.guru gr ON r.guru_kd=gr.kd_guru WHERE g.kd_guru=gr.kd_guru) FROM siswa.ratings r JOIN guru.guru gr ON r.guru_kd=gr.kd_guru WHERE g.kd_guru=gr.kd_guru) as numeric), 1) ,0) AS DOUBLE PRECISION) AS rating,(SELECT gf.id_guru_favorite FROM siswa.guru_favorite gf JOIN siswa.siswa sw ON gf.siswa_kd=sw.kd_siswa AND gf.guru_kd=g.kd_guru WHERE sw.user_id=$1), CAST((SELECT COUNT(*) FROM siswa.history WHERE status_history=2::varchar AND guru_kd=g.kd_guru) AS DOUBLE PRECISION) FROM (pengguna.users u JOIN support.districts d ON d.id_district=u.district_id) JOIN (((((guru.guru g JOIN guru.kelas k ON g.kelas_id=k.id_kelas) JOIN guru.kategori_kelas kk ON kk.id_kategori_kelas=g.kategori_kelas_id) JOIN guru.mata_pelajaran mp ON mp.id_mata_pelajaran=g.mata_pelajaran_id) JOIN guru.jenis_harga jh ON g.jenis_harga_id=jh.id_jenis_harga) JOIN (siswa.guru_favorite gf JOIN siswa.siswa s ON s.kd_siswa=gf.siswa_kd) ON g.kd_guru=gf.guru_kd) ON u.id_user=g.user_id WHERE s.user_id=$1', [req.users.id_user])
        
    this.responseSuccess({
        code: 200,
        status: true,
        values: data.get(),
        message: 'Data Guru Favorite Berhasil di dapatkan'
    })
}

module.exports = {
    index, addDelete, allfavorit
}