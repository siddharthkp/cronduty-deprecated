require('dotenv').config();

const ping = require('./ping');
const get = require('./get');

const express = require('express');
const app = express();
const port = process.env.port;

app.listen(port);

app.get('/start/:id', ping.start);
app.get('/done/:id', ping.done);
app.get('/get/:id', get);
