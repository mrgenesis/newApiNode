const { resolve } = require('path')
  , fs = require('fs')
  , { existsSync } = require('fs')
  , ENVIRONMENT = process.env.NODE_ENV
  , requester = require(resolve('src', 'vendor', 'requester'))(config => config)
  , getPathToEnvVariables = resolve('src', 'config', 'pathToEnvVariables')
  , dotEnvExemple = 'https://gist.githubusercontent.com/mrgenesis/22547b2e497e7f4c6cfa16923f6dfcfb/raw/.env.exemple'
  , { pathToEnvVariables } = require(getPathToEnvVariables);

if (ENVIRONMENT !== 'production') {

  // Em produção, a variável "pathToEnvVariables" deve apontar para "<PROJECT>/localhost/.env".
  // Este caminha será inexistente em produção, porque a pasta 'localhost' é incluída no arquivo .gitignore.
  // Sendo assim, ele não é enviado para o servidor.
  // Neste caso, é necessário que a host forneça recursos para definição de variáveis de ambiente
  //
  if (existsSync(pathToEnvVariables)) {

    // Este 'if' só será executado se "path" deve existir no projeto
    require('dotenv').config({ path: pathToEnvVariables });

  } else {
    requester.get(dotEnvExemple).then(res => {
      const dotenvExemplePath = resolve('localhost', '.env.exemple');

      fs.writeFile(dotenvExemplePath, Buffer.from(res.data, 'ascii').toString(), function (err) {
        if (err) throw err;
        console.log('############## AVISO ##############\nCarregando arquivo no path %s.\nModifique o nome deste arquivo de .env.exemple para .env e edite as propriedades dele.\n-----\n', dotenvExemplePath)
        require('dotenv').config({ path: dotenvExemplePath });
      });
    });
  }
}
