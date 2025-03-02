import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import LandingPage from "./components/LandingPage"
import SignupForm from "./pages/sign-up/signup"
import SignInForm from "./pages/sign-in/signin"
import UserProfile from "./pages/user-profile/userProfile"
import GetPost from "./pages/get-posts/posts"
function App() {

  return (
    <>
      <Header/>
      <div className="mt-18 min-h-screen bg-[#f8f8f8]">
        <Routes>

          <Route path = "/" element = {<LandingPage/>}/>

          <Route path = "/signup" element = {<SignupForm/>}/>

          <Route path = "/signin" element = {<SignInForm/>}/>

          <Route path = "/user-profile" element = {<UserProfile/>}/>

          <Route path = "/get-posts" element = {<GetPost/>}/>
          
        </Routes>

      <Footer/>
      </div>
    </>
  )
}

export default App
