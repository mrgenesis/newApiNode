/**
 * O objetivo deste arquivo é iniciar os recursos na sequencia correta. O
 * resultado será a exposição do app configurado com todos os recursos 
 * necessários diponíveis
 * @author Rosa, Genesis @see https://linkedin.com/in/mrgenesis
 */
const
  { join } = require('path')
  , variablesEnvironment = require(join(__dirname, 'variablesEnvironment'))
  , StartAppError = require(join(__dirname, 'StartAppError'))
  , routesLoader = require(join(__dirname, 'router'));

module.exports = async () => {

  // Este é um recurso que prove uma maneira de disponibilizar variáveis de 
  // ambiente localmente. Se o valor definido em `process.env.NODE_ENV` for 
  // DIFERENTE de `production`, as variáveis de ambiente serão definidas em modo
  // `development`. E se for preciso, baixará um arquivo `.env` da internet à 
  // pasta padrão em path/to/PROJECT/localhost/.env.
  await variablesEnvironment(process.env.NODE_ENV);


  // Configura e obtem a biblioteca que cria o app
  const app = require(join(__dirname, 'HTTPServer'));


  // Carrega as rotas do sistema
  routesLoader({ app, Err: StartAppError });

  return { app, port: process.env.PORT || 3000 };
};
