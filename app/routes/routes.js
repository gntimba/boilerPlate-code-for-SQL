const { use } = require('../../app');
var user = require('../controllers/user');


//you can include all your controllers

module.exports = function (app, passport) {


    app.post('/signup', user.signup);


    app.post('/auth', user.login);

    app.get('/profile', passport.authenticate('jwt', { session: false }), user.users);
    app.get('/logout', passport.authenticate('jwt', { session: false }), user.logout);
    app.put('/profile', passport.authenticate('jwt', { session: false }), user.update);

}
