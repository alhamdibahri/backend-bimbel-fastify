const {BaseModel} = require('../base.model')

class KategoriKelas extends BaseModel{
    static get tableName(){
        return 'guru.kategori_kelas'
    }
    static get idColumn(){
        return 'id_kategori_kelas'
    }
    static get relationMappings(){
        return{
            kelas:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/guru/kelas.model',
                join: {
                    from: 'guru.kategori_kelas.id_kategori_kelas',
                    to: 'guru.kelas.kategori_kelas_id'
                }
            },
            mata_pelajaran:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/guru/mata-pelajaran.model',
                join: {
                    from: 'guru.kategori_kelas.id_kategori_kelas',
                    to: 'guru.mata_pelajaran.kategori_kelas_id'
                }
            },
            guru:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/guru/guru.model',
                join: {
                    from: 'guru.kategori_kelas.id_kategori_kelas',
                    to: 'guru.guru.kategori_kelas_id'
                }
            },
        }
    }
}

module.exports = KategoriKelas