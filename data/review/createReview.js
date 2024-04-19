import {
	checkId,
	checkRating,
	checkString,
	checkTags,
	createDateString,
} from "../../helpers.js";
import { reviews, restaurants } from "../../config/mongoCollections.js";
import { getDishFromId } from "../dish/getDishFromId.js";
import { getReviewsFromDishId } from "./getReviewsFromDishId.js";
import { ObjectId } from "mongodb";

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
	title = checkString(title);
	checkRating(rating);
	content = checkString(content);
	checkTags(tags);

	let currentDay = new Date();
	let dateString = createDateString(currentDay);

	const newReview = {
		_id: new ObjectId(),
		dishId: new ObjectId(dishId),
		userId: new ObjectId(userId),
		picture: picture,
		rating: rating,
		date: dateString,
		tags: tags,
		title: title,
		content: content,
		comments: [],
	};

	//Average rating update for dish being reviewed
	const ratingToUpdate = await getDishFromId(dishId);
	if (!ratingToUpdate) throw new Error("Error: reviewed dish does not exist.");
	const reviewsByDish = await getReviewsFromDishId(dishId);

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
	const insertInfo = await reviewCollection.insertOne(newReview);

	if (!insertInfo.acknowledged || !insertInfo.insertedId)
		throw new Error("Could not add review");

	return newReview;
};
