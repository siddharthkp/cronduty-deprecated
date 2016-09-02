const db = require('./datastore');

let register = (req, res) => {
    let id = Math.random().toString(36).slice(2, 6);
    db.crons.insert({id}, () => {
        res.end(JSON.stringify({id}));
    });
};

module.exports = register;
