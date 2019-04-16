const config = require('config');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose =require('mongoose');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const logger = require('./middleware/logger');
const authentication = require('./middleware/auth');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const users = require('./routes/users');
const auth = require('./routes/auth');
const home = require('./routes/home');

const app = express();

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(()=>console.log(' Connected to Vidly DB ..'))
    .catch(()=>console.log(' Cannot connecte to Vidly DB ..'));

startupDebugger(app.get('env'));

//setting templating config and engin
app.set('view engine','pug');// sets the default view engine
app.set('views','./views');

/*
middleware funcitons
*/

//builtin-middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); // key=value&key=value
app.use(express.static('public')); //serve static content

//third party middleware
app.use(helmet()); 
if(app.get('env') ==='development'){
    startupDebugger('morgan enabled');   
    app.use(morgan('tiny')); //in certain situations like devloppement turn this on to log
}

//costum middlware
app.use(logger);
// app.use(auth);

//Routes
app.use('/api/genres',genres);
app.use('/api/movies',movies);
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/',home);

//Configuration
startupDebugger('Application Name: ' + config.get('name'));
startupDebugger('Mail Server Name: ' + config.get('mail.host'));
// startupDebugger('Mail Password: ' + config.get('mail.password'))
 
//db debug
dbDebugger('db');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening on port 3000 !'));