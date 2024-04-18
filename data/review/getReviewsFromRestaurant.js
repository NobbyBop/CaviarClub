import {restaurantData} from "../index.js"
import { reviews } from "../../config/mongoCollections"
import * as h from "../../helpers.js"
import { ObjectId } from "mongodb"
export async function getReviewsFromRestaurant(id) {
    id = h.checkId(id)
    let restaurant = await restaurantData.getRestaurantFromId(id)
    if(!restaurant) throw Error("There is no restaurant with that id.")
    let col = await reviews()
    let reviews = await col.find({restaurantId: new ObjectId(id)}).toArray()
    if(!reviews) return []
    else return reviews
}
