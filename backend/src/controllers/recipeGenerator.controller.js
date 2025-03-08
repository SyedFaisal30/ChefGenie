import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Recipe } from "../models/recipe.model.js";

export const generateRecipe = asyncHandler(async (req, res) => {
  const { prompt, username } = req.body;

  if (!prompt) {
    return res.status(400).json(new ApiError(400, false, "Prompt required"));
  }

  if (!username) {
    return res.status(400).json(new ApiError(400, "User Name required"));
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const query = `
        Act as a professional chef. Analyze the following user prompt: "${prompt}".
        - If the user provides ingredients, suggest a dish that can be made from them.
        - If adding more ingredients improves the dish, recommend them.
        - If the user asks for a specific dish, provide a structured recipe.
        - Intructions should be step wise.
        - Avoid Spelling mistakes and typos.
        
        The recipe should be formatted as JSON with:
        {
            "title": "Dish Name",
            "ingredients": ["ingredient1", "ingredient2", "ingredient3"],
            "instructions": ["Step 1", "Step 2", "Step 3", "Step 4"]
        }
    `;

  const result = await model.generateContent(query);
  const responseText = result.response.text();
  const recipe = JSON.parse(responseText);

  const newRecipe = new Recipe({
    title: recipe.title,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions.join("\n"),
    user: username,
  });

  await newRecipe.save();
  return res
    .status(200)
    .json(new ApiResponse(200, recipe, "Generated Recipe Successfully"));
});
