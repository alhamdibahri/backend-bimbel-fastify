const cp = process.cwd() + "/Controllers/";
const materi = require(cp + "siswa/MateriGuruController");

module.exports = function(fastify, opts, next) {
    fastify.post('/upload-materi', {
        preValidation: [fastify.auth]
    }, materi.upload)

    fastify.get('/ddlsiswa', {
        preValidation: [fastify.auth]
    }, materi.ddlsiswa)

    fastify.get('/materi-guru', {
        preValidation: [fastify.auth]
    }, materi.getAll)

    next();
};