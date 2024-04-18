import * as h from "../../helpers.js"
import { users } from "../../config/mongoCollections"
import { ObjectId } from "mongodb";

export async function getUserFromId(id) {
    id = h.vId(id)
    let col = await users()
    let user = await col.findOne({_id:new ObjectId()})
    if(!user) throw new Error("Could not find user with that id!")
    return user
}
