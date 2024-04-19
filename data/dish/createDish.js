import { checkId, checkString } from "../../helpers.js";
import { restaurants } from "../../config/mongoCollections.js";
import { getDishesFromRestaurantId } from "./getDishesFromRestaurantId.js";
import { ObjectId } from "mongodb";
import { getDishFromId } from "./getDishFromId.js";

export const createDish = async (name, restaurantId) => {
	name = checkString(name);
	restaurantId = checkId(restaurantId);

	let dishesFromRestaurant = await getDishesFromRestaurantId(restaurantId);
	if (
		dishesFromRestaurant.some(
			(dishObj) => dishObj.name.toLowerCase() == name.toLowerCase()
		)
	)
		throw new Error("This dish already exists for this restaurant");

	const newDish = {
		_id: new ObjectId(),
		name: name,
		averageRating: 0,
	};

	const restaurantCollection = await restaurants();
	await restaurantCollection.findOneAndUpdate(
		{ _id: new ObjectId(restaurantId) },
		{ $push: { dishes: newDish } }
	);

	return newDish;
};
