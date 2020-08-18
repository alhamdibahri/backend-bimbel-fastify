const {BaseModel} = require('../base.model')

class Schools extends BaseModel{
    static get tableName(){
        return 'support.schools'
    }
    static get idColumn(){
        return 'id_school'
    }
    static get relationMappings(){
        return{
            regencies:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/support/regencies.model',
                join:{
                    from: 'support.schools.regency_id',
                    to: 'support.regencies.id_regency'
                }
            },
            siswa:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/siswa/siswa.model',
                join:{
                    from: 'support.schools.id_school',
                    to: 'siswa.siswa.school_id'
                }
            }
        }
    }
}

module.exports = Schools