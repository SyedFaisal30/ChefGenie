import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Verification } from "../models/verification.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEmail } from "../services/verifyemail.js";

export const signup = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.statistus(400).json(new ApiError(400, "Username already exists"));
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json(new ApiError(400, "Email already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationcode = crypto.randomInt(100000, 999999).toString();

    await Verification.create({
      username,
      email,
      password: hashedPassword,
      code: verificationcode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    
    console.log("Verification Code:", verificationcode);

    await sendEmail(username, email, verificationcode);

    res
      .status(201)
      .json(new ApiResponse(201, null, "Verification code sent to your email"));
});
