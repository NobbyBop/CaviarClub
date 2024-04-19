import { ObjectId } from "mongodb";
import { restaurants } from "../../config/mongoCollections.js";
import { checkString } from "../../helpers.js";

export const createRestaurant = async (name, address) => {
	name = checkString(name);
	address = checkString(address);

	let restaurantCollection = await restaurants();
	let hopefullyNotAnotherRestaurant = await restaurantCollection.findOne({
		address,
	});
	if (hopefullyNotAnotherRestaurant)
		throw new Error("Duplicate address entered");
	const newRestaurant = {
		_id: new ObjectId(),
		name: name,
		address: address,
		dishes: [],
	};

	const insertInfo = await restaurantCollection.insertOne(newRestaurant);
	if (!insertInfo.acknowledged || !insertInfo.insertedId)
		throw new Error("Could not add restaurant");

	return newRestaurant;
};
