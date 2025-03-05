import { useState, useEffect } from "react";
import NavigationButtons from "../../components/NavigationButtons";
import axios from "axios";

const categories = [
  "Beef", "Chicken", "Dessert", "Lamb", "Miscellaneous", "Pasta",
  "Seafood", "Side", "Starter", "Vegan", "Vegetarian", "Breakfast", "Goat"
];

const MealFinder = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    if (selectedCategory) {
      fetchMeals();
    }
  }, [selectedCategory]);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      );
      setMeals(response.data.meals);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMealDetails = async (mealName) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
      );
      setSelectedMeal(response.data.meals[0]);
    } catch (error) {
      console.error("Error fetching meal details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
        <NavigationButtons/>
      <h1 className="text-3xl font-bold text-center mb-6">
        🍽️ ChefGenie - Recipe Finder
      </h1>

      {!selectedMeal ? (
        <>
          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 text-sm rounded-md bg-yellow-500 text-white font-bold hover:bg-yellow-600 transition ${
                  selectedCategory === category ? "opacity-50" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Show Default Message When No Category is Selected */}
          {!selectedCategory && (
            <p className="text-center text-gray-500 text-lg">
              🔍 Select a category to get food items
            </p>
          )}

          {/* Show Animated Loading */}
          {loading && (
            <div className="flex justify-center items-center h-20">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent"></div>
            </div>
          )}

          {/* Show Meals List */}
          <div className="min-h-screen grid grid-cols-2 md:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition"
                onClick={() => fetchMealDetails(meal.strMeal)}
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <p className="text-center font-bold mt-2">{meal.strMeal}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Meal Details View */
        <div className="bg-white shadow-lg rounded-lg p-6">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setSelectedMeal(null)}
        >
          🔙 Back to Meals
        </button>
        
        <h2 className="text-2xl font-bold text-center">{selectedMeal.strMeal}</h2>
      
        {/* Fixing Image Stretch Issue */}
        <div className="flex justify-center">
          <img
            src={selectedMeal.strMealThumb}
            alt={selectedMeal.strMeal}
            className="max-w-sm w-full h-auto object-contain rounded-lg mt-4"
          />
        </div>
      
          {/* Display Ingredients Horizontally */}
          <h3 className="text-lg font-bold mt-4">🥦 Ingredients:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {[...Array(20).keys()].map((i) => {
              const ingredient = selectedMeal[`strIngredient${i + 1}`];
              const measure = selectedMeal[`strMeasure${i + 1}`];
              return ingredient ? (
                <span key={i} className="bg-gray-200 px-3 py-1 rounded-lg text-sm">
                  {measure} {ingredient}
                </span>
              ) : null;
            })}
          </div>

          {/* Display Instructions Step-by-Step */}
          <h3 className="text-lg font-bold mt-4">📝 Instructions:</h3>
          <div className="mt-2 space-y-2">
            {selectedMeal.strInstructions.split(". ").map((step, index) =>
              step.trim() ? (
                <p key={index}>
                  <strong>Step {index + 1}:</strong> {step}.
                </p>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealFinder;
