import {reviews} from "../../config/mongoCollections.js";
import { userData, dishData } from "../index.js";
import * as h from "../../helpers.js"

export async function getAllReviews(skipNum, limitNum) {
    /*
    Optional parameters skipNum and limitNum.
    Allow you to get a certain number of reviews.
    Could be useful for multiple pages.
    */
    let col = await reviews()
    let allReviews = []
    try{
        skipNum = h.vInt(skipNum)
        limitNum = h.vInt(limitNum)
        allReviews = await col.find({}).skip(skipNum).limit(limitNum).toArray()
    }
    catch(e){
        allReviews = await col.find({}).toArray()
    }
    if(!allReviews) throw new Error("Could not get all reviews!")
    return allReviews
}



