const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const app = express();
const courses = require('./routes/courses');
const genres = require('./routes/genres');
const home = require('./routes/home');
app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(logger);
app.use(express.static('public'));
app.use(helmet());

debug('Application Name : ' + config.get('name'));
debug('Mail Server : ' + config.get('mail.host'));
debug('Mail Password : ' + config.get('mail.password'));
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan Enabled...');
}

app.use('/api/courses',courses);
app.use('/api/genres',genres);
app.use('/',home);

const port = process.env.PORT || 3000
app.listen(port,() => console.log(`Listening on Port ${port}... `));
