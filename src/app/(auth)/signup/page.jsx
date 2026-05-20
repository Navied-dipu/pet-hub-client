"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiUser, FiImage, FiUserPlus } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return Math.min(strength, 5);
  };

  const strengthLabels = ["", "Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const strengthColors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4"];

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords don't match");
      setLoading(false);
      return;
    }

    const passwordError = validatePassword(user.password);
    if (passwordError) {
      toast.error(passwordError);
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image || undefined,
      });

      if (data) {
        toast.success("Account created successfully!");
        router.push("/");
      }
      if (authError) {
        toast.error(authError.message || "An error occurred during signup");
      }
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Failed to sign in with Google");
      setGoogleLoading(false);
    }
  };

  const inputStyle = {
    background: "rgba(15, 23, 42, 0.6)",
    border: "1px solid rgba(148, 163, 184, 0.15)",
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = "#06b6d4";
    e.target.style.boxShadow = "0 0 0 3px rgba(6, 182, 212, 0.1)";
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = "rgba(148, 163, 184, 0.15)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: "500px",
            height: "500px",
            top: "-150px",
            left: "-150px",
            background: "radial-gradient(circle, #8b5cf6, transparent)",
          }}
        />
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: "400px",
            height: "400px",
            bottom: "-100px",
            right: "-100px",
            background: "radial-gradient(circle, #06b6d4, transparent)",
          }}
        />
      </div>

      <div className="w-full max-w-md relative" style={{ zIndex: 1 }}>
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              boxShadow: "0 8px 32px rgba(139, 92, 246, 0.3)",
            }}
          >
            <FaPaw className="text-white text-2xl" />
          </div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{
              background: "linear-gradient(135deg, #e2e8f0, #ffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Create Account
          </h1>
          <p className="text-slate-400 text-sm">
            Join PeThuB and find your perfect companion
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(30, 41, 59, 0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(148, 163, 184, 0.1)",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={handleGoogleSignin}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer mb-6"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              color: "#e2e8f0",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.4)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {googleLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <FcGoogle className="text-xl" />
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px" style={{ background: "rgba(148, 163, 184, 0.15)" }} />
            <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">or</span>
            <div className="flex-1 h-px" style={{ background: "rgba(148, 163, 184, 0.15)" }} />
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-300"
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-300"
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Photo URL <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  name="image"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-300"
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  placeholder="Create a strong password"
                  disabled={loading}
                  className="w-full pl-11 pr-12 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-300"
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onChange={(e) => setPasswordStrength(getPasswordStrength(e.target.value))}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {/* Password strength indicator */}
              {passwordStrength > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background:
                            level <= passwordStrength
                              ? strengthColors[passwordStrength]
                              : "rgba(148, 163, 184, 0.15)",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: strengthColors[passwordStrength] }}>
                    {strengthLabels[passwordStrength]}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  required
                  minLength={6}
                  placeholder="Confirm your password"
                  disabled={loading}
                  className="w-full pl-11 pr-12 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-300"
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-xs"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-slate-500 mt-1">
              By creating an account, you agree to our{" "}
              <span className="text-cyan-400 cursor-pointer hover:underline">Terms of Service</span>{" "}
              and{" "}
              <span className="text-cyan-400 cursor-pointer hover:underline">Privacy Policy</span>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(139, 92, 246, 0.4)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(139, 92, 246, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <FiUserPlus className="text-base" />
                  Create Account
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center mt-8 text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold transition-colors"
            style={{ color: "#8b5cf6" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8b5cf6")}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;