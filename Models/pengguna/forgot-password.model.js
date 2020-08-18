const {BaseModel} = require('../base.model')

class ForgotPassword extends BaseModel{
    static get tableName(){
        return 'pengguna.reset_passwords'
    }

    static get idColumn(){
        return 'id_reset_password'
    }

    static get relationMappings(){
        return{
            users:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths  + '/pengguna/users.model',
                join:{
                    from: 'pengguna.reset_passwords.user_id',
                    to: 'pengguna.users.id_user'
                }
            }
        }
    }
}

module.exports = ForgotPassword