import { Router } from "express";
import { signup } from "../controllers/signup.controller.js";
import { validateSignup } from "../middlewares/validateSignup.js";
import { verify } from "../controllers/verify.controller.js";
import { signin } from "../controllers/signin.controller.js";
import { signout } from "../controllers/signout.controller.js";
import { createpost } from "../controllers/createpost.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router()
 router.route("/signup").post(validateSignup, signup);

 router.route("/verify").post(verify);

 router.route("/signin").post(signin);

 router.route("/signout").post(signout);

 router.route("/create-post",verifyJWT,createpost);

export default router;