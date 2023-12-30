const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userRepository = require("../../repository/userRepository");
const passport = require("passport");

passport.serializeUser((user, done) => {
    console.log("user가 어떤지 보자", user);
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try{
        const user = await userRepository.findUser_id(id);
        done(null, user);
    } catch(error) {
        console.log(error);
    }
});

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
} = process.env;

const googleStrategy = passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/login/google/callback",
    scope: ["email","profile"]
    }, async function(accessToken, refreshToken, profile, done) {
        try{
            const existingUser = await userRepository.findUser_email(profile.emails[0].value);
            console.log("existingUser를 알아보자", existingUser);
            if (existingUser) {
                done(null, existingUser);
            } else {
                const newUser = await userRepository.insertOauthUser(profile);
                done(null, newUser);
            }
        } catch (err) {
            console.error(err);
        }
    }));

passport.use("google", googleStrategy);
