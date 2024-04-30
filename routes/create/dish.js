import { Router } from "express";
import { searchDishesFromName } from "../../data/dish/searchDishesFromName.js";
import { checkString } from "../../helpers.js";
import { createDish } from "../../data/dish/createDish.js";
import url from "url";
const router = Router();

router
	.route("/")
	.get(async (req, res) => {
		let username, userId;
		if (req.session && req.session.user) {
			username = req.session.user.username;
			userId = req.session.user.userId;
		}

		if (
			(!req.session.restaurantId || req.session.restaurantId.length == 0) &&
			!req.query.restaurantId
		) {
			return res.status(500).render("error", {
				message: "no restaurantId provided!",
				username,
				userId,
			});
		}

		if (req.query.restaurantId)
			req.session.restaurantId = req.query.restaurantId;

		return res.render("create/dish", { username, userId });
	})
	.post(async (req, res) => {
		let username, userId;
		if (req.session && req.session.user) {
			username = req.session.user.username;
			userId = req.session.user.userId;
		}
		if (!req.body.dishName) {
			return res.json({
				search: false,
				message: "form failed to send dishName!",
			});
		}

		if (!req.session.restaurantId || req.session.restaurantId.length == 0) {
			return res.status(500).render("error", {
				message: "no restaurantId provided!",
				username,
				userId,
			});
		}

		let restaurantId = req.session.restaurantId;
		let dishName = req.body.dishName;

		let searchResults;
		try {
			searchResults = await searchDishesFromName(dishName, restaurantId);
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

		if (!req.session.restaurantId || req.session.restaurantId.length == 0) {
			return res.status(500).render("error", {
				message: "no restaurantId provided!",
				username,
				userId,
			});
		}

		return res.render("create/newDish", {
			username,
			userId,
		});
	})
	.post(async (req, res) => {
		let username, userId;
		if (req.session && req.session.user) {
			username = req.session.user.username;
			userId = req.session.user.userId;
		}

		if (!req.session.restaurantId || req.session.restaurantId.length == 0) {
			return res.status(500).render("error", {
				message: "no restaurantId provided!",
				username,
				userId,
			});
		}

		let name, dish, restaurantId;
		try {
			name = checkString(req.body.name);
			restaurantId = checkString(req.session.restaurantId);
			dish = await createDish(name, restaurantId);
		} catch ({ message }) {
			return res.render("error", { message, username, userId });
		}

		req.session.dishId = dish._id.toString();
		return res.redirect("/create/review/");
	});

export default router;
