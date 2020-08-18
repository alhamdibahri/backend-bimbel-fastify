const { BaseModel } = require('../base.model')
class Provinces extends BaseModel{
    static get tableName(){
        return 'support.provinces'
    }
    static get idColumn(){
        return 'id_province'
    }
    static get relationMappings(){
        return{
            users:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/pengguna/users.model',
                join: {
                    from: 'support.provinces.id_pronvince',
                    to: 'pengguna.users.province_id'
                }
            },
            regencies:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/support/regencies.model',
                join:{
                    from: 'support.provinces.id_province',
                    to: 'support.regencies.province_id'
                }
            }
        }
    }
}

module.exports = Provinces