import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Recipe } from "../models/recipe.model.js";

export const deleteAiRecipe = asyncHandler (async (req, res) => {

    const {recipeId} = req.params;
    const userId = req.user.username; 

    const recipe = await Recipe.findOne({ _id: recipeId, user: userId }); 

    if(!recipe) {
        return res.status(400).json(new ApiError(400, false, "Existing recipe not found", []));
    }

    await recipe.deleteOne();

    return res.status(200).json(new ApiResponse(200, "Recipe deleted successfully"));
})