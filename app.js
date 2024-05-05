import express from "express";
const app = express();
import configRoutes from "./routes/index.js";
import exphbs from "express-handlebars";
import session from "express-session";
import bodyParser from "body-parser";

app.use(
	session({
		name: "AuthenticationState",
		secret: "some secret string!",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use("/public", express.static("public"));
app.use("/static", express.static("static"));
app.use("/", (req, res, next) => {
	if (req.path == "/") return res.redirect("/home");
	console.log(
		`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl}`
	);
	next();
});

app.use("/auth", (req, res, next) => {
	if ((req.path == "/login" || req.path == "/signup") && req.session.user)
		return res.redirect("/home");
	if (req.path == "/logout" && (!req.session || !req.session.user))
		return res.redirect("/home");
	next();
});

app.use('/edit', (req, res, next) => {
	if ((req.path == "/restaurant" || req.path == "/review") && (!req.session.user || !req.session.user.admin))
		return res.redirect("/home");
	next();
});

app.use("/create", (req, res, next) => {
	if (!req.session || !req.session.user) return res.redirect("/home");
	if(req.session && req.session.user.reviewLimit >= 50) return res.status(403).render("error", {message:"You have reached your review limit of 50.",
																							username:req.session.user.username 	
	})
	next();
	
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
	if (req.body && req.body._method) {
		req.method = req.body._method;
		delete req.body._method;
	}
	next();
};
app.use(rewriteUnsupportedBrowserMethods);

configRoutes(app);

app.listen(3000, () => {
	console.log("server running on http://localhost:3000");
});
