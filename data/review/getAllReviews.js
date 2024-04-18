import {reviews} from "../../config/mongoCollections.js";
import * as h from "../../helpers.js"

export async function getAllReviews(skipNum, limitNum) {
    /*
    Optional parameters skipNum and limitNum.
    Allow you to get a certain number of reviews.
    Could be useful for multiple pages.
    */
    let col = await reviews()

    try{
        skipNum = h.vInt(skipNum)
        limitNum = h.vInt(limitNum)
        let allReviews = col.find({}).skip(skipNum).limit(limitNum).toArray()
        return allReviews
    }
    catch(e){
        let allReviews = col.find({}).toArray()
        return allReviews
    }
    
}



