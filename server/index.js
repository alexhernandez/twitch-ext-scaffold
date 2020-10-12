const express = require('express');
const http = require('http');
const https = require('https');
const chalk = require('chalk');
const config = require('./src/config');
const { checkHostsFile, checkSSLCert } = require('./src/utils');

// SERVER
const app = express();
const { scheme, host, port } = config;
const hasHosts = checkHostsFile(host);
const { hasSSLCert, credentials } = checkSSLCert();
const hasHTTPS = scheme === 'https' && hasSSLCert;

// CONFIGURE HEADERS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  }

  next();
});

// REGISTER STATIC FILES
app.use(express.static('public'));

// APP REGISTER
const server = hasHTTPS ? https.createServer(credentials, app) : http.createServer(app);

// APP LISTEN
server.listen(port, function () {

  if (!hasHosts) {
    console.log(chalk.bold.red('\nSERVER - Requirements Missing 🚫'));
    server.close();
  } else if (hasHTTPS) {
    console.log(chalk.bold('\nSERVER 👋'));
    console.log(chalk.bold.blue(`Listening on https://${host}:${port}\n`));
  } else {
    console.log(chalk.bold('\nSERVER 👋'));
    console.log(chalk.bold.blue(`Listening on http://${host}:${port}\n`));
  }

});
