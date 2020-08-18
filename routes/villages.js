const cp = process.cwd() + "/Controllers/";
const villages = require(cp + "support/VillagesController");

module.exports = function(fastify, opts, next) {
    fastify.get('/villages', {
        preValidation: [fastify.auth]
    }, villages.index)
    
    fastify.get('/ddldistricts', {
        preValidation: [fastify.auth]
    }, villages.ddlDistricts)

    fastify.post('/villages/store', {
        preValidation: [fastify.auth]
    }, villages.store)

    fastify.patch('/villages/update', {
        preValidation: [fastify.auth]
    }, villages.update)

    fastify.delete('/villages/destroy/:id', {
        preValidation: [fastify.auth]
    }, villages.destroy)

    next();
};