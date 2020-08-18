const cp = process.cwd() + "/Controllers/";
const educations = require(cp + "support/EducationsController");

module.exports = function(fastify, opts, next){
    fastify.get('/educations', {
        preValidation:[fastify.auth]
    }, educations.index)

    fastify.post('/educations/store', {
        preValidation:[fastify.auth]
    }, educations.store)

    fastify.patch('/educations/update', {
        preValidation:[fastify.auth]
    }, educations.update)

    fastify.delete('/educations/destroy/:id', {
        preValidation:[fastify.auth]
    }, educations.destroy)

    next()
}