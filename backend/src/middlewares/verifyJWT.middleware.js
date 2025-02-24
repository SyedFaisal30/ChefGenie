import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    console.log("verifyJWT middleware");
    

    const token = req.cookies?.accessToken ||
    (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    console.log("Extracted Token:", token);

    if(!token){
        return res.status(401).json(new ApiError(401, false, "Please login to continue", []));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decodedToken);

    const user = await User.findById(decodedToken.userId).select("-password -refreshToken");

    if(!user){
        return res.status(401).json(new ApiError(401, "Invalid Token"));
    }

    req.user = user;
    return next();
})