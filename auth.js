const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const GoogleStrategy =
	require("passport-google-oauth2").Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.CALLBACK_URL,
			passReqToCallback: true
		},
		(request, accessToken, refreshToken, profile, done) => {
			return done(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
