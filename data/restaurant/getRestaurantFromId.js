import { restaurants } from "../../config/mongoCollections.js";
import { checkId } from "../../helpers.js";
import { ObjectId } from "mongodb";

export const getRestaurantFromId = async (restaurantId) => {
	restaurantId = checkId(restaurantId);

	const restaurantCollection = await restaurants();
	const restaurant = await restaurantCollection.findOne({
		_id: new ObjectId(restaurantId),
	});
	if (!restaurant) throw new Error("No restaurant with that ID");

	return restaurant;
};
