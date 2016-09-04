const db = require('./datastore');

let get = (token, callback) => {
    db.users.find({token}, (err, data) => {
        callback(data[0]);
    });
};

module.exports = {get};

