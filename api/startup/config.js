const dbDebugger = require('debug')('app:db');
const startupDebugger = require('debug')('app:startup');
const config = require('config');

module.exports = function (app) {

    if (!config.get('jwtPrivateKey')) {
        startupDebugger('FATAL ERROR: jwtPrivateKey is not defined.');
        process.exit(1);
    }

    startupDebugger(app.get('env'));

    //Configuration
    startupDebugger('Application Name: ' + config.get('name'));
    startupDebugger('Mail Server Name: ' + config.get('mail.host'));
    // startupDebugger('Mail Password: ' + config.get('mail.password'))

    //db debug
    dbDebugger('db');
}