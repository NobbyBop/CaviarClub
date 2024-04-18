import { reviews } from "../../config/mongoCollections.js";
import { checkId } from "../../helpers.js";
import { ObjectId } from "mongodb";

export const getReviewsFromDishId = async (dishId) => {
  //type mometn
  dishId = checkId(dishId);
  //donezo

  const reviewCollection = await reviews();
  const reviewsByDish = await reviewCollection.find({
    dishId: new ObjectId(dishId),
  });
  if (reviewsByDish) return reviewsByDish.toArray();
  else return [];
  //console.log("revieewewwe", reviewsByDish);
  //array of reviews^
};
