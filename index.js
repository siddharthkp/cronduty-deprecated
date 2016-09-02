const register = require('./src/register');
const ping = require('./src/ping');
const get = require('./src/get');

const express = require('express');
const app = express();

const port = process.env.PORT || 8080;
app.listen(port);

app.get('/start/:id', ping.start);
app.get('/done/:id', ping.done);
app.get('/get/:id', get);
app.post('/register', register);

