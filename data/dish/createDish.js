import { checkId, checkString } from "../../helpers.js";
import { restaurants } from "../../config/mongoCollections.js";
import { getDishesFromRestaurantId } from "./getDishesFromRestaurantId.js";
import { ObjectId } from "mongodb";
import { getDishFromId } from "./getDishFromId.js";

export const createDish = async (name, restaurantId) => {
  //error checking
  name = checkString(name);
  restaurantId = checkId(restaurantId);

  //does this dish exist at this restaurant already?
  let dishesFromRestaurant = await getDishesFromRestaurantId(restaurantId);
  if (dishesFromRestaurant.includes(name))
    throw new Error("This dish already exists for this restaurant");
  //end checking

  //new dish
  const newDish = {
    _id: new ObjectId(),
    name: name,
    averageRating: 0,
  };
  //insert
  const restaurantCollection = await restaurants();
  await restaurantCollection.findOneAndUpdate(
    { _id: new ObjectId(restaurantId) },
    { $push: { dishes: newDish } }
  );
  //does this need a return? yes
  return newDish;
};
