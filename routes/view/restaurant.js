import { Router } from "express";
import { checkId } from "../../helpers.js";
import { getRestaurantFromId } from "../../data/restaurant/getRestaurantFromId.js";
import { getDishesFromRestaurantId } from "../../data/dish/getDishesFromRestaurantId.js";
const router = Router();

router.route("/:restaurantId").get(async (req, res) => {
	let username, userId, isAdmin;
	if (req.session && req.session.user) {
		username = req.session.user.username;
		userId = req.session.user.userId;
		isAdmin = req.session.user.admin;
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

	let title = isAdmin
		? `ADMIN: ${restaurant.name} | Restaurant`
		: `${restaurant.name} | Restaurant`;

	return res.render("view/restaurant", {
		title,
		admin: isAdmin,
		restaurantId,
		restaurant,
		dishes,
		username,
		userId,
	});
});

export default router;
