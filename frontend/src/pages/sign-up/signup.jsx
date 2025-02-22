// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signUpSchema } from "../../schemas/signupSchema";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import axios from "axios";

// const SignupForm = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: zodResolver(signUpSchema),
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const onSubmit = async (data) => {
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await axios.post("http://localhost:8000/api/users/signup", data);

//       setLoading(false);

//       setMessage(res.data.message || " Verification Email sent on entered Email Address");
//     } catch (error) {
//       setLoading(false);
//       setMessage(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
//         {message && (
//           <p className={`text-center mb-4 p-2 rounded ${messageType === "success" ? "bg-green-100 text-green-300" : "bg-red-100 text-red-500"}`}>
//             {message}
//           </p>
//         )}
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Username Field */}
//           <div>
//             <label className="block text-gray-700 font-medium">Username</label>
//             <input
//               type="text"
//               {...register("username", { required: "Username is required" })}
//               className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
//               placeholder="Enter your username"
//             />
//             {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
//           </div>

//           {/* Email Field */}
//           <div>
//             <label className="block text-gray-700 font-medium">Email</label>
//             <input
//               type="email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" }
//               })}
//               className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
//               placeholder="Enter your email"
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//           </div>

//           {/* Password Field */}
//           <div className="relative">
//             <label className="block text-gray-700 font-medium">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
//               className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
//               placeholder="Enter your password"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-10 text-gray-600"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//             {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-yellow-600 text-white py-2 rounded-lg font-bold hover:bg-yellow-700 transition"
//             disabled={loading}
//           >
//             {loading ?  (
//               <span className="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
//             ) : (
//               "Sign Up"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;


import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../schemas/signupSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Submitting Data:", data); // Debugging

    try {
      const res = await axios.post("http://localhost:8000/api/users/signup", data);
      toast.success("✅ Verification Email sent! Check your inbox.", { autoClose: 3000 });
    } catch (error) {
      setLoading(false);
      console.log("❌ Signup Error:", error.response?.data);

      console.log("Full Error Object:", error);

      if (error.response?.data?.message === "Username already exists") {
        toast.error("⚠️ Username already exists, choose another!", { autoClose: 3000 });
      }
      
      if (error.response?.data?.message === "Email already exists") {
        toast.error("⚠️ Email already exists, try a different one!", { autoClose: 3000 });
      }
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
      <ToastContainer position="top-right" />
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username Field */}
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

          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded-lg font-bold hover:bg-yellow-700 transition flex justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
