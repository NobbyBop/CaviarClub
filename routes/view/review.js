import { Router } from "express";
import { getReviewFromId } from "../../data/review/getReviewFromId.js";
import { checkId } from "../../helpers.js";
import { getRestaurantFromDishId } from "../../data/restaurant/getRestaurantFromDishId.js";
const router = Router();

router.route("/:reviewId").get(async (req, res) => {
	let username, userId;
	if (req.session && req.session.user) {
		[username, userId] = req.session.user;
	}
	let reviewId;
	try {
		reviewId = checkId(req.params.reviewId.toString());
	} catch ({ message }) {
		return res.render("error", { message, username, userId });
	}

	let review;
	try {
		review = await getReviewFromId(reviewId);
	} catch ({ message }) {
		return res.render("error", { message, username, userId });
	}

	let dishId;
	try {
		dishId = checkId(review.dishId.toString());
	} catch ({ message }) {
		return res.render("error", { message, username, userId });
	}
	let restaurant;
	try {
		restaurant = await getRestaurantFromDishId(dishId);
	} catch ({ message }) {
		return res.render("error", { message, username, userId });
	}

	//this seems so dumb... we should probably do this in the data functions
	//why would we ever need an id that isnt a string?
	review._id = review._id.toString();
	review.dishId = review.dishId.toString();
	review.userId = review.userId.toString();
	restaurant._id = restaurant._id.toString();
	for (const i in review.comments) {
		review.comments[i].userId = review.comments[i].userId.toString();
	}

	return res.render("view/review", {
		title: `${review.dishname}: Review`,
		review,
		restaurant,
		username,
		userId,
	});
});

export default router;
