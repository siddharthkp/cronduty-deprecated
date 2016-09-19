const ping = require('./src/ping');
const web = require('./src/web');
const auth = require('./src/auth');
const cron = require('./src/cron');
const status = require('./src/status');

const express = require('express');
const app = express();

const pug = require('pug');
app.set('view engine', 'pug');
app.use(express.static('static', {maxAge: 86400000}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const compression = require('compression');
app.use(compression());

const port = process.env.PORT || 8080;
app.listen(port);

app.get('/start/:id', ping.start);
app.get('/done/:id', ping.done);

app.get('/login', web.login);
app.get('/auth', auth);

app.get('/dashboard', web.dashboard);
app.get('/', web.dashboard);

app.post('/cron', cron.save);

app.get('/status', status);
