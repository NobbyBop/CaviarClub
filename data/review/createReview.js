import {
  checkId,
  checkRating,
  checkString,
  checkTags,
  createDateString,
} from "../../helpers.js";
import { reviews, restaurants } from "../../config/mongoCollections.js";
import { getDishFromId } from "../dish/getDishFromId.js";
import { ObjectId } from "mongodb";
import { getReviewFromId } from "./getReviewFromId.js";
import { getReviewsFromDishId } from "./getReviewsFromDishId.js";

export const createReview = async (
  dishId, //these ids obviously wont be passed in by the user but i imagine will be passed in somehow? sounds like middleware?
  userId,
  restaurantId,
  picture,
  title,
  rating,
  tags,
  content
) => {
  //typechecking
  dishId = checkId(dishId);
  userId = checkId(userId);
  restaurantId = checkId(restaurantId);
  title = checkString(title);
  checkRating(rating);
  content = checkString(content);
  checkTags(tags);
  //typecheck ends

  //Setting the date
  let currentDay = new Date();
  let dateString = createDateString(currentDay);
  //dateString is what will go in the date section

  //new review
  const newReview = {
    dishId: new ObjectId(dishId),
    userId: new ObjectId(userId),
    restaurantId: new ObjectId(restaurantId),
    picture: picture,
    rating: rating,
    date: dateString,
    tags: tags,
    content: content,
    comments: [],
  };

  //Average rating update for dish being reviewed
  const reviewsByDish = await getReviewsFromDishId(dishId);
  let ratingToUpdate = await getDishById(dishId);
  //console.log("peepeeeepeepepepeeee", ratingToUpdate["averageRating"]);
  let post = 0;
  let pre = 0;

  console.log("HEEYYYY!!!!!!!!!!!!!!!", reviewsByDish);
  if (reviewsByDish) {
    pre = reviewsByDish.length * ratingToUpdate["averageRating"];
    post = (pre + rating) / (reviewsByDish.length + 1);
  }
  console.log("pre", pre);
  console.log("post", post);

  let restaurantCollection = await restaurants();
  await restaurantCollection.findOneAndUpdate(
    { "dishes._id": new ObjectId(dishId) },
    { $set: { "dishes.$.averageRating": post } } //this is not working.
  );
  //NEED PICTURE TYPECHECKING?

  const reviewCollection = await reviews();
  const insertInfo = await reviewCollection.insertOne(newReview);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw new Error("Could not add review");
  const newId = insertInfo.insertedId.toString();
  const review = await getReviewFromId(newId);

  return review;
};
