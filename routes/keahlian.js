const cp = process.cwd() + "/Controllers/";
const keahlian = require(cp + "support/KeahlianController");

module.exports = function(fastify, opts, next) {
    fastify.get('/keahlian', {
        preValidation: [fastify.auth]
    }, keahlian.index)

    fastify.patch('/keahlian/update', {
        preValidation: [fastify.auth]
    }, keahlian.update)

    fastify.post('/keahlian/store', {
        preValidation: [fastify.auth]
    }, keahlian.store)

    fastify.delete('/keahlian/destroy/:id', {
        preValidation: [fastify.auth]
    }, keahlian.destroy)

    next();
};