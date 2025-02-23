import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername); 
    };

    checkUser();
    window.addEventListener("storage", checkUser); 

    return () => window.removeEventListener("storage", checkUser);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    setUsername(null); 
    window.location.reload(); 
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">ChefGenie</h1>

        <div className="flex items-center gap-6 relative">
          <div className="relative">
            {username ? (
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-gray-800 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition-all"
              >
                <FaUserCircle className="text-lg" />
                {username}
              </button>
            ) : (
              <a
                href="/signin"
                className="flex items-center gap-2 text-gray-800 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition-all"
              >
                <FaUserCircle className="text-lg" />
                Sign In
              </a>
            )}

            {isDropdownOpen && username && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded-lg p-3">
                <p className="text-gray-800 font-semibold">{username}</p>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-500 hover:text-red-700 text-sm mt-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
