import { ObjectId } from "mongodb";
import { restaurants, reviews } from "../../config/mongoCollections.js";
import { checkId, checkString } from "../../helpers.js";

export const updateDish = async (dishId, name) => {
	let restaurantCollection = await restaurants();
	let reviewCollection = await reviews();

	try {
		dishId = checkId(dishId);
	} catch (e) {
		throw new Error(`checkId failed for dishId: ${e.message}`);
	}

	const rest = await restaurantCollection.findOne({
		"dishes._id": new ObjectId(dishId),
	});

	let updatedDish;

	for (const dish of rest.dishes) {
		if (dish._id.toString() == dishId) {
			updatedDish = dish;
		}
	}

	try {
		name = checkString(name);
		updatedDish["name"] = name;
	} catch (e) {
		throw new Error(`checkString failed for name: ${e.message}`);
	}

	for (const i in rest.dishes) {
		if (rest.dishes[i]._id.toString() == dishId) {
			rest.dishes[i] = updatedDish;
			break;
		}
	}

	const updatedInfo = await restaurantCollection.findOneAndUpdate(
		{ "dishes._id": new ObjectId(dishId) },
		{ $set: { dishes: rest.dishes } },
		{ returnDocument: "after" }
	);

	const updateReview = await reviewCollection.updateMany(
		{ dishId: new ObjectId(dishId) },
		{ $set: { dishname: name } }
	);

	console.log(updateReview);

	if (!updatedInfo) throw "could not update restaurant successfully";
	updatedInfo._id = updatedInfo._id.toString();
	return updatedInfo;
};
