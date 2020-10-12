const fs = require('fs');
const path = require('path');
const util = require('util');
const chalk = require('chalk');
const { exec, execSync } = require("child_process");

const execPromise = util.promisify(exec);

const checkHostsFile = (host) => {
  const cmd = `grep ${host} /etc/hosts`;
  let hasHost = true;

  try {
    const result = execSync(cmd).toString();
    if (!result) throw new Error('Required');
  } catch (err) {
    hasHost = false;
    console.log(chalk.red(`Missing ${host} in '/etc/hosts'`));
  }

  return hasHost;
};

const checkSSLCert = () => {
  let credentials;
  let hasSSLCert = true;
  const sslKey = 'server.key';
  const sslCert = 'server.crt';
  const certPath = '../../certs';

  try {
    credentials = {
      key: fs.readFileSync(path.resolve(__dirname, certPath, sslKey), 'utf8'),
      cert: fs.readFileSync(path.resolve(__dirname, certPath, sslCert), 'utf8'),
    };
  } catch (err) {
    hasSSLCert = false;
    console.log(chalk.yellow(`\nNO SSL Credentials Found...`));
  }

  return {
    hasSSLCert,
    credentials,
  };
};

module.exports = {
  execPromise,
  checkHostsFile,
  checkSSLCert,
};
