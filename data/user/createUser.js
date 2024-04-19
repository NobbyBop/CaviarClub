import { users } from "../../config/mongoCollections.js";
import { checkEmail, checkString } from "../../helpers.js";
import { getUserFromUsername } from "./getUserFromUsername.js";
import { ObjectId } from "mongodb";

export const createUser = async (email, username, password, admin) => {
	email = checkEmail(email);
	username = checkString(username).toLowerCase();
	password = checkString(password);
	if (typeof admin !== "boolean") throw new Error("Admin must be a boolean");
	//prob change how we do this later like default it to false but whatever

	let existingUser;
	try {
		existingUser = await getUserFromUsername(username);
	} catch (error) {}
	if (existingUser) throw new Error("Username not available.");

	const newUser = {
		_id: new ObjectId(),
		email: email,
		username: username,
		password: password,
		admin: admin,
	};

	const userCollection = await users();
	const insertInfo = await userCollection.insertOne(newUser);
	if (!insertInfo.acknowledged || !insertInfo.insertedId)
		throw new Error("Could not add user");

	return newUser;
};
