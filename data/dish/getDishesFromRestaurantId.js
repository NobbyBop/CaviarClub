import { checkId } from "../../helpers.js";
import { getRestaurantFromId } from "../restaurant/getRestaurantFromId.js";

export async function getDishesFromRestaurantId(restaurantId) {
  //type check
  restaurantId = checkId(restaurantId);
  //typecheck over

  const restaurant = await getRestaurantFromId(restaurantId);
  return restaurant["dishes"]; //returns array of dishes
}
