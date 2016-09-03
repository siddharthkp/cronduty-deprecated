const db = require('./datastore');

let get = (req, res) => {
    let id = req.params.id;
    db.pings.find({id}, (err, data) => {
        res.end(JSON.stringify({data}));
    });
};

let register = (req, res) => {
    let id = Math.random().toString(36).slice(2, 6);
    db.crons.insert({id}, () => {
        res.end(JSON.stringify({id}));
    });
};

module.exports = {get, register};
