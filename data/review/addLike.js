import { reviews } from "../../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { getReviewFromId } from "./getReviewFromId.js";
import { checkId } from "../../helpers.js";

export async function addLike(reviewId, userId) {
	reviewId = checkId(reviewId);
	userId = checkId(userId);

	const review = await getReviewFromId(reviewId);
	if (!review) throw new Error("Error: Could not find review with that Id!");

	if (review.likes.includes(userId))
		throw new Error("Error: user already liked review!");

	const reviewCollection = await reviews();

	const returnObj = await reviewCollection.findOneAndUpdate(
		{ _id: new ObjectId(reviewId) },
		{ $push: { likes: userId } },
		{ returnDocument: "after" }
	);

	if (!returnObj) throw new Error("Error: Could not add like!");

	return returnObj;
}
