const {BaseModel} = require('../base.model')
class Regencies extends BaseModel{
    static get tableName(){
        return 'support.regencies'
    }
    static get idColumn(){
        return 'id_regency'
    }
    static get relationMappings(){
        return{
            provinces:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/support/provinces.model',
                join:{
                    from: 'support.regencies.province_id',
                    to: 'support.provinces.id_province'
                }
            },
            districts:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/support/districts.model',
                join:{
                    from: 'support.regencies.id_regency',
                    to: 'support.districts.regency_id'
                }
            },
            schools:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/support/schools.model',
                join:{
                    from: 'support.regencies.id_regency',
                    to: 'support.schools.regency_id'
                }
            },
            users:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/pengguna/users.model',
                join:{
                    from: 'support.regencies.id_regency',
                    to: 'pengguna.users.regency_id'
                }
            }
        }
    }
}

module.exports = Regencies