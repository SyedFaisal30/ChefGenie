import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Verification } from "../models/verification.model.js";

export const verify = asyncHandler(async (req, res, next) => {
        const { username, code } = req.body;

        if( !username || !code ){
            return res.status(400).json(new ApiError(400, false, "Username and verification code are required", []));
        }

        const userVerification = await Verification.findOne({ username, code });

        if (!userVerification) {
            return res.status(400).json(new ApiError(400,false , "Invalid verification code", []));
        }

        if ( userVerification.expiresAt < new Date() ) {
            return res.status(400).json(new ApiError(400,false , "Verification code has expired", []));   
        }

        const newUser = await User.create({
            username:userVerification.username,
            email:userVerification.email,
            password:userVerification.password
        });

        await Verification.deleteOne({ username });

        return res.status(200).json(new ApiResponse(200, newUser, "User created successfully"));    
});