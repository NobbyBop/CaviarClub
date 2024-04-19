import { Router } from "express";
import { reviewData, userData, dishData } from "../data/index.js";
const router = Router();

router.route("/").get(async (req, res) => {
    let allReviews = []
    try{
        let allReviews = await reviewData.getAllReviews(0, 20)
        for(let r of allReviews){
            try{
                let user = userData.getUserFromId(String(r.userId))
                let dish = dishData.getDishFromId(String(r.dishId))
                r.username = user.name
                r.dishname = dish.name
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
