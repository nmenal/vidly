const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const winston = require('winston');

module.exports = function (app) {
    /*
    middleware functions
    */

    //builtin-middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); // key=value&key=value
    app.use(express.static('public')); //serve static content

    //third party middleware
    app.use(helmet());
    if (app.get('env') === 'development') {
        winston.info('morgan enabled');
        app.use(morgan('tiny')); //in certain situations like devloppement turn this on to log
    }
}