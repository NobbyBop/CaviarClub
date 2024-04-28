import { Router } from "express";
import {
	reviewData,
	userData,
	dishData,
	restaurantData,
} from "../data/index.js";
const router = Router();

router
	.route("/")
	.get(async (req, res) => {
		let name = undefined;
		let userId;
		if (req.session && req.session.user) {
			name = req.session.user.username;
			userId = req.session.user.userId;
		}
		console.log("home.get", req.session.user);
		try {
			let allReviews = await reviewData.getAllReviews();
			try {
				allReviews = await reviewData.expandReviews(allReviews);
			} catch (e) {
				return res.status(500).json({ error: "Internal server error." });
			}
			return res.render("home", {
				title: "CaviarClub",
				reviews: allReviews,
				username: name,
				userId,
			});
		} catch (e) {
			return res.status(500).json({ error: "Internal server error." });
		}
	})
	.post(async (req, res) => {
		let name = undefined;
		let userId;
		if (req.session && req.session.user) {
			name = req.session.user.username;
			userId = req.session.userId;
		}
		let sort = req.body.sort;
		if (!["rating", "recent", "alphabetical"].includes(sort))
			return res.render("home", {
				title: "CaviarClub",
				error: "Invalid sort criteria.",
				username: name,
				userId,
			});
		try {
			let allReviews = await reviewData.getReviewsSorted(sort);
			try {
				allReviews = await reviewData.expandReviews(allReviews);
			} catch (e) {
				return res
					.status(500)
					.json({ error: "Internal server error.", username: name, userId });
			}
			return res.render("home", {
				title: "CaviarClub",
				reviews: allReviews,
				username: name,
			});
		} catch (e) {
			return res.status(500).json({ error: "Internal server error." });
		}
	});

export default router;
