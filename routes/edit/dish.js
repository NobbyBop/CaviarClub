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
		//it is fine if these fail
	}
	try {
		name = checkString(req.body.name);
	} catch ({ message }) {
		//it is fine if these fail
	}
	try {
		restaurantId = checkId(req.body.restaurantId);
	} catch ({ message }) {
		//it is fine if these fail
	}
	try {
		if (!req.body.deleteDish) throw new Error("deleteDish not passed in");
	} catch ({ message }) {
		return res.render("error", { message, username, userId, isAdmin });
	}
	deleteDish = req.body.deleteDish == "yes";

	let result;

	try {
		if (deleteDish) {
			result = await removeDish(dishId);
		} else {
			result = await updateDish(dishId, name);
		}
	} catch ({ message }) {
		return res.render("error", { message, username, userId, isAdmin });
	}

	if (deleteDish) {
		return res.redirect("/home");
	} else return res.redirect("/view/dish/" + dishId);
});

export default router;
