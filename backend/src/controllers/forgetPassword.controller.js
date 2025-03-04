import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendForgetPasswordEmail } from "../services/forgetPasswordEmail.js";

export const forgetPassword = asyncHandler (async (req, res) => {

    const { email }= req.body;

    if ( !email ) {
        return res.status(400).json(new ApiError(400, false, "Email is required", []));
    };

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json(new ApiError(400, false, "User not found", []));
    }

    const resetToken = jwt.sign(
        {  email: user.email }, 
        process.env.RESET_PASSWORD_TOKEN_SECRET, 
        { expiresIn: "15m" }
    );

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    await sendForgetPasswordEmail(user.email, resetLink);

    return res.status(200).json(new ApiResponse(200, true, "Password reset link sent to your email", []));
});