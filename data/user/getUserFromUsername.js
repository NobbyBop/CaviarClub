import { users } from "../../config/mongoCollections.js";
import * as h from "../../helpers.js";
export async function getUserFromUsername(name) {
	h.checkString(name);
	let col = await users();
	let match = await col.findOne({
		username: { $regex: `^${name}$`, $options: "i" },
	});

	delete match.password;

	if (!match) throw Error("No user with that username.");
	else return match;
}
