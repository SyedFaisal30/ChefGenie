import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.model.js";

export const getPost = asyncHandler(async (req, res) => {

    const posts = await Post.find().sort({ createdAt: -1 });

    if(!posts || posts.length === 0) {
        return res.status(404).json(new ApiError(404, false, "No posts found", []));
    }

    return res.status(200).json(new ApiResponse(200, "Post fetched successfully", posts));
})