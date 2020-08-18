const cp = process.cwd() + "/Controllers/";
const genders = require(cp + "support/GendersController");

module.exports = function(fastify, opts, next){
    fastify.get('/genders', {
        preValidation:[fastify.auth]
    }, genders.index)

    fastify.post('/genders/store', {
        preValidation:[fastify.auth]
    }, genders.store)

    fastify.patch('/genders/update', {
        preValidation:[fastify.auth]
    }, genders.update)

    fastify.delete('/genders/destroy/:id', {
        preValidation:[fastify.auth]
    }, genders.destroy)

    next()
}