import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const CreatePostForm = ({ addPost }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const accessToken = localStorage.getItem("ate");

      if (!accessToken) {
        throw new Error("Authentication error. Please log in again.");
      }

      const postData = {
        title: data.title.trim(),
        ingredients: data.ingredients.split(",").map((item) => item.trim()),
        instructions: data.instructions.trim(),
        tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
      };

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/users/create-post`,
        postData,
        {
          withCredentials: true,
        }
      );

      addPost(response.data.data);

      reset();
    } catch (error) {
      console.error(
        "Post creation failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-center text-yellow-600 mb-4">
        Create a New Post
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
            placeholder="Enter title"
            {...register("title", {
              required: "Title is required",
              minLength: 3,
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 font-medium">
            Ingredients (comma-separated)
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
            placeholder="E.g. Chicken, Salt, Pepper"
            {...register("ingredients", {
              required: "Ingredients are required",
            })}
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm">{errors.ingredients.message}</p>
          )}
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-gray-700 font-medium">
            Instructions
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
            placeholder="Enter instructions"
            {...register("instructions", {
              required: "Instructions are required",
            })}
          />
          {errors.instructions && (
            <p className="text-red-500 text-sm">
              {errors.instructions.message}
            </p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 font-medium">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
            placeholder="E.g. Healthy, Vegetarian"
            {...register("tags")}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 rounded-lg font-bold hover:bg-yellow-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
