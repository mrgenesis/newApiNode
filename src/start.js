/**
 * O objetivo deste arquivo é iniciar o aplicativo. Ele é chamado pelo arquivo
 * index.js na root do projeto. E deve ser chamado diretamente quando estiver
 * executando testes. @see https://www.npmjs.com/package/supertest
 * @author Rosa, Genesis @see https://linkedin.com/in/mrgenesis
 */
const start = require('./autoloader')
  , starting = start();


// Retorna uma promise que resolve um objeto com o app e port "{ app, port }"
// starting.then({app, port} => app.listen(port))
module.exports = starting;
