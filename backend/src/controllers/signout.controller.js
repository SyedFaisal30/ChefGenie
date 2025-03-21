import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const signout = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          false,
          "No refresh token found, user already signed out",
          []
        )
      );
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          false,
          "Invalid refresh token, user already signed out",
          []
        )
      );
  }

  user.refreshToken = null;
  await user.save();

  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  res.status(200).json(new ApiResponse(200, "User signed out successfully"));
});
