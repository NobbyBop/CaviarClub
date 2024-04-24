import { Router } from "express";
import { getUserFromId } from "../../data/user/getUserFromId.js";
import { getReviewsFromUser } from "../../data/user/getReviewsFromUser.js";

const router = Router();

router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await getUserFromId(userId);
        const reviews = await getReviewsFromUser(userId);
        res.render("user", { user, reviews });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
