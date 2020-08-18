const cp = process.cwd() + "/Controllers/";
const provinces = require(cp + "support/ProvincesController");

module.exports = function(fastify, opts, next) {
    fastify.get('/provinces', {
        preValidation: [fastify.auth]
    }, provinces.index)

    fastify.patch('/provinces/update', {
        preValidation: [fastify.auth]
    }, provinces.update)

    fastify.post('/provinces/store', {
        preValidation: [fastify.auth]
    }, provinces.store)

    fastify.delete('/provinces/destroy/:id', {
        preValidation: [fastify.auth]
    }, provinces.destroy)

    next();
};