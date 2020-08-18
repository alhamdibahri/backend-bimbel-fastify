const cp = process.cwd() + "/Controllers/";
const guru_favorite = require(cp + "siswa/GuruFavoriteController");

module.exports = function(fastify, opts, next) {
    fastify.post('/guru-favorite',{
        preValidation: [fastify.auth]
    }, guru_favorite.index);

    fastify.get('/guru-favorite/all',{
        preValidation: [fastify.auth]
    }, guru_favorite.allfavorit);
    
    fastify.post('/add-delete',{
        preValidation: [fastify.auth]
    }, guru_favorite.addDelete);

    next();
};