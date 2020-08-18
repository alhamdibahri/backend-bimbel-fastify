const cp = process.cwd() + "/Controllers/";
const berita = require(cp + "pengguna/BeritaController");

module.exports = function(fastify, opts, next) {
    fastify.get('/berita', {
        preValidation: [fastify.auth]
    }, berita.index)

    fastify.get('/berita/show/:id', {
        preValidation: [fastify.auth]
    }, berita.show)

    fastify.get('/ddlkategoriberita', {
        preValidation: [fastify.auth]
    }, berita.ddlKategoriBerita)

    fastify.get('/berita/edit/:id', {
        preValidation: [fastify.auth]
    }, berita.edit)

    fastify.patch('/berita/update', {
        preValidation: [fastify.auth]
    }, berita.update)

    fastify.post('/berita/store', {
        preValidation: [fastify.auth]
    }, berita.store)

    fastify.delete('/berita/destroy/:id', {
        preValidation: [fastify.auth]
    }, berita.destroy)

    next();
};