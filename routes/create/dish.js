import { Router } from "express";
const router = Router();

router.route("/").get(async (req, res) => {});
router.route("/new").get(async (req, res) => {});

export default router;
