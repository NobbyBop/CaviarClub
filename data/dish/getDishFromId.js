import { restaurants } from "../../config/mongoCollections.js";
import { checkId } from "../../helpers.js";
import { ObjectId } from "mongodb";

export const getDishFromId = async (dishId) => {
  //get restaurant by id then yeah use that restaurant
  dishId = checkId(dishId);
  //get the restaurant
  let restaurantCollection = await restaurants();

  //dish must belong to the restaurant
  const foundDish = await restaurantCollection.findOne(
    { "dishes._id": new ObjectId(dishId) },
    { projection: { _id: 0, "dishes.$": 1 } }
  );
  if (!foundDish) throw new Error("Dish Not found");
  return foundDish["dishes"][0];
};
