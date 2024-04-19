import {restaurants} from "../../config/mongoCollections.js"
import * as h from "../../helpers.js"
export async function searchDishesFromName(name) {
    name = h.checkString(name)
    let col = await restaurants()
    let allRestaurants = await col.find({}).toArray()
    if(!allRestaurants) throw Error("Could not get all restaurants!")
    let matches = []
    for(let r of allRestaurants){
        for(let d of r.dishes){
            if(d.name.toLowerCase().includes(name.toLowerCase())) matches.push(d)
        }
    }
    return matches
}
