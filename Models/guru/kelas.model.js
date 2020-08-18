const {BaseModel} = require('../base.model')

class Kelas extends BaseModel{
    static get tableName(){
        return 'guru.kelas'
    }
    static get idColumn(){
        return 'id_kelas'
    }
    static get relationMappings(){
        return{
            kategori_kelas:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/guru/kategori-kelas.model',
                join: {
                    from: 'guru.kelas.kategori_kelas_id',
                    to: 'guru.kategori_kelas.id_kategori_kelas'
                }
            },
            mata_pelajaran:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/guru/mata-pelajaran.model',
                join: {
                    from: 'guru.kelas.id_kelas',
                    to: 'guru.mata_pelajaran.kelas_id'
                }
            },
            mata_pelajaran:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/guru/kelas.model',
                join: {
                    from: 'guru.kelas.id_kelas',
                    to: 'guru.guru.kelas_id'
                }
            },
        }
    }
}

module.exports = Kelas