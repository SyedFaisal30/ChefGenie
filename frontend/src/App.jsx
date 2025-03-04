import { Routes, Route, useNavigate, Navigate } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import LandingPage from "./components/LandingPage"
import SignupForm from "./pages/sign-up/signup"
import SignInForm from "./pages/sign-in/signin"
import ResetPassword from "./pages/reset-password/reset-password"
import UserProfile from "./pages/user-profile/userProfile"
import GetPost from "./pages/get-posts/posts"
import { useState, useEffect } from "react"
function App() {
  const navigate = useNavigate();

  const refreshTokens = async () => {
    try {
        const response = await axios.get(
            "http://localhost:8000/api/users/refresh-tokens",
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
        }
    } catch (error) {
        console.warn("Error refreshing tokens:");
    }
  }

  const logout = async () => {
    try {
        await axios.get(
            "http://localhost:8000/api/users/signout",
            { withCredentials: true }
        );
        navigate("/")
    } catch (error) {
        console.error("Error logging out");
    }
};

  useEffect(() => {
        const refreshInterval = setInterval(async () => {
        try {
            const accessTokenExpiry = Number(localStorage.getItem("ate"));
            const refreshTokenExpiry = Number(localStorage.getItem("rte"));
            const currentTime = Date.now();

            if (refreshTokenExpiry <= currentTime) {
                // If the refresh token has expired, log out
                console.warn("Refresh token expired. Logging out.");
                logout();
                return; // Exit the function
            }

            if (accessTokenExpiry - currentTime <= 5 * 60 * 1000) {
                await refreshTokens();
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            logout();
        }
    }, 10 * 60 * 1000);
    return () => clearInterval(refreshInterval); // Clean up on component unmount
}, []);

const [isLoggedIn, setIsLoggedIn] = useState();

useEffect(() => {
    const ate = localStorage.getItem("ate");
    const rte = localStorage.getItem("rte");
    if (ate && rte) {
        setIsLoggedIn(true);
    }
}, []);


  return (
    <>
      <Header/>
      <div className="mt-18 min-h-screen bg-[#f8f8f8]">
        <Routes>

          <Route path = "/" element = {<LandingPage/>}/>

          <Route path = "/signup" element = {<SignupForm/>}/>

          <Route path = "/signin" element = {<SignInForm/>}/>

          < Route path = "/user-profile" element = {isLoggedIn ?  <UserProfile/> : <Navigate to="/" />}/>

          <Route path = "/get-posts" element = {<GetPost/>}/>

          <Route path = "/reset-password" element = {<ResetPassword/>}/>
        </Routes>

      <Footer/>
      </div>
    </>
  )
}

export default App
