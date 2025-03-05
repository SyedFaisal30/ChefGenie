import { Link } from "react-router-dom";
import { FaRobot, FaUtensils, FaClipboardList } from "react-icons/fa";

const NavigationButtons = () => {
  return (
    <div className="flex justify-center">
      <div className="flex gap-4 bg-yellow-500 p-3 rounded-full shadow-lg">
        {/* Generate AI Button */}
        <Link to="/generate-ai" className="flex items-center gap-2 bg-white text-gray-800 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition">
          <FaRobot size={20} />
          Generate AI
        </Link>

        {/* Meal Finder Button */}
        <Link to="/meal-finder" className="flex items-center gap-2 bg-white text-gray-800 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition">
          <FaUtensils size={20} />
          Meal Finder
        </Link>

        {/* Posts Button */}
        <Link to="/get-posts" className="flex items-center gap-2 bg-white text-gray-800 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition">
          <FaClipboardList size={20} />
          Posts
        </Link>
      </div>
    </div>
  );
};

export default NavigationButtons;
