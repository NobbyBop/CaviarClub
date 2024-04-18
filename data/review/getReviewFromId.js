import { ObjectId } from "mongodb";
import { reviews } from "../../config/mongoCollections.js";
import { checkId } from "../../helpers.js";

export const getReviewFromId = async (reviewId) => {
  //type checeh
  reviewId = checkId(reviewId);
  //done :P

  const reviewCollection = await reviews();
  const review = reviewCollection.findOne({
    _id: new ObjectId(reviewId),
  });
  if (review === null) throw new Error("No review with that Id");

  return review;
};
