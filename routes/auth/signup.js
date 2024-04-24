import { userData } from "../../data/index.js";
import * as h from "../../helpers.js"
import { Router } from "express";
const router = Router();

router.route("/")
.get(async (req, res) => {
    res.render("auth/signup", {title:"Sign up"})
})
.post(async (req, res) => {
    let s = req.body
    try {
      s.username = h.checkUser(s.username);
      s.email = h.checkEmail(s.email)
      s.password = h.checkPass(s.password);
      if (s.confirmPassword !== s.password) throw "Passwords do not match.";
    } catch (e) {
      return res.status(400).render("auth/signup", {title:"Sign up", error:e, prevSub:s})
    }
      try{
        let result = await userData.createUser(s.email,
            s.username,
            s.password,
            false
        )
        if(!result) return res.status(500).render("error", {title:"Error", error:"Internal Server Error."})
        res.render("auth/login")
      } catch(e) {
        return res.status(400).render("auth/signup", {title:"Sign up", error:e, prevSub:s})
      }
    });

export default router;
