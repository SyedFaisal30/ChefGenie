import { Link } from "react-router-dom";
import { FaRobot, FaUtensils, FaClipboardList } from "react-icons/fa";

const NavigationButtons = () => {
  return (
    <div className="flex justify-center px-4">
      <div className="flex flex-wrap sm:flex-row gap-3 bg-yellow-500 p-3 rounded-full shadow-lg mb-3 w-full max-w-lg justify-center">
        {/* Generate AI Button */}
        <Link
          to="/generate-ai"
          className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition text-sm w-full sm:w-auto justify-center"
        >
          <FaRobot size={18} />
          Generate AI
        </Link>

        {/* Meal Finder Button */}
        <Link
          to="/meal-finder"
          className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition text-sm w-full sm:w-auto justify-center"
        >
          <FaUtensils size={18} />
          Meal Finder
        </Link>

        {/* Posts Button */}
        <Link
          to="/get-posts"
          className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition text-sm w-full sm:w-auto justify-center"
        >
          <FaClipboardList size={18} />
          Posts
        </Link>
      </div>
    </div>
  );
};

export default NavigationButtons;
