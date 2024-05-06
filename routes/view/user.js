import { Router } from "express";
import { getUserFromId } from "../../data/user/getUserFromId.js";
import { getReviewsFromUser } from "../../data/review/getReviewsFromUser.js";
import { checkString } from "../../helpers.js";

const router = Router();

router.get("/:userId", async (req, res) => {
	let userId, username;
	if (req.session && req.session.user) {
		username = req.session.user.username;
		userId = req.session.user.userId;
	}
	try {
		const viewUserId = checkString(req.params.userId);
		const user = await getUserFromId(viewUserId);
		const reviews = await getReviewsFromUser(viewUserId);
		return res.render("view/user", { user, reviews, username, userId });
	} catch (error) {
		res.status(500).send(error.message);
	}
});

export default router;
