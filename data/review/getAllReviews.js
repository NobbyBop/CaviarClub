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
        allReviews = col.find({}).skip(skipNum).limit(limitNum).toArray()
    }
    catch(e){
        allReviews = col.find({}).toArray()
    }
    if(!allReviews) throw new Error("Could not get all reviews!")

    /*
    Most displaying of reviews requires username and dish name, so I
    include them in the object here before returning. 
    */
    for(let review of allReviews){
        try{
            let user = await userData.getUserFromId(String(review.userId))
            review.username = user.username
        } catch(e) {
            throw new Error("Invalid user data in review!")
        }
        try{
            let dish = await userData.getDishFromId(String(review.dishId))
            review.dishname = dish.name
        } catch(e) {
            throw new Error("Invalid dish data in review!")
        }
    }
    return allReviews
}



