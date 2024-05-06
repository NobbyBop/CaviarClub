import { reviews } from "../../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { checkId } from "../../helpers.js";

export const removeComment = async (reviewId, commentId) => {
	reviewId = checkId(reviewId);
	commentId = checkId(commentId);

	const reviewCollection = await reviews();
	const updateInfo = await reviewCollection.updateOne(
		{ _id: new ObjectId(reviewId) },
		{ $pull: { comments: { _id: new ObjectId(commentId) } } }
	);

	if (updateInfo.modifiedCount === 0) {
		throw new Error("No comments were removed");
	}

	return updateInfo.modifiedCount;
};
