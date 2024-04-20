import { restaurants } from "../../config/mongoCollections.js";
import * as h from "../../helpers.js"
import { ObjectId } from "mongodb";
export async function getRestaurantFromDishId(dishId){
    dishId = h.checkId(dishId)
    let col = await restaurants()
    let match = await col.findOne({dishes: {$elemMatch: {_id: new ObjectId(dishId)}}});
    if(!match) throw new Error("The dish could not be mapped to a restaurant.")
    return match
}