import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export const verifyPrompt = asyncHandler(async (req, res) => {

    const { prompt } = req.body; 

    if (!prompt) {
        return res.status(400).json(new ApiError(400, false, "Prompt required"))
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const schema = {
        type: SchemaType.OBJECT,
        description: "Prompt validation",
        properties: {
            isPromptValid: {
                type: SchemaType.BOOLEAN,
                description:
                    "Check whetether the prompt is valid or not",
            },
        },
        required: ["isPromptValid"],
    };

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema, 
        },
    });

    const pr = `Evaluate the following prompt: "${prompt}". Return a boolean value indicating whether the prompt is valid for generating a recipe. A valid prompt should clearly describe a dish or ingredients. Ensure the prompt is relevant and suitable for recipe generation. Also ignore some spelling mistakes here and there`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const isPromptValid = JSON.parse(responseText);

    return res.status(200).json(new ApiResponse(200, isPromptValid, "Check whether Prompt is correct or not"));
})
