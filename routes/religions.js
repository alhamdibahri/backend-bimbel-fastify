const cp = process.cwd() + "/Controllers/";
const religions = require(cp + "support/ReligionsController");

module.exports = function(fastify, opts, next){
    fastify.get('/religions', {
        preValidation:[fastify.auth]
    }, religions.index)

    fastify.post('/religions/store', {
        preValidation:[fastify.auth]
    }, religions.store)

    fastify.patch('/religions/update', {
        preValidation:[fastify.auth]
    }, religions.update)

    fastify.delete('/religions/destroy/:id', {
        preValidation:[fastify.auth]
    }, religions.destroy)

    next()
}