/**
 * Módulo de geração de número aleatório
 * @module utils/randomNumber
 */


/**
 * Gera um número aleatório de acordo com alcance definido
 * @param {Number} end Número máximo do alcance
 * @param {Number} start Número mínimo do alcance
 * @returns {Number} um número entre o alcance definido
 * @example randomNumber(20, 11); // return "entre 11 a 20"
 */
function randomNumberInteger(end = 10, start = 1) {
  return (Math.floor(Math.random() * (end - start + 1)) + end);
}

module.exports = randomNumberInteger;
