import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const resetPassowrd = asyncHandler(async (req, res) => {

    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json(new ApiError(400, false, "Token and new password are required", []));
    }

    const decodedToken = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET);

    const user = await User.findOne({ email: decodedToken.email });

    if (!user) {
        return res.status(400).json(new ApiError(400, false, "User not found", []));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();  

    return res.status(200).json(new ApiResponse(200, "Password reset successfully", []));
});