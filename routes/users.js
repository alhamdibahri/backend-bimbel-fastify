const cp = process.cwd() + "/Controllers/";
const users = require(cp + "pengguna/UsersController");

module.exports = function(fastify, opts, next) {

    fastify.get('/users',{
        preValidation: [fastify.auth]
    }, users.index);

    fastify.get('/users/verifikasi/:status',{
        preValidation: [fastify.auth]
    }, users.verifikasi);

    fastify.get('/users/verifikasi/update/:id',{
        preValidation: [fastify.auth]
    }, users.updatebaca);

    fastify.get('/users/verifikasi/updateall',{
        preValidation: [fastify.auth]
    }, users.updatebacaall);

    fastify.get('/users/notifikasi',{
        preValidation: [fastify.auth]
    }, users.notifikasi);

    fastify.get('/users/tolak/:id',{
        preValidation: [fastify.auth]
    }, users.tolak);

    fastify.get('/users/terima/:id',{
        preValidation: [fastify.auth]
    }, users.terima);

    fastify.post('/users/store', {
        preValidation: [fastify.auth]
    },users.store);

    fastify.get('/ddlroles', {
        preValidation: [fastify.auth]
    }, users.ddlRoles);

    fastify.get('/users/edit/:id', {
        preValidation: [fastify.auth]
    }, users.edit);

    fastify.post('/users/update', {
        preValidation: [fastify.auth]
    }, users.update);

    fastify.delete('/users/destroy/:id', {
        preValidation: [fastify.auth]
    }, users.destroy);

    fastify.post('/users/ganti-password', {
        preValidation: [fastify.auth]
    }, users.changePassword);

    fastify.post('/users/editakun', {
        preValidation: [fastify.auth]
    }, users.editakun);
    
    fastify.get('/ddlrolesandro', users.ddlRolesAndorid);

    next();
};