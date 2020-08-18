const cp = process.cwd() + "/Controllers/";
const admin = require(cp + "pengguna/AdminController");

module.exports = function(fastify, opts, next) {
    fastify.get('/admin',{
        preValidation: [fastify.auth]
    }, admin.index);

    fastify.get('/admin/show/:id',{
        preValidation: [fastify.auth]
    }, admin.show);

    fastify.get('/ddlkabupaten/:id',{
        preValidation: [fastify.auth]
    }, admin.ddlkota);

    fastify.get('/ddlkecamatan/:id',{
        preValidation: [fastify.auth]
    }, admin.ddlkecamatan);

    fastify.get('/ddldesa/:id',{
        preValidation: [fastify.auth]
    }, admin.ddldesa);

    fastify.patch('/admin/update',{
        preValidation: [fastify.auth]
    }, admin.update);

    fastify.get('/ddlgender',{
        preValidation: [fastify.auth]
    }, admin.ddlgender);

    fastify.get('/ddlreligion',{
        preValidation: [fastify.auth]
    }, admin.ddlreligion);

    next();
};