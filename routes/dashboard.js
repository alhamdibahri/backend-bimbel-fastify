const cp = process.cwd() + "/Controllers/";
const dashboard = require(cp + "DashboardController");

module.exports = function(fastify, opts, next) {
    fastify.get('/', {
        preValidation: [fastify.auth]
    }, dashboard.index)

    next();
};