async function index(req, res){
    let JumUser = await this.DB('SELECT * FROM pengguna.users')
    let JumKelas = await this.DB('SELECT * FROM guru.kelas')
    let JumMataPelajaran = await this.DB('SELECT * FROM guru.mata_pelajaran')
    let JumBerita = await this.DB('SELECT * FROM pengguna.berita')

    let data = {
        user: JumUser.count(),
        kelas:  JumKelas.count(),
        pelajaran: JumMataPelajaran.count(),
        berita: JumBerita.count()
    }

    this.responseSuccess({
        code:200,
        status: true,
        values : data,
        message : 'Data Berhasil di Dapatkan'
    })
}

module.exports = { index }