
const defaults = {
    status: true,
    code: 200,
    values: {},
    message: false
};

function responseSuccess(options, reply) {
    defaults.code = 200;
    defaults.status = true;
    defaults.message = false;
    const send = Object.assign(defaults, options);
    if (reply){
        console.log(send.code)
        reply
            .code(send.code)
            .header("Content-Type", "application/json; charset=utf8")
            .send({
                status: send.status,
                code: send.code,
                values: send.values,
                message: send.message,
            });
    }else{
        response(send);
    }
}

function responseError(options) {
    defaults.code = 400;
    defaults.status = false;
    defaults.message = 'Oops! Terjadi Kesalahan';
    const send = Object.assign(defaults, options);
    response(send);
}

function response(send) {
    const err = new Error();
    err.status = send.status;
    err.statusCode = send.code;
    err.values = send.values;
    err.message = send.message;
    throw err;
}

module.exports = {
    responseError, responseSuccess
};