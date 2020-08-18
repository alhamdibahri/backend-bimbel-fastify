const {BaseModel} = require('../base.model')
class Villages extends BaseModel{
    static get tableName(){
        return 'support.villages'
    }
    static get idColumn(){
        return 'id_village'
    }
    static get relationMappings(){
        return{
            districts:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/support/districts.model',
                join:{
                    from: 'support.villages.district_id',
                    to: 'support.districts.id_district'
                }
            },
            users:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/pengguna/users.model',
                join:{
                    from: 'support.villages.id_village',
                    to: 'pengguna.users.village_id'
                }
            }
        }
    }
}

module.exports = Villages