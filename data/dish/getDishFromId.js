import { restaurants } from "../../config/mongoCollections.js";
import { checkId } from "../../helpers.js";
import { ObjectId } from "mongodb";

export const getDishFromId = async (dishId) => {
	dishId = checkId(dishId);

	let restaurantCollection = await restaurants();

	const foundDish = await restaurantCollection.findOne(
		{ "dishes._id": new ObjectId(dishId) },
		{ projection: { _id: 0, "dishes.$": 1 } }
	);

	if (!foundDish) throw new Error("Dish Not found");

	return foundDish.dishes.filter((dish) => dish._id == dishId)[0];
};
