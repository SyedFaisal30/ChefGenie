import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.model.js";

export const deletePost = asyncHandler(async (req, res) => {
    console.log("Delete post route hit");

    const { postId } = req.params;
    const userId = req.user._id; 

    const post = await Post.findOne({ _id: postId, author: userId });

    if (!post) {
        return res.status(404).json(new ApiError(404, "Post not found or you are not authorized"));
    }

    await post.deleteOne();

    return res.status(200).json(new ApiResponse(200, "Post deleted successfully"));
});
