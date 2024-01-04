const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userRepository = require("../../repository/userRepository");
const tuteeRepository = require("../../repository/tuteeRepository");
const passport = require("passport");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await userRepository.findUser_id(id);
    done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
});

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const google = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/login/google/callback",
    scope: ["email", "profile"],
  },
  async function (accessToken, refreshToken, profile, done) {
    try {
      const existingUser = await userRepository.findUser_email(
        profile.emails[0].value
      );

      if (existingUser) {
        const tutee = await tuteeRepository.findTuteeId(existingUser.id);

        if (!tutee.google_id) {
          return done(null, false, { message: "소셜회원이 아닙니다." });
        }
        return done(null, existingUser);
      } else {
        await tuteeRepository.insertOauthTutee(profile);
        const newUser = await userRepository.findUser_email(
          profile.emails[0].value
        );

        return done(null, newUser);
      }
    } catch (err) {
      console.error(err);
      return done(err);
    }
  }
);

passport.use("google", google);
