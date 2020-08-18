const cp = process.cwd() + "/Controllers/";
const roles = require(cp + "pengguna/RolesController");

module.exports = function(fastify, opts, next) {
    fastify.get('/roles', {
        preValidation: [fastify.auth]
    }, roles.index)

    fastify.patch('/roles/update', {
        preValidation: [fastify.auth]
    }, roles.update)

    fastify.post('/roles/store', {
        preValidation: [fastify.auth]
    }, roles.store)

    fastify.delete('/roles/destroy/:id', {
        preValidation: [fastify.auth]
    }, roles.destroy)

    next();
};