if (!process.env.production) require('dotenv').config();
const github = require('./github');
const db = require('./datastore');

let auth = (req, res) => {
    let code = req.query.code;
    github.token(code, (token) => {
        let week = 7 * 24 * 60 * 60 * 1000; //milliseconds
        res.cookie('token', token, {maxAge: week});
        github.user(token, (user) => {
            user = JSON.parse(user);
            let github_id = user.id;
            let username = user.login;
            db.users.insert({github_id, username, token}, () => {
                res.redirect('/dashboard');
            });
        });
    });
};

module.exports = auth;
