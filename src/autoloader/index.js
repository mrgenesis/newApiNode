/**
 * O objetivo deste arquivo é iniciar os recursos na sequencia correta.
 * O resultado será a exposição do app configurado com todos os recursos necessários diponíveis
 */
const
  path = require('path')
  , fs = require('fs')
  , https = require('https')
  , variablesEnvironment = require(path.resolve(__dirname, 'variablesEnvironment'))

module.exports = async () => {

  // Este é um recurso que prove uma maneira de disponibilizar variáveis de ambiente localmente.
  // Se o valor definido em `process.env.NODE_ENV` for DIFERENTE de 
  // `production`, o aplicativo entenderá que as variáveis de ambiente precisam
  // ser definidas em modo `development`. E se for preciso, baixará um arquivo
  // `.env` à pasta padrão em path/to/PROJECT/localhost/.env
  await variablesEnvironment(process.env.NODE_ENV);
  process.exit(0);


  if (process.env.NODE_ENV === 'production') {
    console.log(` --> [autoloader]: O ambiente está definido como "production". As variáveis devem ser definidas na camada da hospedagem.`);
  } else {
    if (!await setLocalVariables(devEnvVarPath, getRemoteFile)) {
      console.log('Falha na definição das variáveis de ambiente.');
    }
  }

  // Obtem a bibliotéca que lida com as requisições http com os recursos adicionais carreagados.
  const app = require(path.join(__dirname, 'HTTPServer'));

  //let t = fs.readdirSync(__dirname);
  //t = t.filter(f => f[0] !== '.' && path.extname(f) === '.js' && f !== 'index.js')
  const router = require('./router');

  app.use(router);


  return app;
};