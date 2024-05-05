import { ObjectId } from "mongodb";
import { reviews, restaurants } from "../../config/mongoCollections.js";
import { getReviewsFromDishId } from "./getReviewsFromDishId.js";

export const removeReview = async (reviewId) => {
    let reviewCollection = await reviews();
    let restaurantCollection = await restaurants();
    
    try {
        const deletionResult = await reviewCollection.findOneAndDelete({ 
            _id: new ObjectId(reviewId)
        });
        if (!deletionResult) console.log("Failed to delete reviews.");

        const reviewsByDish = await getReviewsFromDishId(deletionResult.dishId.toString());
    
        let newAverage = 0;
        if (reviewsByDish.length !== 0) 
            newAverage = reviewsByDish.map(review => review.rating).reduce((sum, rating) => sum + rating, 0) / reviewsByDish.length;
    
        const restaurantCollection = await restaurants();
        await restaurantCollection.findOneAndUpdate(
            { "dishes._id": deletionResult.dishId },
            { $set: { "dishes.$.averageRating": newAverage } }
        );
    
    } catch (error) {
        console.error("Error deleting reviews:", error);
    }

}
