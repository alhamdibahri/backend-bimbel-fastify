const { BaseModel } = require('../base.model');
class Siswa extends BaseModel {
    static get tableName() {
        return 'siswa.siswa';
    }
    static get idColumn() {
        return 'kd_siswa';
    }
    
    static get relationMappings(){
        return {
            users:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths  + '/pengguna/users.model',
                join:{
                    from: 'siswa.siswa.user_id',
                    to: 'pengguna.users.id_user'
                }
            },
            kelas:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/guru/kelas.model',
                join: {
                    from: 'siswa.siswa.kelas_id',
                    to: 'guru.kelas.id_kelas'
                }
            },
            kategori_kelas:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/guru/kategori-kelas.model',
                join: {
                    from: 'siswa.siswa.kategori_kelas_id',
                    to: 'guru.kategori_kelas.id_kategori_kelas'
                }
            },
            schools:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/support/schools.model',
                join:{
                    from: 'siswa.siswa.school_id',
                    to: 'support.schools.id_school'
                }
            },
            guru_favorite:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/siswa/guru_favorite.model',
                join: {
                    from: 'siswa.siswa.kd_siswa',
                    to: 'siswa.guru_favorite.siswa_kd'
                }
            },
            ratings:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/siswa/rating.model',
                join: {
                    from: 'siswa.siswa.kd_siswa',
                    to: 'siswa.ratings.siswa_kd'
                }
            },
            history:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/siswa/history.model',
                join: {
                    from: 'siswa.siswa.kd_siswa',
                    to: 'siswa.history.siswa_kd'
                }
            },
            materi_guru:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/siswa/materi_guru.model',
                join: {
                    from: 'siswa.siswa.kd_siswa',
                    to: 'siswa.materi_guru.siswa_kd'
                }
            }
        }
    }
}
module.exports = Siswa;