/**
 * O objetivo deste arquivo é iniciar os recursos na sequencia correta. O
 * resultado será a exposição do app configurado com todos os recursos 
 * necessários diponíveis
 * @author Rosa, Genesis @see https://linkedin.com/in/mrgenesis
 */
const
  { join } = require('path')
  , variablesEnvironment = require(join(__dirname, 'variablesEnvironment'))

module.exports = async () => {

  // Este é um recurso que prove uma maneira de disponibilizar variáveis de 
  // ambiente localmente. Se o valor definido em `process.env.NODE_ENV` for 
  // DIFERENTE de `production`, as variáveis de ambiente serão definidas em modo
  // `development`. E se for preciso, baixará um arquivo `.env` da internet à 
  // pasta padrão em path/to/PROJECT/localhost/.env.
  await variablesEnvironment(process.env.NODE_ENV);


  // Configura e obtem a biblioteca que lida com as requisições http.
  const { app, router } = require(join(__dirname, 'HTTPServer'));


  // Carrega os arquivos de configuração das rotas
  require(join(__dirname, '..', 'route'))(router);


  // Adiciona as rotas ao aplicativo
  app.use(router);

  return { app, port: process.env.PORT || 3000 };
};
