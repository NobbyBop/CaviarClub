import { Router } from "express";
import { checkId } from "../../helpers.js";
import { getDishFromId } from "../../data/dish/getDishFromId.js";
import { getRestaurantFromDishId } from "../../data/restaurant/getRestaurantFromDishId.js";
import { getReviewsFromDishId } from "../../data/review/getReviewsFromDishId.js";
const router = Router();

router.route("/:dishId").get(async (req, res) => {
	let name = undefined
    if(req.session && req.session.user) name = req.session.user.username
	let dishId;
	try {
		dishId = checkId(req.params.dishId);
	} catch ({ message }) {
		return res.render("error", { message, username:name });
	}

	let dish;
	try {
		dish = await getDishFromId(dishId);
	} catch ({ message }) {
		return res.render("error", { message, username:name });
	}

	let restaurant;
	try {
		restaurant = await getRestaurantFromDishId(dishId);
	} catch ({ message }) {
		return res.render("error", { message, username:name });
	}

	let reviews;
	try {
		reviews = await getReviewsFromDishId(dishId);
	} catch ({ message }) {
		return res.render("error", { message, username:name });
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
		username: name
	});
});

export default router;
