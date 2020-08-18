const { BaseModel } = require('../base.model');
class Guru extends BaseModel {
    static get tableName() {
        return 'guru.guru';
    }
    static get idColumn() {
        return 'kd_guru';
    }
    static get relationMappings(){
        return {
            users:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths  + '/pengguna/users.model',
                join:{
                    from: 'guru.guru.user_id',
                    to: 'pengguna.users.id_user'
                }
            },
            kelas:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/guru/kelas.model',
                join: {
                    from: 'guru.guru.kelas_id',
                    to: 'guru.kelas.id_kelas'
                }
            },
            kategori_kelas:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/guru/kategori-kelas.model',
                join: {
                    from: 'guru.guru.kategori_kelas_id',
                    to: 'guru.kategori_kelas.id_kategori_kelas'
                }
            },
            mata_pelajaran:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/guru/mata-pelajaran.model',
                join: {
                    from: 'guru.guru.mata_pelajaran_id',
                    to: 'guru.mata_pelajaran.id_mata_pelajaran'
                }
            },
            educations:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/support/educations.model',
                join:{
                    from: 'guru.guru.education_id',
                    to: 'support.educations.id_education'
                }
            },
            jenis_harga:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths  + '/guru/jenis-harga.model',
                join:{
                    from: 'guru.guru.jenis_harga_id',
                    to: 'guru.jenis_harga.id_jenis_harga'
                }
            },
            guru_favorite:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/siswa/guru_favorite.model',
                join: {
                    from: 'guru.guru.kd_guru',
                    to: 'siswa.guru_favorite.guru_kd'
                }
            },
            ratings:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/siswa/rating.model',
                join: {
                    from: 'guru.guru.kd_guru',
                    to: 'siswa.ratings.guru_kd'
                }
            },
            history:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/siswa/history.model',
                join: {
                    from: 'guru.guru.kd_guru',
                    to: 'siswa.history.guru_kd'
                }
            },
            materi_guru:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/siswa/materi_guru.model',
                join: {
                    from: 'guru.guru.kd_guru',
                    to: 'siswa.materi_guru.guru_kd'
                }
            },
            pekerjaan:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/support/pekerjaan.model',
                join: {
                    from: 'guru.guru.pekerjaan_id',
                    to: 'support.pekerjaan.id_pekerjaan'
                }
            }
        }
    }
}
module.exports = Guru;