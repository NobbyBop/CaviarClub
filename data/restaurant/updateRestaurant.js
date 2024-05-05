import { ObjectId } from "mongodb";
import { restaurants } from "../../config/mongoCollections.js";
import { checkString } from "../../helpers.js";

export const updateRestaurant = async (restaurantId, name, address) => {
	let restaurantCollection = await restaurants();

	let updatedRestaurant = {};
	try {
		name = checkString(name);
		updatedRestaurant["name"] = name;
	} catch (e) {
		0;
	}
	try {
		address = checkString(address);
		updatedRestaurant["address"] = address;
	} catch (e) {
		0;
	}

	const updatedInfo = await restaurantCollection.findOneAndUpdate(
		{ _id: new ObjectId(restaurantId) },
		{ $set: updatedRestaurant },
		{ returnDocument: "after" }
	);

	if (!updatedInfo) throw "could not update restaurant successfully";
	updatedInfo._id = updatedInfo._id.toString();
	return updatedInfo;
};
