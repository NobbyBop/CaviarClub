import { Router } from "express";
import { getReviewFromId } from "../../data/review/getReviewFromId.js";
import { checkId } from "../../helpers.js";
import { getRestaurantFromDishId } from "../../data/restaurant/getRestaurantFromDishId.js";
import { addLike } from "../../data/review/addLike.js";
import { removeLike } from "../../data/review/removeLike.js";
import { createComment } from "../../data/comment/createComment.js"; 

const router = Router();

router
    .route("/:reviewId")
    .get(async (req, res) => {
        let username, userId, isLoggedIn = false;
        if (req.session && req.session.user) {
            username = req.session.user.username;
            userId = req.session.user.userId;
            isLoggedIn = true; // User is logged in
        }

        let reviewId;
        try {
            reviewId = checkId(req.params.reviewId.toString());
        } catch ({ message }) {
            return res.render("error", { message, username, userId });
        }

        let review;
        try {
            review = await getReviewFromId(reviewId);
        } catch ({ message }) {
            return res.render("error", { message, username, userId });
        }

        let dishId;
        try {
            dishId = checkId(review.dishId.toString());
        } catch ({ message }) {
            return res.render("error", { message, username, userId });
        }
        let restaurant;
        try {
            restaurant = await getRestaurantFromDishId(dishId);
        } catch ({ message }) {
            return res.render("error", { message, username, userId });
        }

        // Convert MongoDB IDs to string (if using MongoDB)
        review._id = review._id.toString();
        review.dishId = review.dishId.toString();
        review.userId = review.userId.toString();
        restaurant._id = restaurant._id.toString();
        for (const i in review.comments) {
            review.comments[i].userId = review.comments[i].userId.toString();
        }

        return res.render("view/review", {
            title: `${review.dishname}: Review`,
            review,
            restaurant,
            likedClass: review.likes.includes(userId) ? "liked" : "",
            username,
            userId,
            isLoggedIn, // Pass the login status to the view
        });
    })
    .post(async (req, res) => {
        let username, userId;
        if (req.session && req.session.user) {
            username = req.session.user.username;
            userId = req.session.user.userId;
        }

        // Handle like and dislike actions
        if (req.body.like) {
            if (req.body.like == "add") {
                let newObj;
                try {
                    newObj = await addLike(req.params.reviewId, userId);
                } catch ({ message }) {
                    return res.json({ success: false, message });
                }
                return res.json({ success: true, newLikes: newObj.likes.length });
            } else {
                let newObj;
                try {
                    newObj = await removeLike(req.params.reviewId, userId);
                } catch ({ message }) {
                    return res.json({ success: false, message });
                }
                return res.json({
                    success: true,
                    newLikes: newObj.likes.length,
                });
            }
        }
        // Handle comment submission
        else if (req.body.comment) {
            try {
                await createComment(req.params.reviewId, userId, req.body.comment);
                res.redirect(`/view/review/${req.params.reviewId}`); // Redirect back to the review page
            } catch (error) {
                res.render("error", { message: error.message, username, userId });
            }
        }
    });

export default router;
