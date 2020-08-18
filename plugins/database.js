'use strict'

const fp = require('fastify-plugin')

module.exports = fp(function(fastify,opts,next){
    fastify
        .decorate('DB', async function(query, binding){
            let res = await new Promise((resolve, reject) => {
                fastify.pg.pool.query(query, binding, 
                    function onResult(err,res){
                        if(err){
                            console.log(err)
                            fastify.responseError({
                                code: 500,
                                values: err,
                                message: "Database Connection Exception"
                            })
                            reject(err)
                        }
                        resolve(res)
                    })
            })
            let obj = {
                get(){
                    return res.rows
                },
                count(){
                    return res.rows.length
                },
                first(){
                    return typeof res.rows[0] == 'undefined' ? false : res.rows[0]
                }
            }
            return obj;
        })
    next()
})