"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (data) {
        toast.success("Logged in successfully!");
        router.push("/");
      }

      if (error) {
        toast.error(error.message || "Invalid email or password");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
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

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: "400px",
            height: "400px",
            top: "-100px",
            right: "-100px",
            background: "radial-gradient(circle, #06b6d4, transparent)",
          }}
        />
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: "300px",
            height: "300px",
            bottom: "-50px",
            left: "-50px",
            background: "radial-gradient(circle, #8b5cf6, transparent)",
          }}
        />
      </div>

      <div className="w-full max-w-md relative" style={{ zIndex: 1 }}>
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{
              background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
              boxShadow: "0 8px 32px rgba(6, 182, 212, 0.3)",
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
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm">
            Sign in to continue your pet adoption journey
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
          {/* Google Sign In Button */}
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
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
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
                  style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    border: "1px solid rgba(148, 163, 184, 0.15)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#06b6d4";
                    e.target.style.boxShadow = "0 0 0 3px rgba(6, 182, 212, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(148, 163, 184, 0.15)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <button type="button" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="Enter your password"
                  disabled={loading}
                  className="w-full pl-11 pr-12 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-300"
                  style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    border: "1px solid rgba(148, 163, 184, 0.15)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#06b6d4";
                    e.target.style.boxShadow = "0 0 0 3px rgba(6, 182, 212, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(148, 163, 184, 0.15)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer mt-1"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                boxShadow: "0 4px 15px rgba(6, 182, 212, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(6, 182, 212, 0.4)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(6, 182, 212, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <FiLogIn className="text-base" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center mt-8 text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold transition-colors"
            style={{ color: "#06b6d4" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#22d3ee")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#06b6d4")}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;