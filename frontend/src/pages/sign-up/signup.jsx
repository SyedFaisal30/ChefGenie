import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../schemas/signupSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom"; // Import Link for navigation

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("signup"); // "signup" or "verify"
  const [userData, setUserData] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/users/signup", data);
      setUserData(data);
      setStep("verify");
      toast.success("✅ Verification Email Sent! Check your inbox.", { autoClose: 3000 });
    } catch (error) {
      console.error("❌ Signup Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Signup failed", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async () => {
    if (!verificationCode) {
      toast.error("⚠️ Please enter the verification code!", { autoClose: 3000 });
      return;
    }
    
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/users/verify", {
        username: userData.username,
        code: verificationCode,
      });

      toast.success("🎉 Account Verified Successfully!", { autoClose: 3000 });
      setStep("success");
    } catch (error) {
      console.error("❌ Verification Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Verification failed", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
      <ToastContainer position="top-right" />
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {step === "signup" && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Username</label>
                <input
                  type="text"
                  {...register("username")}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
                  placeholder="Enter your username"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div className="relative">
                <label className="block text-gray-700 font-medium">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-2 rounded-lg font-bold hover:bg-yellow-700 transition flex justify-center"
                disabled={loading}
              >
                {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span> : "Sign Up"}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-4 text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                to="/signin" // Replace with your sign-in route
                className="text-yellow-600 font-semibold hover:underline"
              >
                Sign In
              </Link>
            </div>
          </>
        )}

        {step === "verify" && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Verify Account</h2>
            <p className="text-center text-gray-600 mb-4">
              Enter the verification code sent to <strong>{userData?.email}</strong>
            </p>

            <div className="space-y-4">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 outline-none text-center"
                placeholder="Enter verification code"
              />

              <button
                onClick={handleVerification}
                className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition flex justify-center"
                disabled={loading}
              >
                {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span> : "Verify"}
              </button>
            </div>
          </>
        )}

        {step === "success" && (
          <>
            <h2 className="text-2xl font-bold text-center text-green-600 mb-6">✅ Verified</h2>
            <p className="text-center text-gray-600 mb-4">
              Your account has been successfully verified. You can now sign in.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupForm;