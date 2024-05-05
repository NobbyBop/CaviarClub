import { ObjectId, ReturnDocument } from "mongodb";
import { restaurants } from "../../config/mongoCollections.js";
import { reviews } from "../../config/mongoCollections.js";

export async function removeDish(dishId) {
	let restaurantCollection = await restaurants();
	let reviewCollection = await reviews();

	const deletedDish = await restaurantCollection.findOne({
		"dishes._id": new ObjectId(dishId),
	});

	if (!deletedDish) {
		throw "Could not delete restaurant successfully";
	}

	const otherDishes = {
		$filter: {
			input: "$dishes",
			as: "dish",
			cond: { $ne: ["$$dish._id", new ObjectId(dishId)] },
		},
	};

	const updatedRestaurant = restaurantCollection.findOneAndUpdate(
		{ "dishes._id": new ObjectId(dishId) },
		[{ $set: { dishes: otherDishes } }],
		{ ReturnDocument: "after" }
	);

	if (!updatedRestaurant) {
		console.error("Error deleting dish");
	}

	try {
		const deletionResult = await reviewCollection.deleteMany({
			dishId: new ObjectId(dishId),
		});
		if (!deletionResult.acknowledged) console.log("Failed to delete reviews.");
		console.log(deletionResult);
	} catch (error) {
		console.error("Error deleting reviews:", error);
	}

	return deletedDish;
}
