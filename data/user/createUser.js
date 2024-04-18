import { users } from "../../config/mongoCollections.js";
import { checkEmail, checkString } from "../../helpers.js";
import { getUserFromId } from "./getUserFromId.js";

export const createUser = async (email, username, password, admin) => {
  //error check
  email = checkEmail(email);
  username = checkString(username);
  password = checkString(password);
  if (typeof admin !== "boolean") throw new Error("Admin must be a boolean");
  //prob change how we do this later like default it to false but whatever
  //don't need to check for dupe users i think that'll just be restricted
  //check over

  //new user
  const newUser = {
    email: email,
    username: username,
    password: password,
    admin: admin,
  };

  const userCollection = await users();
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw new Error("Could not add user");
  const newId = insertInfo.insertedId.toString();
  const user = await getUserFromId(newId);

  return user;
};
