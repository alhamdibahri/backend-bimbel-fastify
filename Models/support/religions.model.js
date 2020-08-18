const { BaseModel } = require('../base.model')

class Religions extends BaseModel{
    static get tableName(){
        return 'support.religions'
    }
    static get idColumn(){
        return 'id_religion'
    }
    static get relationMappings(){
        return{
            users:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/pengguna/users.model',
                join: {
                    from: 'support.religions.id_religion',
                    to: 'pengguna.users.religion_id'
                }
            }
        }
    }
}

module.exports = Religions