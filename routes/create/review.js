import { Router } from "express";
import { checkId, checkImage, checkRating, checkString } from "../../helpers.js";
import { createReview } from "../../data/review/createReview.js";
import { getReviewsFromUser } from "../../data/review/getReviewsFromUser.js";
import xss from "xss"

const router = Router();

router.route("/").get(async (req, res) => {
  let username, userId;
  if (req.session && req.session.user) {
    username = req.session.user.username;
    userId = req.session.user.userId;
  }

  if (!req.session.restaurantId || req.session.restaurantId.length == 0)
    return res.status(500).render("error", {
      message: "no restaurantId provided!",
      username,
      userId,
    });

  if (
    (!req.session.dishId || req.session.dishId.length == 0) &&
    !req.query.dishId
  )
    return res.status(500).render("error", {
      message: "no dishId provided!",
      username,
      userId,
    });

  if (req.query.dishId) req.session.dishId = req.query.dishId;
  res.render("create/review", { title: "Create Review", username, userId });
});

router.route("/new").post(async (req, res) => {
  let username, userId;
  if (req.session && req.session.user) {
    username = req.session.user.username;
    userId = req.session.user.userId;
  }

  let review = req.body;
  let tags = [];
  //type checking
  try {
    checkRating(parseFloat(xss(review.rating)));
    review.content = checkString(review.content);
    review.title = checkString(review.title);
    req.session.dishId = checkId(req.session.dishId);
    req.session.user.userId = checkId(req.session.user.userId);
  } catch (e) {
    return res.status(400).render("create/review", {
      title: "Create Review",
      error: e,
      prevSub: review,
      username,
      userId,
    });
  }
  //tag checking- a tag will not be added if it's an empty string but will be added otherwise
  try {
    review.tag1 = checkString(review.tag1);
    tags.push(review.tag1);
  } catch (e) {
    //if there's an error then that tag was empty, but that means we should just not push it
  }
  try {
    review.tag2 = checkString(review.tag2);
    tags.push(review.tag2);
  } catch (e) {
    //if there's an error then that tag was empty, but that means we should just not push it
  }
  try {
    review.tag3 = checkString(review.tag3);
    tags.push(review.tag3);
  } catch (e) {
    //if there's an error then that tag was empty, but that means we should just not push it
  }

  try {
    review.imageBase64 = checkImage(review.imageBase64);
  } catch (e) {
    return res.status(500).render("error", {
      message: "Incompatible image type!",
      username,
      userId,
    })
  }
  try {
    let newReview = await createReview(
      req.session.dishId,
      req.session.user.userId,
      review.imageBase64,
      review.title,
      parseFloat(review.rating),
      tags,
      review.content
    );
    if (!newReview)
      return res
        .status(500)
        .render("error", { title: "Error", error: "Internal Server Error." });
    
    let userReviews = await getReviewsFromUser(String(userId))
    req.session.user.reviewCount = userReviews.length
    
    res.redirect(`/view/review/${newReview._id}`);
  } catch (e) {
    return res.status(400).render("create/review", {
      title: "Create Review",
      error: e,
      prevSub: review,
      username,
      userId,
    });
  }
});

export default router;
