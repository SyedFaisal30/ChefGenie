import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
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
        tags: {
            type: [String],
            default: [],
            required: [true, "Tags are required"],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Author is required"],
        },
    },
    { timestamps: true}
);

export const Post = mongoose.model("Post", postSchema);