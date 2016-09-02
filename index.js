require('dotenv').config();

const ping = require('./ping');
const get = require('./get');

const express = require('express');
const app = express();

app.listen();

app.get('/start/:id', ping.start);
app.get('/done/:id', ping.done);
app.get('/get/:id', get);

