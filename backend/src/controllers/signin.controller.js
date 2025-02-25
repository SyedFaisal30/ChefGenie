import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signin = asyncHandler(async (req, res) => {
        console.log("signin route hitting");
        
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json(new ApiError(400, false, "Email and password are required", []));
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json(new ApiError(400, false, "User not found", []));
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(404).json(new ApiError(400, false, "Invalid password", []));
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json(new ApiResponse(200, "User signed in successfully", { accessToken, refreshToken, username: user.username  }));
});

