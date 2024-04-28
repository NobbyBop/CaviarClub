import { Router } from "express";
const router = Router();

router.route('/').get(async (req, res) => {
    if(req.session) req.session.destroy()
    return res.render("auth/logout", {title:"Logout"})
  });

export default router;