const ping = require('./src/ping');
const web = require('./src/web');

const express = require('express');
const app = express();

const port = process.env.PORT || 8080;
app.listen(port);

app.get('/start/:id', ping.start);
app.get('/done/:id', ping.done);
app.get('/get/:id', web.get);
app.post('/register', web.register);

