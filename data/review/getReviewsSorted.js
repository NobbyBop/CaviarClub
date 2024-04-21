import { reviews } from "../../config/mongoCollections.js";
import * as h from "../../helpers.js"

export async function getReviewsSorted(sort){
    if(!["rating", "recent", "alphabetical"].includes(sort)) throw Error("Invalid sort criteria.")
    let col = await reviews()
    let allReviews = []
    if(sort === "rating"){
        allReviews = await col.find({}).sort({rating:-1}).toArray()
    } else if(sort === "alphabetical"){
        allReviews = await col.find({}).sort({title:1}).toArray()
    }
    else if(sort === "recent"){
        allReviews = await col.find({}).sort({date:-1}).toArray()
    } else {
        throw Error("I have no idea how this happened.")
    }
    if(!allReviews) throw Error("Could not get all reviews.")
    return allReviews
}