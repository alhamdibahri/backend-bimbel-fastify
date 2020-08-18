'use strict'
const cp = process.cwd()+'/Controllers/'
const auth = require(cp+'AuthController')
module.exports = function (fastify, opts, next) {

    fastify.addHook('onRequest',async (req, reply) => {
        fastify.setReply(reply);

    });

    fastify.addHook('preHandler', async (request, reply) => {
        if (request.body && request.body.shipment){
            let routeExcept = ['/encrypt', 'decrypt'];
            let decrypted = null;
                try {
                    decrypted = fastify.decrypted(request.body.shipment)
                }catch (e) {
                    fastify.responseError({
                        message : 'Invalid Request!'
                    })
                }
            request.body.form = decrypted
        }
    })

    fastify.post('/login', auth.login);
    fastify.post('/register', auth.register);
    fastify.post('/forgot-password', auth.forgotPass);
    fastify.post('/cek-verfikasi', auth.cekKode);
    fastify.post('/password-baru', auth.ubahpassword);
    fastify.post('/updateuid', auth.updateuid);

    next()
}