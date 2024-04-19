import { checkId } from "../../helpers.js";
import { getRestaurantFromId } from "../restaurant/getRestaurantFromId.js";

export async function getDishesFromRestaurantId(restaurantId) {
	restaurantId = checkId(restaurantId);

	const restaurant = await getRestaurantFromId(restaurantId);

	return restaurant.dishes;
}
