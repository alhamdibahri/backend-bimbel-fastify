const { BaseModel } = require('../base.model');
class Roles extends BaseModel {
    static get tableName() {
        return 'pengguna.roles';
    }
    static get idColumn() {
        return 'id_role';
    }
    static get relationMappings(){
        return {
            users:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths  + '/pengguna/users.model',
                join:{
                    from: 'pengguna.roles.id_role',
                    to: 'pengguna.users.role_id'
                }
            }
        }
    }
}
module.exports = Roles;