const
  { join } = require('path')
  , router = require('express').Router()
  , { existsSync } = require('fs')
  , getFoldersList = require(
    join(__dirname, '..', 'utils', 'getFoldersList'))
  , { externalRouteFolder } = require(join(__dirname, '..', 'config'))
  , defaultRoutesSystem = join(__dirname, '..', 'route')
  , foldersRoutesList = [];

foldersRoutesList.push(defaultRoutesSystem);
(externalRouteFolder)
  ? foldersRoutesList.push(externalRouteFolder) : 'do nothing';

function routeLoader(app, routeFolder, Err = Error) {
  let foldersList = [], route;
  try {
    if (!existsSync(routeFolder)) {
      throw new Err(`O diretório "${routeFolder}" não existe.`);
    }
    foldersList = getFoldersList(routeFolder);
    foldersList.paths.forEach(path => {
      if (!existsSync(path)) {
        throw new Err(`O diretório "${path}" não existe...`);
      }
      route = require(path);
      if (typeof route !== 'function') {
        throw new Err(`O diretório "${path}" não existe.`);
      }
      // Esta é a função exportada das pastas src/route/*
      route(app, router);

    })
  }
  catch (err) {
    console.error(err);
    typeof err.starting === 'function' ? console.error(err.starting()) : '';
    console.error('As rotas não foram adicionadas. Diretório: ' + routeFolder);
  }
}

module.exports = function router({ app, Err = Error }) {
  foldersRoutesList.forEach(folder => routeLoader(app, folder, Err));
};
