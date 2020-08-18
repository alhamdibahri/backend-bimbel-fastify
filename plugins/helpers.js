'use strict'

const fp = require('fastify-plugin');
const { responseError, responseSuccess } = require('../service/Response');
const { encrypt, decrypt } = require('../service/Encryption');
const nodemailer = require('nodemailer')
let result = null;
module.exports = fp(function (fastify, opts, next) {
  fastify
    .decorate('setReply', async function (reply) {
      result = reply;
    })
    .decorate('responseSuccess', function (options, reply) {
      responseSuccess(options, reply)
    })
    .decorate('responseError', function (options) {
      responseError(options)
    })
    .decorate('encrypt', function (text) {
      return encrypt(text);
    })
    .decorate('decrypted', function (text) {
      return decrypt(text);
    })
    .decorate('bcrypt', function (value) {
      var bcrypt = require('bcryptjs');
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(value, salt);
    })
    .decorate('bcryptCheck', async function (value, compare) {
      var bcrypt = require('bcryptjs');
      return bcrypt.compareSync(value, compare);
    })
    .decorate('createToken', function (username, userId, role) {
      const crypto = require('crypto');
      let tokenid = crypto.randomBytes(25).toString('hex');

      return {
        token: this.jwt.sign({
          executor: username,
          incumbency: role,
          executorId : userId
        }, {
          expiresIn: '1d',
          jwtid: tokenid
        }),
        refreshToken: this.jwt.sign({
          executor: username,
          incumbency: role
        }, {
          expiresIn: '2d',
          keyid: tokenid
        })
      }
    })
    .decorate('paginate', function (collect, page, range) {
      collect['pageCount'] = Math.ceil(collect.total / range);
      collect['range'] = range;
      collect['page'] = page + 1;
      return collect
    })
    .decorate('validation', function(data,rules,message){
      const {Validate} = require('../service/Validator')
      const validate = new Validate(data,rules,message)
      if(validate.fails()){
        fastify.responseError({
          code:403,
          values: validate.errors(),
          message: "Terdapat Isian Yang Tidak Valid!!"
        })
      }
    })
    .decorate('sendEmail', async function (recipient, message, subject = "Bimbingan Belajar Notifikasi") {
      try {
        let adminAccount = {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS
        };


        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          service: "gmail",
          port: 465,
          secure: true,
          auth: {
            user: adminAccount.user,
            pass: adminAccount.pass
          }
        });

        let info = await transporter.sendMail({
          from: "Admin Bimbingan Belajar 👥 <foo@blurdybloop.com>",
          to: recipient,
          subject: subject,
          html: message
        });
        nodemailer.getTestMessageUrl("email info", info);
      } catch (err) {
        console.log("email error", err);
      }
    })
    .decorate('verifikasi', async function(length){
      let result           = '';
      let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    })
  next()
})