import { Router } from "express";
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

	console.log(req.session.dishId, req.session.restaurantId);

	return res.sendStatus(200);
});
router.route("/new").get(async (req, res) => {});

export default router;
