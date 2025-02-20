import { asyncHandler } from "../utils/asyncHandler.js";
import { jwt, verify } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {

    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

    if(!token){
        return res.status(401).json(new ApiError(401, "Please login to continue"));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if(!user){
        return res.status(401).json(new ApiError(401, "Invalid Token"));
    }

    req.user = user;
    return next();
})