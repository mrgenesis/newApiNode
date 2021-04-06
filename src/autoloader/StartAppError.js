const { join } = require('path')
  , AppError = require(join(__dirname, '..', 'utils', 'AppError'));

function StartAppError(message, status) {
  AppError.call(this, message, status);
}

StartAppError.prototype = Object.create(AppError.prototype);
StartAppError.prototype.constructor = StartAppError;

module.exports = StartAppError;