import { Router } from "express";
import { signup } from "../controllers/signup.controller.js";
import { validateSignup } from "../middlewares/validateSignup.js";
import { verify } from "../controllers/verify.controller.js";
import { signin } from "../controllers/signin.controller.js";
import { refreshToken } from "../controllers/refreshtoken.controller.js";
import { signout } from "../controllers/signout.controller.js";
import { forgetPassword } from "../controllers/forgetPassword.controller.js";
import { resetPassowrd } from "../controllers/resetPassword.controller.js";
import { createpost } from "../controllers/createpost.controller.js";
import { getUserPosts } from "../controllers/getuserpost.controller.js";
import { updatePost } from "../controllers/updatepost.controller.js";
import { deletePost } from "../controllers/deletepost.controller.js";
import { getPost } from "../controllers/getpost.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import { verifyPrompt } from "../controllers/verifyPrompt.controller.js";
import { generateRecipe } from "../controllers/recipeGenerator.controller.js";
import { getUserAiRecipes } from "../controllers/getAiRecipes.controller.js";
import { deleteAiRecipe } from "../controllers/deleteAiRecipe.controller.js";

const router = Router()
 router.route("/signup").post(validateSignup, signup);

 router.route("/verify").post(verify);

 router.route("/signin").post(signin);

 router.route("/refresh-tokens").post(verifyJWT,refreshToken);

 router.route("/signout").post(signout);

 router.route("/create-post").post(verifyJWT,createpost);

 router.route("/get-user-post").get(verifyJWT,getUserPosts);

 router.route("/update-post/:postId").put(verifyJWT,updatePost);

 router.route("/delete-post/:postId").delete(verifyJWT,deletePost);

 router.route("/get-posts").get(getPost);

 router.route("/forget-password").post(forgetPassword);

 router.route("/reset-password").post(resetPassowrd);

 router.route("/verify-prompt").post(verifyPrompt);

 router.route("/generate-ai").post(generateRecipe);

 router.route("/get-ai-recipes/:username").get(getUserAiRecipes);

 router.route("/delete-recipe/:recipeId").delete(verifyJWT,deleteAiRecipe);

export default router;