/*
This function takes in an array of reviews and appends
    restaurant name
    restaurant id
    dish name
    user name
*/
import { userData, dishData, restaurantData } from "../../data/index.js"
export async function expandReviews(allReviews){
    for(let r of allReviews){
        try{
            let user = await userData.getUserFromId(String(r.userId))
            let dish = await dishData.getDishFromId(String(r.dishId))
            let rest = await restaurantData.getRestaurantFromDishId(String(r.dishId))
            r.username = user.username
            r.dishName = dish.name
            r.restaurantName = rest.name
            r.restaurantId = String(rest._id)
        } catch(e) {
            throw new Error("Could not expand reviews.")
        }
    }
    return allReviews
}