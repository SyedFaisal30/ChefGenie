import { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa6";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null); // Simulating authentication state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulating user authentication (Replace this with your actual auth logic)
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user")); // Example: fetching from localStorage
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white bg-opacity-70 shadow-md z-50 transition-all ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">ChefGenie</h1>

        {/* User Info / Sign In */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <FaRegUser className="text-gray-700 text-lg" />
              <span className="text-gray-700 text-sm">{user.username}</span>
            </div>
          ) : (
            <button className="text-red-500 hover:text-red-700 text-sm">
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
