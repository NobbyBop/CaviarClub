import { userData } from "../../data/index.js";
import * as h from "../../helpers.js";
import { Router } from "express";
import { getReviewsFromUser } from "../../data/review/getReviewsFromUser.js";

const router = Router();

router
	.route("/")
	.get(async (req, res) => {
		return res.render("auth/login", { title: "Login" });
	})
	.post(async (req, res) => {
		let s = req.body;
		try {
			s.username = h.checkUser(s.username);
			s.password = h.checkPass(s.password);
		} catch (e) {
			return res
				.status(400)
				.render("auth/login", { title: "Login", error: e, prevSub: s });
		}
		try {
			let result = await userData.loginUser(s.username, s.password);
			if (!result)
				return res
					.status(500)
					.render("error", { title: "Error", error: "Internal Server Error." });

			let userReviews = await getReviewsFromUser(String(result._id))
			let reviewCount = userReviews.length
			
			req.session.user = {
				email: result.email,
				username: result.username,
				userId: result._id,
				admin: result.admin,
				reviewCount:49
			};

			return res.redirect("/home");
		} catch (e) {
			return res
				.status(400)
				.render("auth/login", { title: "Login", error: e, prevSub: s });
		}
	});

export default router;
