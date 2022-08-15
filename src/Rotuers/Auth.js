import { Router } from "express";
const router = Router();
import { SignIn, SignUp } from "../Controllers/Auth";

router.post("/signup", SignUp);
router.post("/signin", SignIn);

module.exports = router;
