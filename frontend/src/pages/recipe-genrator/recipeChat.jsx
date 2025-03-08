import { useState, useEffect } from "react";
import axios from "axios";
import { FaPaperPlane, FaTrash } from "react-icons/fa";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import NavigationButtons from "../../components/NavigationButtons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RecipeChat() {
  const [prompt, setPrompt] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ username: "" });

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) setUser({ username });
  }, []);

  useEffect(() => {
    if (user.username) fetchUserRecipes();
  }, [user.username]);

  const fetchUserRecipes = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/users/get-ai-recipes/${user.username}`
      );
      setRecipes(data?.data || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleGenerateRecipe = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/users/generate-ai",
        {
          prompt,
          username: user.username,
        }
      );
      setRecipes((prev) => [data.data, ...prev]);
      setSelectedRecipe(data.data);
      setPrompt("");
    } catch (error) {
      console.error("Recipe generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `http://localhost:8000/api/users/delete-recipe/${recipeId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== recipeId)
        );
        setSelectedRecipe(null);
        toast.success("Recipe deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Failed to delete recipe.");
    }
  };

  return (
    <div className="h-[90vh]  bg-[#f8f8f8] flex flex-col items-center justify-center p-4">
      <NavigationButtons />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className=" flex bg-[#f8f8f8]">
        <div
          className={`fixed left-0 top-16 h-[calc(100%-4rem)] bg-white shadow-lg p-4 transition-transform duration-300 ${
            sidebarOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full"
          }`}
        >
          {sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-5 right-2 text-xl"
            >
              <GoSidebarExpand />
            </button>
          )}

          <div className="space-y-2 overflow-y-auto ">
            <h2 className="text-xl font-bold mb-4">Generated Recipes</h2>

            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className="p-3 bg-gray-200 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-300"
                >
                  <h3
                    className="font-semibold"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    {recipe.title}
                  </h3>
                  <button
                    onClick={() => handleDeleteRecipe(recipe._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recipes yet</p>
            )}
          </div>
        </div>

        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-20 left-4 text-xl"
          >
            <GoSidebarCollapse />
          </button>
        )}
      </div>
      {/* Recipe Display Section */}
      <div className="overflow-y-auto flex-1 flex flex-col items-center p-6">
        {selectedRecipe ? (
          <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">{selectedRecipe.title}</h3>
            <h4 className="text-xl font-semibold">🥬 Ingredients:</h4>
            <div className="flex flex-wrap gap-2 my-3">
              {selectedRecipe.ingredients?.length > 0 ? (
                selectedRecipe.ingredients.map((ingredient, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No ingredients available.</p>
              )}
            </div>
            <h4 className="text-xl font-semibold">📜 Instructions:</h4>
            <div className="mt-2 space-y-2">
  {selectedRecipe?.instructions ? (
    Array.isArray(selectedRecipe.instructions) ? (
      selectedRecipe.instructions.map((step, idx) => (
        <p key={`${selectedRecipe._id}-step-${idx}`} className="text-gray-700">
          <strong>Step {idx + 1}:</strong> {step}
        </p>
      ))
    ) : (
      selectedRecipe.instructions.split("\n").map((step, idx) => (
        <p key={`${selectedRecipe._id}-step-${idx}`} className="text-gray-700">
          <strong>Step {idx + 1}:</strong> {step}
        </p>
      ))
    )
  ) : (
    <p className="text-gray-500">No instructions available.</p>
  )}
</div>

          </div>
        ) : (
          <p className="text-gray-500 text-lg text-center">
            🤖 Enter ingredients or a dish name, and I'll generate a recipe for
            you! 🍽️✨
          </p>
        )}
      </div>
      <div className="w-full max-w-2xl flex items-center bg-white p-3 rounded-lg shadow-md mt-6">
        <input
          type="text"
          placeholder="Enter ingredients or dish name..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 p-2 border rounded-md outline-none"
        />
        <button
          onClick={handleGenerateRecipe}
          disabled={loading}
          className="ml-3 p-2 bg-yellow-500 text-white rounded-lg w-12 h-12 flex items-center justify-center"
        >
          {loading ? (
            <span className="animate-spin border-4 border-t-transparent border-white rounded-full w-6 h-6"></span>
          ) : (
            <FaPaperPlane className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}