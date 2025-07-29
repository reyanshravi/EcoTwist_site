"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [step, setStep] = useState("register"); // "register" or "otp"
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6); // Limit to 6 digits
    setOtp(value);
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    const [firstName, ...rest] = formData.name.trim().split(" ");
    const lastName = rest.join(" ");
    try {
      const res = await fetch("api/user/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserId(data.userId); // Store userId for OTP verification
        setStep("otp"); // Switch to OTP step
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.log(err);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    try {
      const res = await fetch("/api/user/auth/verifyOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        // Automatically log in after OTP verification
        const loginRes = await fetch("/api/user/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok) {
          localStorage.setItem("token", loginData.token);
          window.location.href = "/dashboard";
        } else {
          setError(loginData.error || "Login failed after verification.");
        }
      } else {
        setError(data.error || "Invalid OTP.");
      }
    } catch (err) {
      setError("An error occurred during verification.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md transform transition-all duration-300 hover:shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            {step === "register"
              ? "Join the Green Journey"
              : "Verify Your Account"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {step === "register"
              ? "Create an account to unlock eco-friendly gifting."
              : "Enter the OTP sent to your email."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={step === "register" ? handleRegister : handleVerifyOtp}
            className="space-y-4"
          >
            {step === "register" ? (
              <>
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-teal-200 focus:border-teal-400 focus:ring-teal-400"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-teal-200 focus:border-teal-400 focus:ring-teal-400"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full border-teal-200 focus:border-teal-400 focus:ring-teal-400 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-teal-500 text-white hover:bg-teal-600 transition-colors duration-300"
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="otp"
                    className="text-sm font-medium text-gray-700"
                  >
                    OTP
                  </label>
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    maxLength={6}
                    className="w-full border-teal-200 focus:border-teal-400 focus:ring-teal-400"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-teal-500 text-white hover:bg-teal-600 transition-colors duration-300"
                >
                  Verify OTP
                </Button>
              </div>
            )}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-gray-600">
            {step === "register"
              ? "Already have an account?"
              : "Didn’t receive OTP? "}
            <Link
              href={step === "register" ? "/login" : "/signup"}
              className="text-teal-600 hover:underline"
            >
              {step === "register" ? "Log In" : "Resend OTP"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
