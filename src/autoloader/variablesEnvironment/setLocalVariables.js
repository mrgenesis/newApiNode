const path = require('path')
  , fs = require('fs')
  , getRemoteEnvFile = require(__dirname + path.sep + 'getRemoteEnvFile')
  , options = {
    hostname: 'gist.githubusercontent.com',
    port: 443,
    path: '/mrgenesis/22547b2e497e7f4c6cfa16923f6dfcfb/raw/.env.exemple',
    method: 'GET'
  };

module.exports = async ({ localhostFolderPath, fileName = '.env', optionsGetRemoteFile = options }) => {
  const variablesFile = localhostFolderPath + path.sep + fileName;
  if (!fs.existsSync(localhostFolderPath)) {
    fs.mkdirSync(localhostFolderPath);
  }

  if (!fs.existsSync(variablesFile)) {
    let data = Buffer.from((await getRemoteEnvFile(optionsGetRemoteFile)), 'ascii').toString();
    data = data.replace('<development or production>', 'development');
    fs.writeFileSync(variablesFile, data);
  }
  require('dotenv').config({ path: variablesFile });
}