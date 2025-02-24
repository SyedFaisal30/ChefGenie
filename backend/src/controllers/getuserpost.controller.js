import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.model.js";

export const getUserPosts = asyncHandler ( async ( req, res ) => {

    const userId = req.user._id;

    const posts = await Post.find({ author: userId });

    if (!posts || posts.length === 0) {
        return res.status(404).json(new ApiError(404, false,"No posts found ", []));
    }

    return res.status(200).json(new ApiResponse(200, "User posts fetched successfully", posts));
})
