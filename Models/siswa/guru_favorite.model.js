const {BaseModel} = require('../base.model')
class GuruFavorite extends BaseModel{
    static get tableName(){
        return 'siswa.guru_favorite'
    }
    static get idColumn(){
        return 'id_guru_favorite'
    }
    static get relationMappings(){
        return{
            siswa:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths  + '/siswa/siswa.model',
                join:{
                    from: 'siswa.guru_favorite.siswa_kd',
                    to: 'siswa.siswa.kd_siswa'
                }
            },
            guru:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/guru/guru.model',
                join:{
                    from: 'siswa.guru_favorite.guru_kd',
                    to: 'guru.guru.kd_guru'
                }
            }
        }
    }
}

module.exports = GuruFavorite