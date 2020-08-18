const {BaseModel} = require('../base.model')

class Rating extends BaseModel{
    static get tableName(){
        return 'siswa.ratings'
    }

    static get idColumn(){
        return 'id_rating'
    }

    static get relationMappings(){
        return{
            siswa:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths  + '/siswa/siswa.model',
                join:{
                    from: 'siswa.ratings.siswa_kd',
                    to: 'siswa.siswa.kd_siswa'
                }
            },
            guru:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/guru/guru.model',
                join:{
                    from: 'siswa.ratings.guru_kd',
                    to: 'guru.guru.kd_guru'
                }
            }
        }
    }
}

module.exports = Rating