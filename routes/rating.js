const cp = process.cwd() + "/Controllers/";
const rating = require(cp + "siswa/RatingController");

module.exports = function(fastify, opts, next) {
    fastify.post('/rating',{
        preValidation: [fastify.auth]
    }, rating.index);

    fastify.get('/rating/get/:id',{
        preValidation: [fastify.auth]
    }, rating.get);

    fastify.get('/komentar/:id',{
        preValidation: [fastify.auth]
    }, rating.komentar);

    fastify.get('/komentar/detail/:id/:rating/:komentar',{
        preValidation: [fastify.auth]
    }, rating.detail);

    next(); 
}