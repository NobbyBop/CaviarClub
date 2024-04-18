import { Router } from "express";
import { reviewData } from "../data/index.js";
const router = Router();

router.route("/").get(async (req, res) => {
    try{
        let allReviews = await reviewData.getAllReviews(0, 20)
        return res.render("home",{title:"CaviarClub", reviews:allReviews})
    } catch(e){
        return res.status(500).json({error:"Internal server error."})
    }
    
});

export default router;
