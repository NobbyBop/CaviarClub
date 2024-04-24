import { reviews } from "../../config/mongoCollections.js";
import { ObjectId } from "mongodb";

// Define the function to fetch reviews by user ID
export const getReviewsFromUser = async (userId) => {
    // Convert string userId to MongoDB ObjectId
    const objUserId = new ObjectId(userId);
    
    // Get the reviews collection from the database
    const reviewsCollection = await reviews();
    
    // Query the reviews written by the user
    const userReviews = await reviewsCollection.find({ user_id: objUserId }).toArray();
    
    if (!userReviews) throw new Error("No reviews found for this user.");
    
    // Return the fetched reviews
    return userReviews;
};
