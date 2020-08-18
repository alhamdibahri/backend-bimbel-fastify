const {BaseModel} = require('../base.model')

class JenisHarga extends BaseModel{
    static get tableName(){
        return 'guru.jenis_harga'
    }
    static get idColumn(){
        return 'id_jenis_harga'
    }
    static get relationMappings(){
        return{
            guru:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths  + '/guru/guru.model',
                join:{
                    from: 'guru.jenis_harga.id_jenis_harga',
                    to: 'guru.guru.jenis_harga_id'
                }
            }
        }
    }
}

module.exports = JenisHarga