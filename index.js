const express = require("express");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const auth = require("./auth");

function isLoggedIn(req, res, next) {
	req.user ? next() : res.sendStatus(401);
}

const app = express();
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
	res.send("<a href='/auth/google'>Login with Google</a>");
});

app.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"]
	})
);

app.get("/protected", isLoggedIn, (req, res) => {
	res.send(
		`Hello, ${req.user.displayName} <a href='/logout'>Logout</a>`
	);
});

app.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "/protected",
		failureRedirect: "/auth/failure"
	})
);

app.get("/auth/failure", (req, res) => {
	res.send("Something went wrong");
});

app.get("/logout", (req, res) => {
	req.logout(err => {
		if (err) {
			return res.send("Error logging out");
		}
		req.session.destroy();
		res.send("Logged out");
	});
});

app.listen(8080, () => {
	console.log("Server is running on port 8080");
});
