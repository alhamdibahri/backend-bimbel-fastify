const {BaseModel} = require('../base.model')

class MataPelajaran extends BaseModel{
    static get tableName(){
        return 'guru.mata_pelajaran'
    }
    static get idColumn(){
        return 'id_mata_pelajaran'
    }
    static get relationMappings(){
        return{
            kelas:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/guru/kelas.model',
                join: {
                    from: 'guru.mata_pelajaran.kelas_id',
                    to: 'guru.kelas.id_kelas'
                }
            },
            kategori_kelas:{
                relation: BaseModel.HasOneRelation,
                modelClass: BaseModel.modelPaths + '/guru/kategori-kelas.model',
                join: {
                    from: 'guru.mata_pelajaran.kategori_kelas_id',
                    to: 'guru.kategori_kelas.id_kategori_kelas'
                }
            },
            guru:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/guru/guru.model',
                join: {
                    from: 'guru.mata_pelajaran.id_mata_pelajaran',
                    to: 'guru.mata_pelajaran.mata_pelajaran_id'
                }
            },
        }
    }
}

module.exports = MataPelajaran