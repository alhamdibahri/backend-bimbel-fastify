const { BaseModel } = require('../base.model');
class Users extends BaseModel {
    static get tableName() {
        return 'pengguna.users';
    }
    static get idColumn() {
        return 'id_user';
    }
    
    $beforeInsert() {
        this.created_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
    }

    $beforeUpdate(){
        this.updated_at = new Date().toISOString();
    }

    static get relationMappings(){
        return {
            roles:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths  + '/pengguna/roles.model',
                join:{
                    from: 'pengguna.users.role_id',
                    to: 'pengguna.roles.id_role'
                }
            },
            guru:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/guru/guru.model',
                join:{
                    from: 'pengguna.users.id_user',
                    to: 'guru.guru.user_id'
                }
            },
            siswa:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/siswa/siswa.model',
                join:{
                    from: 'pengguna.users.id_user',
                    to: 'siswa.siswa.user_id'
                }
            },
            genders:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/support/genders.model',
                join:{
                    from: 'pengguna.users.gender_id',
                    to: 'support.genders.id_gender'
                }
            },
            religions:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/support/religions.model',
                join: {
                    from: 'pengguna.users.religion_id',
                    to: 'support.religions.id_religion'
                }
            },
            provinces:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/support/provinces.model',
                join:{
                    from: 'pengguna.users.province_id',
                    to: 'support.provinces.id_province'
                }
            },
            regencies:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/support/regencies.model',
                join:{
                    from: 'pengguna.users.regency_id',
                    to: 'support.regencies.id_regency'
                }
            },
            districts:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/support/districts.model',
                join: {
                    from: 'pengguna.users.district_id',
                    to: 'support.districts.id_district'
                }
            },
            villages:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/support/villages.model',
                join:{
                    from: 'pengguna.users.village_id',
                    to: 'support.villages.id_village'
                }
            },
            berita:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/pengguna/berita.model',
                join:{
                    from: 'pengguna.users.id_user',
                    to: 'pengguna.berita.user_id'
                }
            },
            reset_passwords:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths  + '/pengguna/forgot-password.model',
                join:{
                    from: 'pengguna.users.id_user',
                    to: 'pengguna.reset_passwords.user_id'
                }
            }
        }
    }
}
module.exports = Users;