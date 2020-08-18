const cp = process.cwd() + "/Controllers/";
const siswa = require(cp + "siswa/SiswaController");

module.exports = function(fastify, opts, next) {
    fastify.get('/siswa/:status',{
        preValidation: [fastify.auth]
    }, siswa.index);

    fastify.get('/siswa/show/:id',{
        preValidation: [fastify.auth]
    }, siswa.show);

    fastify.get('/siswa/edit/:id',{
        preValidation: [fastify.auth]
    }, siswa.edit);

    fastify.get('/ddlschool/:bentuk/:regency',{
        preValidation: [fastify.auth]
    }, siswa.ddlschool);

    fastify.patch('/siswa/update',{
        preValidation: [fastify.auth]
    }, siswa.update);

    fastify.get('/siswa/editprofil/:id',{
        preValidation: [fastify.auth]
    }, siswa.editprofil);

    fastify.post('/siswa/updateprofil',{
        preValidation: [fastify.auth]
    }, siswa.updateprofil);

    fastify.get('/siswaguru',{
        preValidation: [fastify.auth]
    }, siswa.siswaguru);

    next();
};