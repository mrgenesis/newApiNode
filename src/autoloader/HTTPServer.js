/**
 * Este arquivo configura a bibliotéca express antes de torná-la disponível para o aplicativo.
 * Aqui que são adiconados os middlewares que adicionarão mais recursos ao express.
 * @see https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
 * @author Rosa, Genesis @see https://linkedin.com/in/mrgenesis
 * 
 */
const

  express = require('express')

  , app = express();


// permitirá que a aplicação entenda requisições em JSON
app.use(express.json());


// Define um objeto para ficar disponível em toda a aplicação
// http://expressjs.com/pt-br/4x/api.html#app.set
app.set('resources', {});

module.exports = app;
