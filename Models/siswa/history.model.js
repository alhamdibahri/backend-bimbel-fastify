const {BaseModel} = require('../base.model')

class History extends BaseModel{
    static get tableName(){
        return 'siswa.history'
    }

    static get idColumn(){
        return 'id_history'
    }

    static get relationMappings(){
        return{
            siswa:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths  + '/siswa/siswa.model',
                join:{
                    from: 'siswa.history.siswa_kd',
                    to: 'siswa.siswa.kd_siswa'
                }
            },
            guru:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/guru/guru.model',
                join:{
                    from: 'siswa.history.guru_kd',
                    to: 'guru.guru.kd_guru'
                }
            }
        }
    }
}

module.exports = History