const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/db')();
require('./startup/config')(app);
require('./startup/logging');
require('./startup/middlware')(app);
require('./startup/routes')(app);
require('./startup/views')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port} !`));