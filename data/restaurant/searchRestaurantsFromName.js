import {restaurants} from "../../config/mongoCollections.js"
import * as h from "../../helpers.js"
export async function searchRestaurantsFromName(name) {
    name = h.checkString(name)
    let col = await restaurants()
    let matches = await col.find({ name: { $regex: `${name}`, $options: 'i'} }).toArray()
    if(!matches) return []
    else return matches
}
