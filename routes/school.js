const cp = process.cwd() + "/Controllers/";
const school = require(cp + "support/SchoolController");

module.exports = function(fastify, opts, next) {
    fastify.get('/support/school', {
        preValidation: [fastify.auth]
    }, school.index);

    fastify.get('/support/school/edit/:id', {
        preValidation: [fastify.auth]
    }, school.edit);

    fastify.post('/support/school/store', {
        preValidation: [fastify.auth]
    }, school.store);

    fastify.patch('/support/school/update', {
        preValidation: [fastify.auth]
    }, school.update);

    fastify.delete('/support/school/destroy/:id', {
        preValidation: [fastify.auth]
    }, school.destroy);

    next();
};