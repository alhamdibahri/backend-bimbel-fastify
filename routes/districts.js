const cp = process.cwd() + "/Controllers/";
const districts = require(cp + "support/DistrictsController");

module.exports = function(fastify, opts, next) {
    fastify.get('/districts', {
        preValidation: [fastify.auth]
    }, districts.index)
    
    fastify.get('/ddlregencies', {
        preValidation: [fastify.auth]
    }, districts.ddlRegencies)

    fastify.post('/districts/store', {
        preValidation: [fastify.auth]
    }, districts.store)

    fastify.patch('/districts/update', {
        preValidation: [fastify.auth]
    }, districts.update)

    fastify.delete('/districts/destroy/:id', {
        preValidation: [fastify.auth]
    }, districts.destroy)

    next();
};