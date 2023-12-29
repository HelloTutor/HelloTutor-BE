const passport = require("passport");
const googleLogin = require("./googleStrategy");

passport.serializeUser((user, done) => {
    done(null, user.id);
})

// client => session => request
passport.deserializeUser((id, done) => {
    User.findByPk(id)
        .then(user => {
            done(null, user);
        })
});

passport.use("google", googleLogin);

module.exports = passport;