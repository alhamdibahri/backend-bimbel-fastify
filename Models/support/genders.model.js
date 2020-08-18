const { BaseModel } = require('../base.model')

class Genders extends BaseModel{
    static get tableName(){
        return 'support.genders'
    }
    static get idColumn(){
        return 'id_gender'
    }
    static get relationMappings(){
        return{
            users:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/pengguna/users.model',
                join: {
                    from: 'support.genders.id_gender',
                    to: 'pengguna.users.gender_id'
                }
            }
        }
    }
}

module.exports = Genders