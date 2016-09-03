const datastore = require('nedb');
const db = {};
db.crons = new datastore({filename: './db/crons.db', autoload: true});
db.pings = new datastore({filename: './db/pings.db', autoload: true});

module.exports = db;
