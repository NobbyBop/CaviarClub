import { restaurants } from "../../config/mongoCollections.js";
import { checkId } from "../../helpers.js";
import { ObjectId } from "mongodb";

export const getRestaurantFromId = async (restaurantId) => {
  //typecheck
  restaurantId = checkId(restaurantId);
  //typecheck over
  const restaurantCollection = await restaurants();
  const restaurant = await restaurantCollection.findOne({
    _id: new ObjectId(restaurantId),
  });
  if (restaurant === null) throw new Error("No product with that ID");

  return restaurant;
};
