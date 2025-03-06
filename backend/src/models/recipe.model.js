import mongoose, { Schema } from "mongoose";

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        ingredients: {
            type: [String],
            required: [true, "Ingredients are required"],
        },
        instructions: {
            type: String,
            required: [true, "Instructions are required"],
        },
        user: {
            type: String,
            required: [true, "User is required"],
        }
    },
    { timestamps: true }
)

export const Recipe = mongoose.model("Recipe", recipeSchema);