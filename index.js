//Este quivo é o ponto de partida do aplicativo. Ele deve ser executado tanto em
// ambiente de desenvolvimento quanto em ambiente de produção. Antes da exucução
// do programa, é necessário definir as variáveis de ambiente para o correto
// funcionamento do aplicativo.
const starting = require('./src/start');

starting.then(started => {
  started.app.listen(started.port, () =>
    console.log('>>> Running at port ' + started.port + '...'));
});
