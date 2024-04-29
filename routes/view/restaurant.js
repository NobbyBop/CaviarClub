import { Router } from "express";
import { checkId } from "../../helpers.js";
import { getRestaurantFromId } from "../../data/restaurant/getRestaurantFromId.js";
import { getDishesFromRestaurantId } from "../../data/dish/getDishesFromRestaurantId.js";
const router = Router();

router.route("/:restaurantId").get(async (req, res) => {
	let username, userId;
	if (req.session && req.session.user) {
		username = req.session.user.username;
		userId = req.session.user.userId;
	}

	let restaurantId;
	try {
		restaurantId = checkId(req.params.restaurantId.toString());
	} catch ({ message }) {
		return res.render("error", { message });
	}

	let restaurant;
	try {
		restaurant = await getRestaurantFromId(restaurantId);
	} catch ({ message }) {
		return res.render("error", { message });
	}

	let dishes;
	try {
		dishes = await getDishesFromRestaurantId(restaurantId);
	} catch ({ message }) {
		return res.render("error", { message });
	}

	return res.render("view/restaurant", {
		title: `${restaurant.name} | Restaurant`,
		restaurant,
		dishes,
		username,
		userId,
	});
});

export default router;
