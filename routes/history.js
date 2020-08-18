const cp = process.cwd() + "/Controllers/";
const history = require(cp + "siswa/HistoryController");

module.exports = function(fastify, opts, next) {
    fastify.post('/history/pengajuan',{
        preValidation: [fastify.auth]
    }, history.index);

    fastify.get('/history/:status',{
        preValidation: [fastify.auth]
    }, history.history);

    fastify.get('/history_guru/:id',{
        preValidation: [fastify.auth]
    }, history.history_guru);

    fastify.get('/history_siswa/:id',{
        preValidation: [fastify.auth]
    }, history.history_siswa);

    fastify.delete('/history/destroy/:id',{
        preValidation: [fastify.auth]
    }, history.destroy);

    fastify.get('/history_detail_siswa/:id',{
        preValidation: [fastify.auth]
    }, history.history_detail_siswa);

    fastify.get('/history_detail_guru/:id',{
        preValidation: [fastify.auth]
    }, history.history_detail_guru);

    fastify.get('/history/detail_history/:id',{
        preValidation: [fastify.auth]
    }, history.detail_history);

    fastify.get('/history/terima/:id',{
        preValidation: [fastify.auth]
    }, history.terima);

    fastify.post('/history/tolak',{
        preValidation: [fastify.auth]
    }, history.tolak);

    fastify.post('/history/batalkan',{
        preValidation: [fastify.auth]
    }, history.batalkan);

    fastify.get('/history/selesai/:id',{
        preValidation: [fastify.auth]
    }, history.selesai);

    next();
};