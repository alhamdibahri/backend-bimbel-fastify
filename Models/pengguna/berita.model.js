const {BaseModel} = require('../base.model')
class Berita extends BaseModel{
    static get tableName(){
        return 'pengguna.berita'
    }
    static get idColumn(){
        return 'id_berita'
    }
    $beforeInsert(){
        this.created_at = new Date().toISOString()
        this.updated_at = new Date().toISOString()
    }
    $beforeUpdate(){
        this.updated_at = new Date().toISOString();
    }

    static get relationMappings(){
        return{
            users:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/pengguna/users.model',
                join: {
                    from: 'pengguna.berita.user_id',
                    to: 'pengguna.users.id_user'
                }
            },
            kategori_berita:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/pengguna/kategori_berita.model',
                join:{
                    from: 'pengguna.berita.kategori_berita_id',
                    to: 'pengguna.kategori_berita.id_kategori_berita'
                }
            }
        }
    }
}

module.exports = Berita