import { ObjectId } from "mongodb";
import { restaurants } from "../../config/mongoCollections.js";
import { reviews } from "../../config/mongoCollections.js";

export const removeRestaurant = async (restaurantId) => {
	let restaurantCollection = await restaurants();
	let reviewCollection = await reviews();

	const deletedRestaurant = await restaurantCollection.findOneAndDelete({
		_id: new ObjectId(restaurantId),
	});

	if (!deletedRestaurant) {
		throw "Could not delete restaurant successfully";
	}

	const dishIds = deletedRestaurant.dishes.map((dish) => dish._id);

	try {
		const deletionResult = await reviewCollection.deleteMany({
			dishId: { $in: dishIds },
		});
		if (!deletionResult.acknowledged) console.log("Failed to delete reviews.");
	} catch (error) {
		console.error("Error deleting reviews:", error);
	}

	return deletedRestaurant;
};
