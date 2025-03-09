import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMagic, FaSearch, FaUtensils } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("ate");
  const [hovered, setHovered] = useState(false);

  const handleProtectedNavigation = (path) => {
    if (!accessToken) {
      toast.error("Login 1st to continue", { autoClose: 1000 });
      return;
    }
    navigate(path);
  };

  return (
    <div className="relative min-h-screen bg-[#f8f8f8] text-gray-900 overflow-hidden">
      <ToastContainer position="top-right" autoClose={1000} />
      {/* Background Magic Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.05),transparent)] pointer-events-none"
      />

      {/* Welcome Message */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center text-4xl sm:text-6xl font-extrabold mt-20 text-gray-800"
      >
        Welcome to <span className="text-yellow-600">ChefGenie</span> ✨
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-center text-lg mt-4 text-gray-700"
      >
        A genie that fulfills your{" "}
        <span className="text-yellow-600">3 wishes</span> at least!
      </motion.p>

      {/* Feature Sections with Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-8 mt-16 max-w-6xl mx-auto">
        {/* Feature 1 - Generate Dish (Protected) */}
        <div
          onClick={() => handleProtectedNavigation("/generate-ai")}
          className="p-6 bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300 border border-gray-300 cursor-pointer"
        >
          <FaMagic className="text-yellow-600 text-5xl mb-4" />
          <h2 className="text-2xl font-bold">Generate a Dish</h2>
          <p className="mt-2 text-gray-700">
            Tell the genie at least 5 food items, and it will create a magical
            dish for you!
          </p>
        </div>

        {/* Feature 2 - Find Any Recipe */}
        <div
          onClick={() => handleProtectedNavigation("/meal-finder")}
          className="p-6 bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300 border border-gray-300 cursor-pointer"
        >
          <FaSearch className="text-blue-600 text-5xl mb-4" />
          <h2 className="text-2xl font-bold">Find Any Recipe</h2>
          <p className="mt-2 text-gray-700">
            Search for any recipe you desire, and let the genie show you the
            way!
          </p>
        </div>

        {/* Feature 3 - Post Your Dish */}
        <Link to="/get-posts" className="p-6 bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300 border border-gray-300 cursor-pointer">
          <FaUtensils className="text-blue-600 text-5xl mb-4" />
          <h2 className="text-2xl font-bold">See Posted Dish</h2>
          <p className="mt-2 text-gray-700">
            Share your unique creations with the world and inspire others!{" "}
          </p>
        </Link>
        </div>
      {/* Call to Action */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="text-center mt-16"
      >
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="px-6 py-3 bg-yellow-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-yellow-700 transition-colors duration-300"
        >
          Start Cooking with Genie!
        </button>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute left-1/2 transform -translate-x-1/2 mt-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg"
          >
            Magic is in the air! ✨
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LandingPage;
