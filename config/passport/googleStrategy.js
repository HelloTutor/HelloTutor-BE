const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userRepository = require("../../repository/userRepository");
const tuteeRepository = require("../../repository/tuteeRepository");
const passport = require("passport");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.serializeUser((user, done) => {
    console.log("user오고있니?",user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("id오고있니?", id);
    try{
        const user = await userRepository.findUserId(id);
        done(null, user);
    } catch(error) {
        console.log(error);
    }
});

const google = new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/login/google/callback",
    scope: ["email","profile"]
    }, async function(accessToken, refreshToken, profile, done) {
        try{
            const existingUser = await userRepository.findUserEmail(profile.emails[0].value);

            if (existingUser) {
                const tutee = await tuteeRepository.findTuteeId(existingUser.id);

                if (!tutee.google_id) {
                    return done(null, false, { message: "소셜회원이 아닙니다." });
                }

                return done(null, existingUser);
            } else {
                await tuteeRepository.insertOauthTutee(profile);
                const newUser = await userRepository.findUserEmail(profile.emails[0].value);

                return done(null, newUser);
            }
        } catch (err) {
            console.error(err);
            return done(err);
        }
    });

passport.use("google", google);
