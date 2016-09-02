const datastore = require('nedb');
const db = {};
db.crons = new datastore({filename: 'crons.db', autoload: true});

module.exports = db;
