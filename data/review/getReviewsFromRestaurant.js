import {restaurantData} from "../index.js"
import { reviews } from "../../config/mongoCollections.js"
import * as h from "../../helpers.js"
import { ObjectId } from "mongodb"
export async function getReviewsFromRestaurant(id) {
    id = h.checkId(id)
    let restaurant = await restaurantData.getRestaurantFromId(id)
    if(!restaurant) throw Error("There is no restaurant with that id.")
    let col = await reviews()
    let reviewList = await col.find({restaurantId: new ObjectId(id)}).toArray()
    if(!reviewList) return []
    else return reviewList
}
