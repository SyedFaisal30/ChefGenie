import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.model.js";
import mongoose from "mongoose";

export const updatePost = asyncHandler( async (req, res) => {
    const { postId } = req.params;
    const { title, ingredients, instructions, tags } = req.body;
    const userId = req.user._id;

    console.log("POST ID ",postId, " USER ID ", userId);
    
    const post = await Post.findOne({
        _id: new mongoose.Types.ObjectId(postId), 
        author: new mongoose.Types.ObjectId(userId),       
    });     
    if (!post) {
        return res.status(404).json(new ApiError(404, false, "Post not found or you are not authorized", []));
    }

    post.title = title || post.title;
    post.ingredients = ingredients || post.ingredients;
    post.instructions = instructions || post.instructions;
    post.tags = tags || post.tags;

    await post.save();

    return res.status(200).json(new ApiResponse(200, "Post updated successfully", post));
}) 