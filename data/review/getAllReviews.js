import {reviews} from "../../config/mongoCollections.js";
export async function getAllReviews() {
    let col = await reviews()
    allReviews = col.find({})
    return getAllReviews
}



