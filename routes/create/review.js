import { Router } from "express";
import { checkId, checkRating, checkString } from "../../helpers.js";
import { createReview } from "../../data/review/createReview.js";
const router = Router();

router.route("/").get(async (req, res) => {
  res.render("create/review", { title: "Create Review" });
});
router.route("/new").post(async (req, res) => {
  let review = req.body;
  let tags;
  //type checking
  try {
    checkRating(review.actualRating);
    review.content = checkString(review.content);
    review.title = checkString(review.title);
    req.session.dishId = checkId(req.session.dishId);
    req.session.user.userId = checkId(req.session.user.userId);
  } catch (e) {
    return res.status(400).render("create/review", {
      title: "Create Review",
      error: e,
      prevSub: review,
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
    let newReview = await createReview(
      req.session.dishId,
      req.session.user.userId,
      review.image,
      review.title,
      review.rating,
      tags,
      review.content
    );
    if (!newReview)
      return res
        .status(500)
        .render("error", { title: "Error", error: "Internal Server Error." });
    res.render(`view/review/${newReview._id}`);
  } catch (e) {
    return res.status(400).render("create/review", {
      title: "Create Review",
      error: e,
      prevSub: review,
    });
  }
});

export default router;
