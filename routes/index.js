import loginRoutes from "./auth/login.js";
import signupRoutes from "./auth/signup.js";

import createDishRoutes from "./create/dish.js";
import createRestaurantRoutes from "./create/restaurant.js";
import createReviewRoutes from "./create/review.js";
import createUserRoutes from "./create/user.js";

import viewRestaurantRoutes from "./view/restaurant.js";
import viewReviewRoutes from "./view/review.js";
import viewUserRoutes from "./view/user.js";

import homeRoutes from "./home.js";

export default (app) => {
	app.use("/home", homeRoutes);
	app.use("/view/restaurant", viewRestaurantRoutes);
	app.use("/view/review", viewReviewRoutes);
	app.use("/view/user", viewUserRoutes);
	app.use("/create/dish", createDishRoutes);
	app.use("/create/restaurant", createRestaurantRoutes);
	app.use("/create/review", createReviewRoutes);
	app.use("/create/user", createUserRoutes);
	app.use("/auth/login", loginRoutes);
	app.use("/auth/signup", signupRoutes);

	app.use("*", (req, res) => {
		return res.status(404).send("not found");
	});
};
