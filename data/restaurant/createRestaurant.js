import { restaurants } from "../../config/mongoCollections.js";
import { checkString } from "../../helpers.js";
import { getRestaurantFromId } from "./getRestaurantFromId.js";

export const createRestaurant = async (name, address) => {
  //error checking
  name = checkString(name);
  address = checkString(address);

  //does this restaurant exist?
  let restaurantCollection = await restaurants();
  let hopefullyNotAnotherRestaurant = await restaurantCollection.findOne({
    address: address, //this might be the wrong way to find it but maybe not
  });
  if (hopefullyNotAnotherRestaurant)
    throw new Error("Duplicate address entered");
  //error checking ends
  const newRestaurant = {
    name: name,
    address: address,
    dishes: [],
  };

  const insertInfo = await restaurantCollection.insertOne(newRestaurant);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw new Error("Could not add restaurant");
  const newId = insertInfo.insertedId.toString();
  const restaurant = await getRestaurantFromId(newId);

  return restaurant;
};
