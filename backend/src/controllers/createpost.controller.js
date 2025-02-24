import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

export const createpost = asyncHandler(async (req, res) => {
    const { title, ingredients, instructions, tags } = req.body;
    console.log("createpost route hitting");

    if (!title || typeof title !== "string" || title.trim().length < 3) {
        return res.status(400).json(new ApiError(400, "Title must be at least 3 characters long"));
    }

    if (!Array.isArray(ingredients) || ingredients.length === 0 || !ingredients.every(ing => typeof ing === "string" && ing.trim() !== "")) {
        return res.status(400).json(new ApiError(400, "Ingredients must be an array of non-empty strings"));
    }

    if (tags && (!Array.isArray(tags) || !tags.every(tag => typeof tag === "string" ))) {
        return res.status(400).json(new ApiError(400, "Tags must be an array of strings"));
    }

    const post = await Post.create({
        title: title.trim(),
        ingredients: ingredients.map(ing => ing.trim()),
        instructions: instructions.trim(),
        tags: tags || [],
        author: req.user._id,
    });

    return res.status(200).json(new ApiResponse(200, post, "Post created successfully"));
});