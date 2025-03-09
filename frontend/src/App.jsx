import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import SignupForm from "./pages/sign-up/signup";
import SignInForm from "./pages/sign-in/signin";
import ResetPassword from "./pages/reset-password/reset-password";
import UserProfile from "./pages/user-profile/userProfile";
import GetPost from "./pages/get-posts/posts";
import MealFinder from "./pages/mealFinder/mealFinder";
import RecipeChat from "./pages/recipe-genrator/recipeChat";
import { useState, useEffect } from "react";
import axios from "axios"; // Added missing import

function App() {
  const navigate = useNavigate();
  // Add loading state to prevent premature routing
  const [isLoading, setIsLoading] = useState(true);
  // Default to not logged in for security
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshTokens = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/users/refresh-tokens`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        localStorage.setItem(
          "ate",
          response.data.data.accessTokenExpiry.toString()
        );
        localStorage.setItem(
          "rte",
          response.data.data.refreshTokenExpiry.toString()
        );
        return true;
      }
      return false;
    } catch (error) {
      console.warn("Error refreshing tokens:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/signout`, {
        withCredentials: true,
      });
      localStorage.removeItem("ate");
      localStorage.removeItem("rte");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      // Clear tokens even if API call fails
      localStorage.removeItem("ate");
      localStorage.removeItem("rte");
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const ate = localStorage.getItem("ate");
      const rte = localStorage.getItem("rte");
      const currentTime = Date.now();

      if (ate && rte) {
        if (Number(rte) > currentTime) {
          // Refresh token is valid
          if (Number(ate) - currentTime <= 5 * 60 * 1000) {
            // Access token is about to expire, refresh it
            const refreshed = await refreshTokens();
            setIsLoggedIn(refreshed);
          } else {
            // Tokens are valid
            setIsLoggedIn(true);
          }
        } else {
          // Refresh token expired
          console.warn("Refresh token expired");
          logout();
        }
      }

      // Finish loading regardless of auth status
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Set up token refresh interval
  useEffect(() => {
    // Only set up refresh interval if user is logged in
    if (!isLoggedIn) return;

    const refreshInterval = setInterval(async () => {
      try {
        const accessTokenExpiry = Number(localStorage.getItem("ate"));
        const refreshTokenExpiry = Number(localStorage.getItem("rte"));
        const currentTime = Date.now();

        if (!accessTokenExpiry || !refreshTokenExpiry) {
          // Tokens not found
          clearInterval(refreshInterval);
          setIsLoggedIn(false);
          return;
        }

        if (refreshTokenExpiry <= currentTime) {
          // Refresh token expired, log out
          console.warn("Refresh token expired. Logging out.");
          logout();
          clearInterval(refreshInterval);
          return;
        }

        if (accessTokenExpiry - currentTime <= 5 * 60 * 1000) {
          // Access token about to expire, refresh it
          const refreshed = await refreshTokens();
          if (!refreshed) {
            logout();
            clearInterval(refreshInterval);
          }
        }
      } catch (error) {
        console.error("Error in token refresh interval:", error);
        logout();
        clearInterval(refreshInterval);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [isLoggedIn]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="mt-18 min-h-screen bg-[#f8f8f8] flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="mt-18 min-h-screen bg-[#f8f8f8]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/user-profile"
            element={isLoggedIn ? <UserProfile /> : <Navigate to="/signin" />}
          />
          <Route path="/get-posts" element={<GetPost />} />
          <Route
            path="/meal-finder"
            element={isLoggedIn ? <MealFinder /> : <Navigate to="/signin" />}
          />
          <Route
            path="/generate-ai"
            element={isLoggedIn ? <RecipeChat /> : <Navigate to="/signin" />}
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
