import { useState, useEffect } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import NavigationButtons from "../../components/NavigationButtons";

export default function RecipeChat() {
  const [prompt, setPrompt] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ username: "" });

  // Load username from localStorage
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) setUser({ username });
  }, []);

  // Fetch recipes when user.username updates
  useEffect(() => {
    if (user.username) fetchUserRecipes();
  }, [user.username]);

  const fetchUserRecipes = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/users/get-ai-recipes/${user.username}`
      );
      setRecipes(data.data);
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

  return (
    <div className="h-screen bg-[#f8f8f8] flex flex-col items-center justify-center p-4">
      <NavigationButtons />
      <div className="flex h-screen bg-[#f8f8f8]">
        {/* Sidebar */}
        <div
          className={`fixed left-0 top-16 h-[calc(100%-4rem)] bg-white shadow-lg p-4 transition-transform duration-300 ${
            sidebarOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full"
          }`}
        >
          {/* Collapse Button (Hide When Sidebar is Closed) */}
          {sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-5 right-2 text-xl"
            >
              <GoSidebarExpand />
            </button>
          )}

          <div className="space-y-2 overflow-y-auto h-[85%]">
            <h2 className="text-xl font-bold mb-4">Generated Recipes</h2>

            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <h3 className="font-semibold">{recipe.title}</h3>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recipes yet</p>
            )}
          </div>
        </div>

        {/* Sidebar Toggle (Show Only When Sidebar is Closed) */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-20 left-4 text-xl"
          >
            <GoSidebarCollapse />
          </button>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          {/* Show Selected Recipe */}
          {selectedRecipe ? (
            <div className="w-full max-w-full bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">
                {selectedRecipe.title}
              </h3>

              {/* Ingredients Section */}
              <h4 className="text-xl font-semibold flex items-center">
                🥬 Ingredients:
              </h4>
              <div className="flex flex-wrap gap-2 my-3">
                {selectedRecipe.ingredients.map((ingredient, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>

              {/* Instructions Section */}
              {/* Instructions Section */}
              <h4 className="text-xl font-semibold flex items-center">
                📜 Instructions:
              </h4>
              <div className="mt-2 space-y-2">
                {typeof selectedRecipe.instructions === "string" ? (
                  selectedRecipe.instructions.split("\n").map((step, idx) => (
                    <p key={idx} className="text-gray-700">
                      <strong>Step {idx + 1}:</strong> {step}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500">No instructions available.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-lg text-center">
              🤖 Enter ingredients or a dish name, and I'll tell you what to
              make! 🍽️✨
            </p>
          )}

          {/* Chat Input Box */}
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
              className="ml-3 p-2 bg-yellow-500 text-white rounded-lg"
            >
              {loading ? "Generating..." : <FaPaperPlane />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
