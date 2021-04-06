/**
 * Módulo de emissão de erros
 * @module utils/AppError
 */

const crypto = require('crypto')
  , { debuglog } = require('util');

/**
 * Constroi um novo objeto de erro
 * @constructor
 * @param {String} message - A mensagen do erro customizada
 * @param {Number} status - O status code do protocolo http
 */
function AppError(message = 'Erro interno da aplicação', status = 500) {
  this.name = this.constructor.name;
  this.message = message;
  this.status = status;
  this.errorId = crypto.randomBytes(32).toString('hex');
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  }
}

AppError.prototype = Object.create(Error.prototype);

// TODO: adicionar o email em config e colocar como padrão para emailSupport
AppError.prototype.response = function response(emailSupport) {
  const objResponse = {
    name: this.name,
    message: this.message,
    status: this.status,
    errorId: this.errorId,
    emailSupport: emailSupport
  };
  startLog(objResponse)
  return objResponse;
};

AppError.prototype.starting = function starting() {
  const startLog = debuglog(this.message)
    , startError = {
      name: this.name,
      message: this.message,
      stack: this.stack
    };
  startLog(this.message);
  return startError;
};

AppError.prototype.remedy = function remedy() {
  console.log('remedy: Não implementado');
  process.exit(0);
}

module.exports = AppError;