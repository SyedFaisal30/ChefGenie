import { Router } from "express";
import { signup } from "../controllers/signup.controller.js";
import { verify } from "../controllers/verify.controller.js";
import { signin } from "../controllers/signin.controller.js";
import { signout } from "../controllers/signout.controller.js";

const router = Router()
 router.route("/signup").post(signup);

 router.route("/verify").post(verify);

 router.route("/signin").post(signin);

 router.route("/signout").post(signout);

export default router;