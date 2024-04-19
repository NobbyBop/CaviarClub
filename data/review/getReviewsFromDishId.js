import { reviews } from "../../config/mongoCollections.js";
import { checkId } from "../../helpers.js";
import { ObjectId } from "mongodb";

export const getReviewsFromDishId = async (dishId) => {
	dishId = checkId(dishId);

	const reviewCollection = await reviews();
	const reviewsByDish = await reviewCollection.find({
		dishId: new ObjectId(dishId),
	});

	if (!reviewsByDish) throw new Error("No dish with that id.");

	return reviewsByDish.toArray();
};
