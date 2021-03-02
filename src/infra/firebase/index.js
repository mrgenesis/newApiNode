const
  isProduction = process.env.NODE_ENV === 'production'
  , fs = require('fs')
  , path = require('path')
  , admin = require("firebase-admin")
  , DATABASE_URL = process.env.DATABASE_URL
  , githubApi = require(path.resolve('src', 'helpers', 'githubApi'))
  , GH_BASE_URL = process.env.GH_BASE_URL
  , GH_OWN = process.env.GH_OWN
  , pathFileRepo = '/db/firebase/db-test.json'
  , urlGithubFile = `${GH_BASE_URL}/repos/${GH_OWN}/secrets/contents/${pathFileRepo}`
  , firebaseCredentialsPath = (isProduction)
    ? path.resolve(__dirname, 'firebaseCredentials.json')
    : path.resolve('localhost', 'firebaseCredentials.json');

async function firebase() {
  if (!fs.existsSync(firebaseCredentialsPath)) {
    try {
      const response = await githubApi.get(urlGithubFile);
      fs.writeFileSync(firebaseCredentialsPath, Buffer.from(response.data.content, 'base64').toString());
    }
    catch (err) {
      console.log(err)
    }

  }
  admin.initializeApp({
    credential: admin.credential.cert(require(firebaseCredentialsPath)),
    databaseURL: DATABASE_URL
  });
  return admin;
}

module.exports = {
  firebase
};