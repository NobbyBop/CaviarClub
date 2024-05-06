import { Router } from "express";
import { searchRestaurantsFromName } from "../../data/restaurant/searchRestaurantsFromName.js";
import { updateRestaurant } from "../../data/restaurant/updateRestaurant.js";
import { removeRestaurant } from "../../data/restaurant/removeRestaurant.js";
import { checkString, checkId } from "../../helpers.js";
const router = Router();

router.route("/").post(async (req, res) => {
	let username, userId, isAdmin;
	if (req.session && req.session.user) {
		username = req.session.user.username;
		userId = req.session.user.userId;
		isAdmin = req.session.user.admin;
	}

	let name, address, restaurantId, isDeleted, restaurant;
	try {
		restaurantId = checkId(req.body.restaurantId);
		name = checkString(req.body.name);
		address = checkString(req.body.address);
		isDeleted = checkString(req.body.isDeleted) === "yes" ? true : false;
		if (isDeleted) restaurant = await removeRestaurant(restaurantId);
		else restaurant = await updateRestaurant(restaurantId, name, address);
	} catch ({ message }) {
		return res.render("error", { message, username, userId });
	}

	req.session.restaurantId = restaurant._id.toString();

	if (isDeleted) return res.redirect("/home");
	else return res.redirect("/view/restaurant/" + restaurant._id.toString());
});

export default router;
