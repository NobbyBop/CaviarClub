import { users } from "../../config/mongoCollections.js";
import { checkId } from "../../helpers.js";
import { ObjectId } from "mongodb";

export const getUserFromId = async (userId) => {
	userId = checkId(userId);

	const userCollection = await users();
	const user = await userCollection.findOne({
		_id: new ObjectId(userId),
	});

	if (!user) throw new Error("No user with that ID");

	return user;
};
