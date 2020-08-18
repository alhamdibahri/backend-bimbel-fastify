const cp = process.cwd() + "/Controllers/";
const matapelajaran = require(cp + "guru/MataPelajaranController");

module.exports = function(fastify, opts, next){
    fastify.get('/mata-pelajaran', {
        preValidation:[fastify.auth]
    }, matapelajaran.index)

    fastify.get('/ddlkelas/:id', {
        preValidation:[fastify.auth]
    }, matapelajaran.ddlKelas)

    fastify.post('/mata-pelajaran/store', {
        preValidation:[fastify.auth]
    }, matapelajaran.store)

    fastify.patch('/mata-pelajaran/update', {
        preValidation:[fastify.auth]
    }, matapelajaran.update)

    fastify.delete('/mata-pelajaran/destroy/:id', {
        preValidation:[fastify.auth]
    }, matapelajaran.destroy)

    next()
}