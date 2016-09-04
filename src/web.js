require('dotenv').config();
const client_id = process.env.github_id;

const db = require('./datastore');
const users = require('./users');
const prettycron = require('prettycron');
const moment = require('moment');

let login = (req, res) => {
    res.render('login', {client_id});
};

let getPings = (id, callback) => {
    db.pings.find({id})
    .sort({start_time: -1})
    .limit(50)
    .exec((err, rows) => {
        callback(rows);
    });
};

let getCrons = (token, callback) => {
    users.get(token, (user) => {
        let username = user.username;
        db.crons.find({username}, (err, data) => {
            callback(data);
        });
    });
};

let dashboard = (req, res) => {
    let token = req.cookies.token;
    if (!token) {
        res.redirect('/login');
        return;
    }
    users.get(token, (user) => {
        getCrons(token, (crons) => {
            if (!crons.length) res.render('dashboard', {user, crons});
            for (let i = 0; i < crons.length; i++) {
                let cron = crons[i];
                cron.time = prettycron.toString(cron.time);
                getPings(cron.id, (pings) => {
                    let lastPing = pings[0];
                    if (lastPing) {
                        cron.last_ping = moment(lastPing.end_time).calendar();
                        cron.duration = moment(lastPing.end_time).diff(moment(lastPing.start_time), 'seconds', true) + ' s';
                    } else {
                        cron.last_ping = 'never';
                        cron.duration = '-';
                    }

                    cron.durations = [];
                    for (let ping of pings) {
                        let duration = moment(ping.end_time).diff(moment(ping.start_time), 'seconds', true);
                        cron.durations.push(duration);
                    }

                    if (i === crons.length - 1) {
                        res.render('dashboard', {user, crons});
                        return;
                    }
                });
            }
        });
    });
};

module.exports = {login, dashboard};
