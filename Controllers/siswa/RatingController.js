const Rating = require(model + "siswa/rating.model")

async function index(req,res){ 

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    const yyyy = today.getFullYear();
    if(dd<10) { dd=`0${dd}`; } 
    if(mm<10) { mm=`0${mm}`; }

    today = `${yyyy}-${mm}-${dd}`;

    await Rating.query().insert({
        nilai_rating: req.body.rating,
        guru_kd: req.body.guru,
        siswa_kd:req.body.siswa,
        history_id:req.body.history,
        komentar: req.body.komentar,
        tanggal_komentar: today
    })

    this.responseSuccess({
        code:200,
        status: true,
        values: '',
        message: 'Terimakasih telah memberikan penilaian'
    })
}

async function get(req,res){

    let bimbingan = await this.DB('SELECT COUNT(*) FROM siswa.history WHERE status_history=2::varchar AND guru_kd=$1 LIMIT 1', [req.params.id]);

    let data = await this.DB('SELECT round(CAST((SELECT CAST(SUM(nilai_rating)AS DOUBLE PRECISION)/(SELECT COUNT(*) FROM siswa.ratings r JOIN guru.guru s ON r.guru_kd=s.kd_guru WHERE s.kd_guru=$1) FROM siswa.ratings r JOIN guru.guru s ON r.guru_kd=s.kd_guru WHERE s.kd_guru=$1) as numeric), 1) AS rating FROM pengguna.users u JOIN ((guru.guru s JOIN siswa.history h ON s.kd_guru=h.guru_kd) JOIN siswa.ratings r ON s.kd_guru=r.guru_kd) ON u.id_user=s.user_id WHERE s.kd_guru=$1 LIMIT 1', [req.params.id])

    this.responseSuccess({
        code:200,
        status: true,
        values: {
            rating: data.get(),
            count: bimbingan.get()
        },
        message: 'Data rating berhasil di dapatkan'
    })
}

async function komentar(req,res){
    let data = await this.DB('SELECT u.nama, r.nilai_rating, r.komentar, r.tanggal_komentar, (SELECT COUNT(*) FROM siswa.ratings r JOIN siswa.history h ON r.history_id=h.id_history WHERE r.guru_kd=$1) AS count FROM pengguna.users u JOIN (siswa.siswa s JOIN (siswa.ratings r JOIN guru.guru g ON r.guru_kd=g.kd_guru ) ON s.kd_siswa=r.siswa_kd) ON u.id_user=s.user_id WHERE g.kd_guru=$1 ORDER BY r.id_rating DESC LIMIT 1', [req.params.id])

    this.responseSuccess({
        code:200,
        status: true,
        values: data.get(),
        message: 'Data Penilaian berhasil di dapatkan'
    })
}

async function detail(req,res){
    
    let rating1 = await this.DB('SELECT COUNT(*) FROM siswa.ratings r JOIN siswa.history h ON r.history_id=h.id_history WHERE r.guru_kd=$1 AND r.nilai_rating=1', [req.params.id])
    let rating2 = await this.DB('SELECT COUNT(*) FROM siswa.ratings r JOIN siswa.history h ON r.history_id=h.id_history WHERE r.guru_kd=$1 AND r.nilai_rating=2', [req.params.id])
    let rating3 = await this.DB('SELECT COUNT(*) FROM siswa.ratings r JOIN siswa.history h ON r.history_id=h.id_history WHERE r.guru_kd=$1 AND r.nilai_rating=3', [req.params.id])
    let rating4 = await this.DB('SELECT COUNT(*) FROM siswa.ratings r JOIN siswa.history h ON r.history_id=h.id_history WHERE r.guru_kd=$1 AND r.nilai_rating=4', [req.params.id])
    let rating5 = await this.DB('SELECT COUNT(*) FROM siswa.ratings r JOIN siswa.history h ON r.history_id=h.id_history WHERE r.guru_kd=$1 AND r.nilai_rating=5', [req.params.id])

    let r1 = rating1.first().count;
    let r2 = rating2.first().count;
    let r3 = rating3.first().count;
    let r4 = rating4.first().count;
    let r5 = rating5.first().count;

    let data = "";

    if(req.params.rating == 0){
        if(req.params.komentar != ""){
            data = await this.DB('SELECT u.nama, r.nilai_rating, r.komentar, r.tanggal_komentar, (SELECT COUNT(*) FROM siswa.ratings r JOIN siswa.history h ON r.history_id=h.id_history WHERE r.guru_kd=$1) AS count FROM pengguna.users u JOIN (siswa.siswa s JOIN (siswa.ratings r JOIN guru.guru g ON r.guru_kd=g.kd_guru ) ON s.kd_siswa=r.siswa_kd) ON u.id_user=s.user_id WHERE g.kd_guru=$1 AND r.komentar IS NOT NULL ORDER BY r.id_rating DESC', [req.params.id])
        }else{
            data = await this.DB('SELECT u.nama, r.nilai_rating, r.komentar, r.tanggal_komentar, (SELECT COUNT(*) FROM siswa.ratings r JOIN siswa.history h ON r.history_id=h.id_history WHERE r.guru_kd=$1) AS count FROM pengguna.users u JOIN (siswa.siswa s JOIN (siswa.ratings r JOIN guru.guru g ON r.guru_kd=g.kd_guru ) ON s.kd_siswa=r.siswa_kd) ON u.id_user=s.user_id WHERE g.kd_guru=$1 ORDER BY r.id_rating DESC', [req.params.id])
        }
        
    }else{
        data = await this.DB('SELECT u.nama, r.nilai_rating, r.komentar, r.tanggal_komentar, (SELECT COUNT(*) FROM siswa.ratings r JOIN siswa.history h ON r.history_id=h.id_history WHERE r.guru_kd=$1) AS count FROM pengguna.users u JOIN (siswa.siswa s JOIN (siswa.ratings r JOIN guru.guru g ON r.guru_kd=g.kd_guru ) ON s.kd_siswa=r.siswa_kd) ON u.id_user=s.user_id WHERE g.kd_guru=$1 AND r.nilai_rating=$2 ORDER BY r.id_rating DESC', [req.params.id, req.params.rating])
    }
    

    this.responseSuccess({
        code:200,
        status: true,
        values: {
            komentar: data.get(),
            r1,
            r2,
            r3,
            r4,
            r5
        },
        message: 'Data Penilaian berhasil di dapatkan'
    })
}

module.exports = {
    index, get, komentar, detail
}