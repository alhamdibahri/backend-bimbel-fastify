'use strict'

const fp = require('fastify-plugin')
module.exports = fp(function(fastify, opts, next){
    fastify
    .decorate('auth', async function (request, reply) {
        let username = null
        let newtoken = null
        let jwtid = null
        let refeshToken = request.headers['keep-alive'];
        if (refeshToken){
            await fastify.jwt.verify(refeshToken, {complete : true}, (err, decoded) => {
                if (!err){
                    jwtid = decoded.header.kid
                    username = decoded.payload.executor
                    newtoken = this.createToken(username)
                }

            })
        }
        
        await request.jwtVerify(function (err, decoded) {
            if (newtoken && jwtid == decoded.jti){
                reply.header('token', JSON.stringify(newtoken))
            }else {
                if (err)
                    fastify.responseError({
                        code: 401,
                        values : {},
                        message : 'Silahkan Login Kembali!'
                    });
                console.log('zz')
                console.log(decoded)
                username = decoded.executor
            }

        })
        const rows = await this.DB('SELECT * FROM pengguna.users u INNER JOIN pengguna.roles r ON u.role_id=r.id_role where email=$1 OR username=$1', [username])
        await rows.count() > 0 ? request.users = await rows.first() : fastify.responseError({
            code: 401,
            values : {},
            message : 'Silahkan Login Kembali!'
        });
    })
    next()
})