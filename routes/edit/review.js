import { Router } from "express";
import { removeReview } from "../../data/review/removeReview.js";
const router = Router();

router.route("/").post(async (req, res) => {
	let username, userId, isAdmin;
	if (req.session && req.session.user) {
		username = req.session.user.username;
		userId = req.session.user.userId;
		isAdmin = req.session.user.admin;
	}

	let reviewId = req.body.reviewId;
	let review;

	try {
		review = await removeReview(reviewId);
	} catch ({ message }) {
		return res.render("error", { message, username, userId });
	}

	return res.redirect("/home");
});

export default router;
