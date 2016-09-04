const db = require('./datastore');
const users = require('./users');
const parser = require('cron-parser');

let save = (req, res) => {
    let token = req.cookies.token;

    users.get(token, (user) => {
        let username = user.username;

        let name = req.body.name;
        if (!name) {
            res.status(400).end(JSON.stringify({name: 'Give your cron a name'}));
            return;
        }

        let time = req.body.time;
        let valid;

        try {
            parser.parseExpression(time);
            valid = true;
        } catch (err) {
            valid = false;
        }

        if (!time || !valid) {
            res.status(400).end(JSON.stringify({time: 'Invalid time string'}));
            return;
        }

        if (valid) {
            let id = req.params.id || Math.random().toString(36).slice(2, 6);
            let updated_on = new Date().getTime();

            db.crons.update({id}, {id, username, name, time, updated_on}, {upsert: true}, (err) => {
                if (err) res.status(500).send('Something broke!');
                else res.end(JSON.stringify({id, name, time}));
            });
        }
    });

};

module.exports = {save}

