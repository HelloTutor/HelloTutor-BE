const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userRepository = require("../../repository/userRepository");

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
} = process.env;

let googleLogin = new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/login/google/callback",
    scope: ["profile", "email"]
    },
    function(accessToken, refreshToken, profile, done) {
        console.log("google profile을 알아보자", profile);
        try{
            const existingUser = userRepository.findUser_email(profile.email); //user table에서 email을 확인, tutee 확인, tutee였어도//일반가입자인지 google 가입자인지 확인

            if (existingUser) {
                return done(null, existingUser);
            } else {
                const newUser = User.create({
                    email: profile.emails[0].value,
                    nickname: profile.displayName,
                    google_Id: profile.id
                });
                done(null, newUser);
            }
        } catch (err) {
            console.error(err);
        }
    });

module.exports = googleLogin;