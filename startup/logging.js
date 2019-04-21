const winston = require('winston');

module.exports = function () {

    process.on('uncaughtException', (ex) => {
        winston.error(ex.message, ex);
        process.exit(1);
    });

    winston.handleExceptions(
        new winston.transports.File({ filename: 'uncaughtException.log' })
    );

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    winston.add(winston.transports.File, { filename: 'logfile.log' });
    // winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly' });
}