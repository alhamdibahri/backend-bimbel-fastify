const { Model } = require('objection')
var environment = process.env.NODE_ENV || 'development'
var config = require('./../knexfile')[environment]
const Knex = require('knex')(config)

Model.knex(Knex);

class BaseModel extends Model {
    static get modelPaths() {
        return [__dirname];
    }

    $parseDatabaseJson(json) {
        json = super.$parseDatabaseJson(json);
        
        Object.keys(json).forEach(prop => {
          const value = json[prop];
          
          if (value instanceof Date) {
            json[prop] = value.toISOString();
          }
        });
    
        return json;
      }
}

module.exports = {
    BaseModel, Knex
};