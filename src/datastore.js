const datastore = require('nedb');
const db = {};
db.crons = new datastore({filename: './data/crons.db', autoload: true});
db.pings = new datastore({filename: './data/pings.db', autoload: true});

module.exports = db;
