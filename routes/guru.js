const cp = process.cwd() + "/Controllers/";
const guru = require(cp + "guru/GuruController");

module.exports = function(fastify, opts, next) {
    fastify.get('/guru/:status',{
        preValidation: [fastify.auth]
    }, guru.index);

    fastify.get('/guru/message',{
        preValidation: [fastify.auth]
    }, guru.messageGuru);

    fastify.post('/allguru',{
        preValidation: [fastify.auth]
    }, guru.allguru);

    fastify.get('/guru/show/:id',{
        preValidation: [fastify.auth]
    }, guru.show);

    fastify.get('/guru/edit/:id',{
        preValidation: [fastify.auth]
    }, guru.edit);

    fastify.get('/ddleducation',{
        preValidation: [fastify.auth]
    }, guru.ddleducation);

    fastify.get('/ddlpelajaran/:id',{
        preValidation: [fastify.auth]
    }, guru.ddlpelajaran);

    fastify.get('/ddljenisharga',{
        preValidation: [fastify.auth]
    }, guru.ddljenisharga);

    fastify.patch('/guru/update',{
        preValidation: [fastify.auth]
    }, guru.update);

    fastify.get('/guru/editprofil/:id',{
        preValidation: [fastify.auth]
    }, guru.editprofil);

    fastify.post('/guru/updateprofil',{
        preValidation: [fastify.auth]
    }, guru.updateprofil);

    next();
};