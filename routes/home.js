import { Router } from "express";
import { reviewData, userData, dishData, restaurantData } from "../data/index.js";
const router = Router();

router
.route("/")
.get(async (req, res) => {
    try{
        let allReviews = await reviewData.getAllReviews()
        try{
            allReviews = await reviewData.expandReviews(allReviews)
        } catch(e) {
            return res.status(500).json({error:"Internal server error."})
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
        try{
            allReviews = await reviewData.expandReviews(allReviews)
        } catch(e) {
            return res.status(500).json({error:"Internal server error."})
        }
        return res.render("home",{title:"CaviarClub", reviews:allReviews})
    } catch(e){
        return res.status(500).json({error:"Internal server error."})
    }
    
});

export default router;
