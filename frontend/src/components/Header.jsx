import { useState, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom"; 

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

  // Signout function
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/users/signout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      console.log("Signout Response:", data);

      if (res.ok) {
        localStorage.removeItem("username");
        localStorage.removeItem("accessToken");

        window.location.reload();
      } else {
        console.error("Signout failed:", data.message);
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
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
                Hii {username}
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
              <div className="absolute mt-2 w-30 bg-white shadow-lg border border-gray-200 rounded-lg right-1">
                <Link
                  to="/user-profile" 
                  className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 p-2 rounded-md transition"
                >
                  <FaUser className="text-blue-500" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 p-2 rounded-md transition w-full"
                >
                  <FaSignOutAlt className="text-red-500" />
                  <span>Logout</span>
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