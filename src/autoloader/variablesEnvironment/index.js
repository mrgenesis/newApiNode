const path = require("path")
  , configFile = path.resolve(__dirname, '..', '..', 'config')
  , setLocalVariables = require("./setLocalVariables")
  , { localhostFolderPath } = require(configFile);

module.exports = async (processEnvNODE_ENV) => {
  if (processEnvNODE_ENV === 'production') {
    return;
  }

  return setLocalVariables({ localhostFolderPath });
}