const fs = require('fs');

/**
 * Faz uma busca por todos diretórios presentes no caminho desejado.
 * @param {String} folderPath - o caminho completo da pasta que será lida
 * @returns {Array} - a lista dos nomes das pastas do diretório informado
 */
function getFoldersNameList(folderPath) {
  let foldersLst = fs.readdirSync(folderPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(oDir => oDir.name);
  return foldersLst;
}

module.exports = getFoldersNameList;