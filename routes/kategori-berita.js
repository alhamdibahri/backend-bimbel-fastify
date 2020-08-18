const cp = process.cwd() + "/Controllers/";
const kategoriberita = require(cp + "pengguna/KategoriBeritaController");

module.exports = function(fastify, opts, next) {
    fastify.get('/kategori-berita', {
        preValidation: [fastify.auth]
    }, kategoriberita.index)

    fastify.patch('/kategori-berita/update', {
        preValidation: [fastify.auth]
    }, kategoriberita.update)

    fastify.post('/kategori-berita/store', {
        preValidation: [fastify.auth]
    }, kategoriberita.store)

    fastify.delete('/kategori-berita/destroy/:id', {
        preValidation: [fastify.auth]
    }, kategoriberita.destroy)

    next();
};