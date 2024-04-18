import {userData} from "../index.js"
import { reviews } from "../../config/mongoCollections.js"
import * as h from "../../helpers.js"
import { ObjectId } from "mongodb"
export async function getReviewsFromUser(id) {
    id = h.checkId(id)
    let user = await userData.getUserFromId(id)
    if(!user) throw Error("There is no user with that id.")
    let col = await reviews()
    let reviewList = await col.find({userId: new ObjectId(id)}).toArray()
    if(!reviewList) return []
    else return reviewList
}