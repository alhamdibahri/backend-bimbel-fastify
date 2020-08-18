const cp = process.cwd() + "/Controllers/";
const regencies = require(cp + "support/RegenciesController");

module.exports = function(fastify, opts, next) {
    fastify.get('/regencies', {
        preValidation: [fastify.auth]
    }, regencies.index)
    
    fastify.get('/ddlprovinces', {
        preValidation: [fastify.auth]
    }, regencies.ddlProvinces)

    fastify.patch('/regencies/update', {
        preValidation: [fastify.auth]
    }, regencies.update)

    fastify.post('/regencies/store', {
        preValidation: [fastify.auth]
    }, regencies.store)

    fastify.delete('/regencies/destroy/:id', {
        preValidation: [fastify.auth]
    }, regencies.destroy)

    next();
};