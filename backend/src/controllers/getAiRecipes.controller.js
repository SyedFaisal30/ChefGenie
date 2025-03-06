import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Recipe } from "../models/recipe.model.js";

export const getUserAiRecipes = asyncHandler(async (req, res) => {
    const username = req.params.username;

    if(!username){
        return res.status(400).json(new ApiError(400, false, "Username is required", []));
    }

    const recipes = await Recipe.find({ username });

    if(!recipes || recipes.length === 0){
        return res.status(404).json(new ApiError(404, false, "No recipes found", []));
    }

    return res.status(200).json(new ApiResponse(200, "User recipes fetched successfully", recipes)); 
})