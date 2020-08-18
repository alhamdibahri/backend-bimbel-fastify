const Validator = require('validatorjs')
Validator.useLang('id')

function Validation(data, rules, message){
    this.validation = new Validator(data,rules,message)
}

Validation.prototype.fails = function(){
    return this.validation.fails()
}

Validation.prototype.errors = function(){
    return this.validation.errors.all()
}

Validation.prototype.errorString = function(){
    return Object.values(this.validation.errors.all).join(" ")
}

Validation.prototype.real = function(){
    return this.validation
}

function Validate(data, rules, message){
    return new Validation(data, rules, message)
}

module.exports = {
    Validate, Validator
}