const crypto = require("crypto")
const fs = require("fs")
const path = require("path")
const setLocalVariables = require("../../../src/autoloader/variablesEnvironment/setLocalVariables");

describe('Start: localhost', () => {
  it('Deve criar um arquivo .env padrão caso ele não exista na pasta indicada.', async (done) => {
    const setData = {
      localhostFolderPath: __dirname + path.sep + crypto.randomBytes(4).toString('hex'),
      optionsGetRemoteFile: {
        hostname: 'gist.githubusercontent.com',
        port: 443,
        path: '/mrgenesis/22547b2e497e7f4c6cfa16923f6dfcfb/raw/.env.exemple',
        method: 'GET'
      }
    };
    await setLocalVariables(setData);
    expect(process.env.TESTING).toBe('setLocalVariablesFunction');
    fs.rmSync(setData.localhostFolderPath, { recursive: true });
    done();
  });

});