import {
	checkId,
	checkRating,
	checkString,
	checkTags,
	createDateString,
	checkImage,
} from "../../helpers.js";
import { reviews, restaurants } from "../../config/mongoCollections.js";
import { getDishFromId } from "../dish/getDishFromId.js";
import { getReviewsFromDishId } from "./getReviewsFromDishId.js";
import { ObjectId } from "mongodb";
import { getUserFromId } from "../user/getUserFromId.js";

export const createReview = async (
	dishId,
	userId,
	picture,
	title,
	rating,
	tags,
	content
) => {
	dishId = checkId(dishId);
	userId = checkId(userId);

	// need picture validation
	picture = checkImage(picture);

	title = checkString(title);
	checkRating(rating);
	content = checkString(content);
	checkTags(tags);

	const user = await getUserFromId(userId);

	const dish = await getDishFromId(dishId);
	if (!dish) throw new Error("Error: reviewed dish does not exist.");

	let currentDay = new Date();
	let dateString = createDateString(currentDay);

	const newReview = {
		dishId: new ObjectId(dishId),
		dishname: dish.name,
		userId: new ObjectId(userId),
		username: user.username,
		picture: picture,
		rating: rating,
		date: dateString,
		tags: tags,
		title: title,
		content: content,
		comments: [],
		likes: [],
	};

	//Average rating update for dish being reviewed
	const ratingToUpdate = dish;
	let reviewsByDish = await getReviewsFromDishId(dishId);

	const pre = reviewsByDish.length * ratingToUpdate.averageRating;
	//average review can have at most 2 decimal places
	const post =
		Math.trunc(((pre + rating) * 100) / (reviewsByDish.length + 1)) / 100;

	const restaurantCollection = await restaurants();
	await restaurantCollection.findOneAndUpdate(
		{ "dishes._id": new ObjectId(dishId) },
		{ $set: { "dishes.$.averageRating": post } }
	);

	const reviewCollection = await reviews();
	const insertedReview = await reviewCollection.findOneAndUpdate(
		{ userId: new ObjectId(userId), dishId: new ObjectId(dishId) },
		{ $set: { ...newReview } },
		{ upsert: true, returnDocument: "after" }
	);

	if (!insertedReview) throw new Error("Could not add review");

	reviewsByDish = await getReviewsFromDishId(insertedReview.dishId.toString());
    
	let newAverage = 0;
	if (reviewsByDish.length !== 0) 
		newAverage = reviewsByDish.map(review => review.rating).reduce((sum, rating) => sum + rating, 0) / reviewsByDish.length;

	await restaurantCollection.findOneAndUpdate(
		{ "dishes._id": insertedReview.dishId },
		{ $set: { "dishes.$.averageRating": newAverage } }
	);


	return insertedReview;
};
