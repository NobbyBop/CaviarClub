import { restaurants } from "../../config/mongoCollections.js";
import { checkId } from "../../helpers.js";
import { ObjectId } from "mongodb";

export const getRestaurantFromDishId = async (dishId) => {
	dishId = checkId(dishId);

	let restaurantCollection = await restaurants();

	const restaurant = await restaurantCollection.findOne({
		"dishes._id": new ObjectId(dishId),
	});

	if (!restaurant) throw new Error("Dish Not found");

	return restaurant;
};
