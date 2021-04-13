const fs = require('fs')
  , { join } = require('path');

/**
 * Faz uma busca por todos diretórios presentes no caminho desejado.
 * @param {String} folderPath - o caminho completo da pasta que será lida
 * @returns {Object} - o objeto com os dados do direório informado
 */
function getFoldersList(folderPath) {
  const foldersLst = {}
    , searchDir = fs.readdirSync(folderPath, { withFileTypes: true })
    , getOnlyFolders = searchDir.filter(dirent => dirent.isDirectory())
  foldersLst.names = [];
  foldersLst.paths = [];
  getOnlyFolders.forEach(oDir => {
    foldersLst.names.push(oDir.name)
    foldersLst.paths.push(join(folderPath, oDir.name))
  });
  return foldersLst;
}

module.exports = getFoldersList;