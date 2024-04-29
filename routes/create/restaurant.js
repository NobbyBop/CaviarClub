import { Router } from "express";
import { searchRestaurantsFromName } from "../../data/restaurant/searchRestaurantsFromName.js";
import { createRestaurant } from "../../data/restaurant/createRestaurant.js";
import { checkString } from "../../helpers.js";
const router = Router();

router
	.route("/")
	.get(async (req, res) => {
		let username, userId;
		if (req.session && req.session.user) {
			username = req.session.user.username;
			userId = req.session.user.userId;
		}

		req.session.restaurantId = "";
		req.session.dishId = "";

		return res.render("create/restaurant", { username, userId });
	})
	.post(async (req, res) => {
		if (!req.body?.restaurantName) {
			return res.json({
				search: false,
				message: "form failed to send restaurantName!",
			});
		}

		let restaurantName = req.body.restaurantName;

		let searchResults;
		try {
			searchResults = await searchRestaurantsFromName(restaurantName);
		} catch ({ message }) {
			return res.json({
				search: false,
				message,
			});
		}
		return res.json({
			search: true,
			searchResults,
		});
	});
router
	.route("/new")
	.get(async (req, res) => {
		let username, userId;
		if (req.session && req.session.user) {
			username = req.session.user.username;
			userId = req.session.user.userId;
		}

		return res.render("create/newRestaurant", { username, userId });
	})
	.post(async (req, res) => {
		let username, userId;
		if (req.session && req.session.user) {
			username = req.session.user.username;
			userId = req.session.user.userId;
		}

		let name, address, restaurant;
		try {
			name = checkString(req.body.name);
			address = checkString(req.body.address);
			restaurant = await createRestaurant(name, address);
		} catch ({ message }) {
			return res.render("error", { message, username, userId });
		}

		req.session.restaurantId = restaurant._id.toString();

		return res.redirect("/create/dish/");
	});

export default router;
