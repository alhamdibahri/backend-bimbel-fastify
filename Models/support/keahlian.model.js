const {BaseModel} = require('./../base.model')

class Keahlian extends BaseModel{
    static get tableName(){
        return 'support.keahlian'
    }
    static get idColumn(){
        return 'id_keahlian'
    }
}

module.exports = Keahlian