const {BaseModel} = require('../base.model')
class Educations extends BaseModel{
    static get tableName(){
        return 'support.educations'
    }
    static get idColumn(){
        return 'id_education'
    }
    static get relationMappings(){
        return{
            guru:{
                relation: BaseModel.HasManyRelation,
                modelClass: BaseModel.modelPaths + '/guru/guru.model',
                join:{
                    from: 'support.educations.id_education',
                    to: 'guru.guru.education_id'
                }
            },
        }
    }
}

module.exports = Educations