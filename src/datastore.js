const datastore = require('nedb');
const db = {};
db.crons = new datastore({filename: './db/crons.db', autoload: true});
db.pings = new datastore({filename: './db/pings.db', autoload: true});
db.users = new datastore({filename: './db/users.db', autoload: true});

let minute = 60 * 1000;
db.pings.persistence.setAutocompactionInterval(minute);

module.exports = db;
