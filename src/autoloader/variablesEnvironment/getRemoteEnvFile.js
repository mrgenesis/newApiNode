const https = require('https');

module.exports = (optionsGetRemoteFile) => {
  return new Promise((resolve, reject) => {
    https.request(optionsGetRemoteFile, res => {
      res.on('data', data => {
        resolve(data);
      });
    })
      .on('error', error => {
        reject(error);
      })
      .end();
  });
}

