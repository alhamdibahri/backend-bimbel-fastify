const { BaseModel } = require('../base.model')
class KategoriBerita extends BaseModel{
    static get tableName(){
        return 'pengguna.kategori_berita'
    }
    static get idColumn(){
        return 'id_kategori_berita'
    }
    static get relationMappings(){
        return{
            berita:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/pengguna/berita.model',
                join:{
                    from: 'pengguna.kategori_berita.id_kategori_berita',
                    to: 'pengguna.berita.kategori_berita_id'
                }
            }
        }
    }
}

module.exports = KategoriBerita