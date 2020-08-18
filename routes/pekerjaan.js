const cp = process.cwd() + "/Controllers/";
const pekerjaan = require(cp + "support/PekerjaanController");

module.exports = function(fastify, opts, next) {
    fastify.get('/pekerjaan', {
        preValidation: [fastify.auth]
    }, pekerjaan.index)

    fastify.patch('/pekerjaan/update', {
        preValidation: [fastify.auth]
    }, pekerjaan.update)

    fastify.post('/pekerjaan/store', {
        preValidation: [fastify.auth]
    }, pekerjaan.store)

    fastify.delete('/pekerjaan/destroy/:id', {
        preValidation: [fastify.auth]
    }, pekerjaan.destroy)

    next();
};