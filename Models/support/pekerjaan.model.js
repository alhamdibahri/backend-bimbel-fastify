const {BaseModel} = require('./../base.model')

class Pekerjaan extends BaseModel{
    static get tableName(){
        return 'support.pekerjaan'
    }
    static get idColumn(){
        return 'id_pekerjaan'
    }

    static get relationMappings(){
        return {
            guru:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/guru/guru.model',
                join: {
                    from: 'support.pekerjaan.id_pekerjaan',
                    to: 'guru.guru.pekerjaan_id'
                }
            }
        }
    }
}

module.exports = Pekerjaan