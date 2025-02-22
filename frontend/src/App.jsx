import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import LandingPage from "./components/LandingPage"
import SignupForm from "./pages/sign-up/signup"
function App() {

  return (
    <>
      <Header/>
      <div className="mt-18 min-h-screen bg-[#f8f8f8]">
        <Routes>
          <Route path="/" element={<LandingPage/>}/>

          <Route path="/signup" element={<SignupForm/>}/>


        </Routes>

      <Footer/>
      </div>
    </>
  )
}

export default App
