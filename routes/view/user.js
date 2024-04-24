import { Router } from "express";
import { getUserFromId } from "../../data/user/getUserFromId.js";
import { getReviewsFromUser } from "../../data/review/getReviewsFromUser.js";

const router = Router();

router.get("/:userId", async (req, res) => {
    let name = undefined
    if(req.session && req.session.user) name = req.session.user.username
    try {
        const userId = req.params.userId;
        const user = await getUserFromId(userId);
        const reviews = await getReviewsFromUser(userId);
        return res.render("view/user", { user, reviews, username: name });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
