import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // Update the path if needed

const users = [
  { id: "admin123", password: "adminpass", role: "admin" },
  { id: "doc456", password: "docpass", role: "doctor" },
  { id: "lab789", password: "labpass", role: "labs" },
  { id: "acc321", password: "accpass", role: "accounts" },
];

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({ id: "", password: "" });
  const [errors, setErrors] = useState({ id: "", password: "", login: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", login: "" }));
  };

  const validate = () => {
    let valid = true;
    const tempErrors = { id: "", password: "", login: "" };

    if (!formData.id.trim()) {
      tempErrors.id = "User ID is required.";
      valid = false;
    }

    if (!formData.password.trim()) {
      tempErrors.password = "Password is required.";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const user = users.find(
      (u) => u.id === formData.id && u.password === formData.password
    );

    if (user) {
      setUser(user);
      navigate(`/${user.role}-dashboard`);
    } else {
      setErrors((prev) => ({
        ...prev,
        login: "Invalid credentials. Please try again.",
      }));
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f0f0f0] px-4">
  <div className="flex flex-col md:flex-row items-center gap-10 bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl">

    {/* Logo Section */}
    <div className="flex items-center justify-center w-full md:w-1/3">
      <img src="/logo.png" alt="logo" className=" h-auto object-contain" />
    </div>

    {/* Form Section */}
    <form onSubmit={handleSubmit} className="w-full md:w-2/3 space-y-6">
      <h2 className="text-2xl font-semibold text-[#141414]">Sign Up & Get Access</h2>

      {/* User ID */}
      <div className="flex flex-col gap-1">
        <label htmlFor="id" className="text-sm font-medium text-gray-700">User ID</label>
        <input
          type="text"
          name="id"
          id="id"
          value={formData.id}
          onChange={handleChange}
          className={`w-full px-4 py-2 border-b  outline-none ${
            errors.id ? "border-red-500" : "border-[#dcdc3c]"
          }`}
        />
        {errors.id && <span className="text-red-500 text-sm">{errors.id}</span>}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1 relative">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-2 border-b  outline-none ${
            errors.password ? "border-red-500" : "border-[#dcdc3c]"
          }`}
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-9 text-sm text-blue-600 hover:underline cursor-pointer"
        >
          {showPassword ? "Hide" : "Show"}
        </span>
        {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-[#141414] text-white py-2 rounded-md hover:bg-[#dcdc3c] hover:text-black transition duration-300"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
    {errors.login && <div className="text-red-500 text-sm mt-4">{errors.login}</div>}

    {users && users.length > 0 &&  users.map((user) => (
      <div key={user.id} className=" top-20 flex flex-col  gap-4 text-gray-500 text-sm mt-2">
        <p className="mb-1">User ID: {user.id}</p>  
        <p className="mb-1">Password: {user.password}</p>
        <p className="mb-1">Role: {user.role}</p>
    </div>
    ))}
</div>

  );
}
