const cp = process.cwd() + "/Controllers/";
const kelas = require(cp + "guru/KelasController");

module.exports = function(fastify, opts, next){
    fastify.get('/kelas', {
        preValidation:[fastify.auth]
    }, kelas.index)

    fastify.get('/ddlkategorikelas', {
        preValidation:[fastify.auth]
    }, kelas.ddlKategori)

    fastify.post('/kelas/store', {
        preValidation:[fastify.auth]
    }, kelas.store)

    fastify.patch('/kelas/update', {
        preValidation:[fastify.auth]
    }, kelas.update)

    fastify.delete('/kelas/destroy/:id', {
        preValidation:[fastify.auth]
    }, kelas.destroy)

    next()
}