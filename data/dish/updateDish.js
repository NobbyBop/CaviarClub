import { ObjectId } from "mongodb";
import { restaurants } from "../../config/mongoCollections.js";
import { checkId, checkString } from "../../helpers.js";

export const updateDish = async (dishId, name) => {
	let restaurantCollection = await restaurants();

	try {
		dishId = checkId(dishId);
	} catch (e) {
		throw new Error(`checkId failed for dishId: ${e.message}`);
	}

	let updatedDish = {};
	try {
		name = checkString(name);
		updatedDish["name"] = name;
	} catch (e) {
		throw new Error(`checkString failed for name: ${e.message}`);
	}

	const dishes = (
		await restaurantCollection.findOne({ "dishes._id": new ObjectId(dishId) })
	).dishes;

	for (const i in dishes) {
		console.log(i, dishes);
		if (dishes[i]._id.toString() == dishId) {
			dishes[i] = updatedDish;
			break;
		}
	}

	const updatedInfo = await restaurantCollection.findOneAndUpdate(
		{ "dishes._id": new ObjectId(dishId) },
		{ $set: { dishes: dishes } },
		{ returnDocument: "after" }
	);

	if (!updatedInfo) throw "could not update restaurant successfully";
	updatedInfo._id = updatedInfo._id.toString();
	return updatedInfo;
};
