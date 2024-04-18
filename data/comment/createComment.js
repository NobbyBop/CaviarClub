import { reviews } from "../../config/mongoCollections.js";
import { checkId, checkString } from "../../helpers.js";
import { ObjectId } from "mongodb";
import { getReviewFromId } from "../review/getReviewFromId.js";

export const createComment = async (comment, userId, reviewId) => {
  //typecheck
  comment = checkString(comment);
  userId = checkId(userId);
  reviewId = checkId(reviewId);
  //over and out

  const newComment = {
    userId: userId,
    comment: comment,
  };

  const reviewCollection = await reviews();
  await reviewCollection.findOneAndUpdate(
    { _id: new ObjectId(reviewId) },
    { $push: { comments: newComment } }
  );

  const review = await getReviewFromId(reviewId);
  const reviewComments = review["comments"];
  let returnComment = reviewComments.find((cmt) => cmt["comment"] === comment);
  return returnComment;
};
