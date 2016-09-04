const db = require('./datastore');

let start = (req, res) => {
    let id = req.params.id;
    let status = 'STARTED';
    let start_time = new Date().getTime();
    db.pings.insert({id, status, start_time}, () => {
        res.end('start ' + req.params.id);
    });
};

let done = (req, res) => {
    let id = req.params.id;
    db.pings.find({id})
    .sort({start_time: -1})
    .limit(1)
    .exec((err, rows) => {
        if (!rows.length) res.end('end ' + req.params.id);
        let _id = rows[0]._id;
        let status = 'DONE';
        let end_time = new Date().getTime();
        db.pings.update({_id}, {$set: {status, end_time}}, (err, rows) => {
            res.end('end ' + req.params.id);
        });
    });
};

module.exports = {start, done};
