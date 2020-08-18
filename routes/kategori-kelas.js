const cp = process.cwd() + "/Controllers/";
const kategorikelas = require(cp + "guru/KategoriKelasController");

module.exports = function(fastify, opts, next){
    fastify.get('/kategori-kelas', {
        preValidation:[fastify.auth]
    }, kategorikelas.index)

    fastify.post('/kategori-kelas/store', {
        preValidation:[fastify.auth]
    }, kategorikelas.store)

    fastify.patch('/kategori-kelas/update', {
        preValidation:[fastify.auth]
    }, kategorikelas.update)

    fastify.delete('/kategori-kelas/destroy/:id', {
        preValidation:[fastify.auth]
    }, kategorikelas.destroy)

    next()
}