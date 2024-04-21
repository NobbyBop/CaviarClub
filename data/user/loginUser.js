import bcrypt from "bcrypt";
import { checkString } from "../../helpers.js";
import { users } from "../../config/mongoCollections.js";

export async function loginUser(username, password) {
	username = checkString(username).toLowerCase();
	password = checkString(password);

	const usersCollection = await users();

	const user = await usersCollection.findOne({ username });

	if (user == null || !(await bcrypt.compare(password, user.password)))
		throw new Error("Error: invalid username/password");

	delete user.password;

	return user;
}
