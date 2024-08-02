// const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// const passport = require("passport");
import passport from "passport";

passport.use(
	new GoogleStrategy(
		{
			clientID:"1016756545794-j7evvv0t87gm452f7efk02ngok5l4qp1.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "auth/google/callback",
			passReqToCallback:true,
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});


export default passport