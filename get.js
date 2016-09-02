const db = require('./datastore.js');

let get = (req, res) => {
    let id = req.params.id;
    db.crons.find({id}, (err, data) => {
        res.end(JSON.stringify({data}));
    });
};

module.exports = get;
