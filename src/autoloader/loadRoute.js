const
  { join } = require('path')
  , { existsSync } = require('fs')
  , getFoldersNameList = require(
    join(__dirname, '..', 'utils', 'getFoldersNameList'));

function loadRoute({ router, routeFolder, StartAppError = Error }) {
  try {
    if (!existsSync(routeFolder)) {
      throw new StartAppError(`O diretório "${routeFolder}" não existe.`);
    }
    getFoldersNameList(routeFolder)
      .map(folder =>
        require(join(routeFolder, folder))(router));

    return router;

  } catch (err) {

    typeof err.starting === 'function' ? console.error(err.starting()) : '';
    console.error('As rotas não foram adicionadas. Diretório: ' + routeFolder);

  }
}
module.exports = loadRoute;
