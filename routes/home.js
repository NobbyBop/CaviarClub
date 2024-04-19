import { Router } from "express";
import { reviewData, userData, dishData, restaurantData } from "../data/index.js";
const router = Router();

router
.route("/")
.get(async (req, res) => {
    try{
        let allReviews = await reviewData.getAllReviews()
        for(let r of allReviews){
            try{
                let user = await userData.getUserFromId(String(r.userId))
                let dish = await dishData.getDishFromId(String(r.dishId))
                let rest = await restaurantData.getRestaurantFromId(String(r.restaurantId))
                r.username = user.username
                r.dishname = dish.name
                r.restname - rest.name
            } catch(e) {
                return res.status(500).json({error:"Internal server error."})
            }
        }
        return res.render("home",{title:"CaviarClub", reviews:allReviews})
    } catch(e){
        return res.status(500).json({error:"Internal server error."})
    }
    
})
.post(async (req, res) => {
    let sort = req.body.sort
    if(!["rating", "recent", "alphabetical"].includes(sort)) return res.render("home",{title:"CaviarClub", reviews:allReviews, error:"Invalid sort criteria."})
    try{
        let allReviews = await reviewData.getReviewsSorted(sort)
        for(let r of allReviews){
            try{
                let user = await userData.getUserFromId(String(r.userId))
                let dish = await dishData.getDishFromId(String(r.dishId))
                let rest = await restaurantData.getRestaurantFromId(String(r.restaurantId))
                r.username = user.username
                r.dishname = dish.name
                r.restname - rest.name
            } catch(e) {
                return res.status(500).json({error:"Internal server error."})
            }
        }
        return res.render("home",{title:"CaviarClub", reviews:allReviews})
    } catch(e){
        return res.status(500).json({error:"Internal server error."})
    }
});

export default router;
