import { Router } from "express";
import { removeDish } from "../../data/dish/removeDish.js";
import { updateDish } from "../../data/dish/updateDish.js";
import { checkId, checkString } from "../../helpers.js";

const router = Router();

router.route("/").post(async (req, res) => {
	let username, userId, isAdmin;
	if (req.session && req.session.user) {
		username = req.session.user.username;
		userId = req.session.user.userId;
		isAdmin = req.session.user.admin;
	}

	let name, dishId, restaurantId, deleteDish;
	try {
		dishId = checkId(req.body.dishId);
	} catch ({ message }) {
		0;
	}
	try {
		name = checkString(req.body.name);
	} catch ({ message }) {
		0;
	}
	try {
		restaurantId = checkId(req.body.restaurantId);
	} catch ({ message }) {
		0;
	}
	try {
		if (req.body.deleteDish) throw new Error("deleteDish not passed in");
	} catch ({ message }) {
		0;
	}
	deleteDish = req.body.deleteDish == "yes";

	let result;

	try {
		console.log(
			"🚀 ~ file: dish.js:54 ~ router.route ~ name, dishId, restaurantId, deleteDish:",
			name,
			dishId,
			restaurantId,
			deleteDish
		);
		if (deleteDish) {
			result = await removeDish(dishId);
		} else {
			result = await updateDish(dishId, name);
		}
	} catch ({ message }) {
		return res.render("error", { message, username, userId, isAdmin });
	}

	return res.redirect("/view/dish/" + dishId);
});

export default router;
