const {BaseModel} = require('../base.model')
class Districts extends BaseModel{
    static get tableName(){
        return 'support.districts'
    }
    static get idColumn(){
        return 'id_district'
    }
    static get relationMappings(){
        return{
            regencies:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/support/regencies.model',
                join:{
                    from: 'support.districts.regency_id',
                    to: 'support.regencies.id_regency'
                }
            },
            villages:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/support/villages.model',
                join:{
                    from: 'support.districts.id_district',
                    to: 'support.villages.district_id'
                }
            },
            users:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/pengguna/users.model',
                join:{
                    from: 'support.districts.id_district',
                    to: 'pengguna.users.district_id'
                }
            }
        }
    }
}

module.exports = Districts