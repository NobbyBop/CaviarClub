import loginRoutes from "./auth/login.js";
import signupRoutes from "./auth/signup.js";
import logoutRoutes from "./auth/logout.js";

import createDishRoutes from "./create/dish.js";
import createRestaurantRoutes from "./create/restaurant.js";
import createReviewRoutes from "./create/review.js";

import viewRestaurantRoutes from "./view/restaurant.js";
import viewReviewRoutes from "./view/review.js";
import viewUserRoutes from "./view/user.js";
import viewDishRoutes from "./view/dish.js";

import editRestaurantRoutes from "./edit/restaurant.js";
import editReviewRoutes from "./edit/review.js";
import editDishRoutes from "./edit/dish.js";

import homeRoutes from "./home.js";

export default (app) => {
	app.use("/home", homeRoutes);
	app.use("/view/restaurant", viewRestaurantRoutes);
	app.use("/view/review", viewReviewRoutes);
	app.use("/view/user", viewUserRoutes);
	app.use("/view/dish", viewDishRoutes);
	app.use("/create/dish", createDishRoutes);
	app.use("/create/restaurant", createRestaurantRoutes);
	app.use("/create/review", createReviewRoutes);
	app.use("/edit/restaurant", editRestaurantRoutes);
	app.use("/edit/review", editReviewRoutes);
	app.use("/edit/dish", editDishRoutes);
	app.use("/auth/login", loginRoutes);
	app.use("/auth/signup", signupRoutes);
	app.use("/auth/logout", logoutRoutes);

	app.use("*", (req, res) => {
		return res.status(404).send("not found");
	});
};
