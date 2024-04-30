import { restaurants } from "../../config/mongoCollections.js";
import * as h from "../../helpers.js";
import { ObjectId } from "mongodb";
export async function searchDishesFromName(name, restaurantId) {
	name = h.checkString(name);
	restaurantId = h.checkId(restaurantId);
	let col = await restaurants();
	let restaurant = await col.findOne({ _id: new ObjectId(restaurantId) });
	if (!restaurant) throw Error("Could not get restaurant with provided Id!");
	let matches = [];

	for (let d of restaurant.dishes) {
		if (d.name.toLowerCase().includes(name.toLowerCase())) matches.push(d);
	}

	return matches;
}
