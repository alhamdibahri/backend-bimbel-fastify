'use strict'
global.base = process.cwd() + '/';
global.model = base + 'Models/';
global.controller = base + 'Controllers/';

const path = require('path')
const { readFileSync } = require('fs')
const AutoLoad = require('fastify-autoload')
// const multer = require('fastify-multer')
const serveStatic = require('serve-static')


function handle (conn) {
    conn.pipe(conn) // creates an echo server
  }

module.exports = function (fastify, opts, next) {
    console.log(`${path.join(__dirname, 'plugins')}\private.key`)
    fastify
        .register(require('fastify-cors'),{
            origin: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
            // methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
            // credentials: true
        })
        .register(require('fastify-formbody'))
        .register(require('fastify-helmet'))
        .register(require('fastify-jwt'), {
            secret: process.env.APP_KEY ? process.env.APP_KEY : 'youshouldspecifyalongsecret'   
        })
        .register(require('fastify-postgres'), {
            max: 1000,
            connectionString: process.env.DB_CONNECTION.concat('://',process.env.DB_USERNAME,':',process.env.DB_PASSWORD,'@',process.env.DB_HOST,':',process.env.DB_PORT,'/',process.env.DB_DATABASE)
        })
        // .register(require('fastify-static'),{
        //     root: path.join(__dirname, 'Storage'),
        //     prefix: '/*',
        // })
        // .register(multer.contentParser)
        .register(require('fastify-multipart'),{
            addToBody: true,
            // sharedSchemaId: 'MultipartFileType', // Optional shared schema id
        })

        fastify.register(require('fastify-websocket'), {
            handle,
            options: { maxPayload: 1048576 }
          })
    
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    })

    fastify.use('/foto_user/', serveStatic(path.join(__dirname, '/Storage/foto_user')))

    fastify.use('/materi_guru/', serveStatic(path.join(__dirname, '/Storage/materi_guru'),))

    fastify.use('/foto_berita/', serveStatic(path.join(__dirname, '/Storage/foto_berita'),{
        setHeaders: setCustomCacheControl
    }))

    function setCustomCacheControl (res, path) {
        if (serveStatic.mime.lookup(path) === 'text/html') {
          res.setHeader('Cache-Control', 'public, max-age=0')
        }
    }

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: Object.assign({}, opts)
    })

    fastify.setErrorHandler(function (error, request, reply) {
        request.log.warn(error)
        let defaults = {
            status: false,
            statusCode: 500,
            values: {},
            message: 'Oops! Terjadi Kesalahan'
        };
        const response = Object.assign(defaults, error);
        reply
            .code(response.statusCode)
            .header("Content-Type", "application/json; charset=utf8")
            .send({
                status: response.status,
                code: response.statusCode,
                values: response.values,
                message: response.message,
            });
    })

    fastify.setNotFoundHandler({
        preValidation: (request, reply, done) => {
            reply
                .code(404)
                .header("Content-Type", "application/json; charset=utf8")
                .send({
                    code: 404,
                    values: {},
                    message: "Halaman yang dicari tidak ada"
                });
            done()
        },
        preHandler: (req, reply, done) => {
            reply.send('preHandler')
            done()
        }
    }, function (request, reply) {
        reply.send('defauld handler')
    })
    next()
}