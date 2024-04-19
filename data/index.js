import { createComment } from "./comment/createComment.js";
import { removeComment } from "./comment/removeComment.js";
export const commentData = { createComment, removeComment };

import { createDish } from "./dish/createDish.js";
import { getDishesFromRestaurantId } from "./dish/getDishesFromRestaurantId.js";
import { getDishFromId } from "./dish/getDishFromId.js";
import { removeDish } from "./dish/removeDish.js";
import { getDishFromId } from "./dish/getDishFromId.js";
import { searchDishesFromName } from "./dish/searchDishesFromName.js";
export const dishData = {
	createDish,
	getDishesFromRestaurantId,
	getDishFromId,
	removeDish,
	searchDishesFromName,
};

import { createRestaurant } from "./restaurant/createRestaurant.js";
import { getRestaurantFromId } from "./restaurant/getRestaurantFromId.js";
import { removeRestaurant } from "./restaurant/removeRestaurant.js";
import { searchRestaurantsFromName } from "./restaurant/searchRestaurantsFromName.js";
export const restaurantData = {
	createRestaurant,
	getRestaurantFromId,
	removeRestaurant,
	searchRestaurantsFromName,
};

import { createReview } from "./review/createReview.js";
import { getAllReviews } from "./review/getAllReviews.js";
import { getReviewFromId } from "./review/getReviewFromId.js";
import { getReviewsFromUser } from "./review/getReviewsFromUser.js";
import { getReviewsFromRestaurant } from "./review/getReviewsFromRestaurant.js";
import { removeReview } from "./review/removeReview.js";
export const reviewData = {
	createReview,
	getAllReviews,
	getReviewFromId,
	getReviewsFromUser,
	getReviewsFromRestaurant,
	removeReview,
};

import { createUser } from "./user/createUser.js";
import { getUserFromId } from "./user/getUserFromId.js";
import { getUserFromUsername } from "./user/getUserFromUsername.js";
import { removeUser } from "./user/removeUser.js";
export const userData = {
	createUser,
	getUserFromId,
	getUserFromUsername,
	removeUser,
};
