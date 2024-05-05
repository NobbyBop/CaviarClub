import { Router } from "express";
import { checkId } from "../../helpers.js";
import { getDishFromId } from "../../data/dish/getDishFromId.js";
import { getRestaurantFromDishId } from "../../data/restaurant/getRestaurantFromDishId.js";
import { getReviewsFromDishId } from "../../data/review/getReviewsFromDishId.js";
const router = Router();

router.route("/:dishId").get(async (req, res) => {
	let username, userId, isAdmin;
	if (req.session && req.session.user) {
		username = req.session.user.username;
		userId = req.session.user.userId;
		isAdmin = req.session.user.admin;
	}
	let dishId;
	try {
		dishId = checkId(req.params.dishId);
	} catch ({ message }) {
		return res.render("error", { message, username });
	}

	let dish;
	try {
		dish = await getDishFromId(dishId);
	} catch ({ message }) {
		return res.render("error", { message, username });
	}

	let restaurant;
	try {
		restaurant = await getRestaurantFromDishId(dishId);
	} catch ({ message }) {
		return res.render("error", { message, username });
	}

	let reviews;
	try {
		reviews = await getReviewsFromDishId(dishId);
	} catch ({ message }) {
		return res.render("error", { message, username });
	}

	reviews.map((review) => {
		if (review.content.length > 150)
			review.content = `${review.content.substring(0, 150)}...`;
	});
	return res.render("view/dish", {
		title: dish.name,
		restaurantName: restaurant.name,
		restaurantId: restaurant._id,
		averageRating: dish.averageRating,
		dishReviews: reviews,
		dishId: dish._id,
		username,
		userId,
		admin: isAdmin,
	});
});

export default router;
