const db = require('./datastore');

let get = (req, res) => {
    let id = req.params.id;
    db.pings.find({id}, (err, data) => {
        res.end(JSON.stringify({data}));
    });
};

module.exports = get;