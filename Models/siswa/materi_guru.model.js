const {BaseModel} = require('../base.model')

class MateriGuru extends BaseModel{
    static get tableName(){
        return 'siswa.materi_guru'
    }

    static get idColumn(){
        return 'id_materi_guru'
    }

    static get relationMappings(){
        return{
            siswa:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths  + '/siswa/siswa.model',
                join:{
                    from: 'siswa.materi_guru.siswa_kd',
                    to: 'siswa.siswa.kd_siswa'
                }
            },
            guru:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/guru/guru.model',
                join:{
                    from: 'siswa.materi_guru.guru_kd',
                    to: 'guru.guru.kd_guru'
                }
            }
        }
    }
}

module.exports = MateriGuru