import { reviews } from "../../config/mongoCollections.js";
import { checkId, checkString } from "../../helpers.js";
import { ObjectId } from "mongodb";
import { getUserFromId } from "../user/getUserFromId.js";

export const createComment = async (comment, userId, reviewId) => {
	comment = checkString(comment);
	userId = checkId(userId);
	reviewId = checkId(reviewId);

	const user = await getUserFromId(userId);

	const newComment = {
		userId: new ObjectId(userId),
		username: user.username,
		comment: comment,
	};

	const reviewCollection = await reviews();
	const returnValue = await reviewCollection.findOneAndUpdate(
		{ _id: new ObjectId(reviewId) },
		{ $push: { comments: newComment } }
	);

	if (!returnValue) throw new Error("Error: Comment could not be added");

	return newComment;
};
