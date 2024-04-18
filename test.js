import { createComment } from "./data/comment/createComment.js";
import { createDish } from "./data/dish/createDish.js";
import { createRestaurant } from "./data/restaurant/createRestaurant.js";
import { createReview } from "./data/review/createReview.js";
import { createUser } from "./data/user/createUser.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import { restaurants } from "./config/mongoCollections.js";

let connect = await dbConnection();
await connect.dropDatabase();

let bennys = await createRestaurant(
  "Benny Tudino's",
  "355 Washington St. Hoboken, NJ"
);
let bennyId = bennys._id;
console.log("benny", bennys);

let pisghetty = await createDish("Spaghetti", bennyId.toString());
console.log("pisghet", pisghetty);

let me = await createUser("poopyhead@gmail.com", "Mess1", "Cowabunga", true);
console.log(me);

let pisghettyReview = await createReview(
  pisghetty._id.toString(),
  me._id.toString(),
  bennyId.toString(),
  "picture.png",
  "Great psigheturtryt!",
  5,
  ["Spicy", "Saucy"],
  "THis rpightrertry was FANTABULOUS!"
);
console.log("review", pisghettyReview);
let pisghettyReview2 = await createReview(
  pisghetty._id.toString(),
  me._id.toString(),
  bennyId.toString(),
  "picture2.png",
  "meh [psie]",
  3,
  ["Spicy", "Saucy"],
  "THis rpightrertry was just ok"
);
// //create a user and a review first
// let wowwee = await createComment(
//   "WoWWWW!!!!!!!!!!!!",
//   me._id.toString(),
//   pisghettyReview._id.toString()
// );
// console.log("comment", wowwee);

closeConnection();
