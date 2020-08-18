const cp = process.cwd() + "/Controllers/";
const jenisharga = require(cp + "guru/JenisHargaController");

module.exports = function(fastify, opts, next){
    fastify.get('/jenis-harga', {
        preValidation:[fastify.auth]
    }, jenisharga.index)

    fastify.post('/jenis-harga/store', {
        preValidation:[fastify.auth]
    }, jenisharga.store)

    fastify.patch('/jenis-harga/update', {
        preValidation:[fastify.auth]
    }, jenisharga.update)

    fastify.delete('/jenis-harga/destroy/:id', {
        preValidation:[fastify.auth]
    }, jenisharga.destroy)

    next()
}