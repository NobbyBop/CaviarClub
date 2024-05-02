import { reviews } from "../../config/mongoCollections.js";
import { checkId, checkString } from "../../helpers.js";
import { ObjectId } from "mongodb";
import { getUserFromId } from "../user/getUserFromId.js";

export const createComment = async (reviewId, userId, comment) => {
    comment = checkString(comment);
    userId = checkId(userId);
    reviewId = checkId(reviewId);

    const user = await getUserFromId(userId);

    const newComment = {
        userId: new ObjectId(userId),
        username: user.username,
        comment: comment,
        timestamp: new Date()  // Optional: add timestamp to the comment
    };

    const reviewCollection = await reviews();
    const returnValue = await reviewCollection.findOneAndUpdate(
        { _id: new ObjectId(reviewId) },
        { $push: { comments: newComment } },
        { returnDocument: 'after' }  // Ensures it returns the updated document
    );

    if (!returnValue.value) throw new Error("Error: Comment could not be added");

    return newComment;
};

