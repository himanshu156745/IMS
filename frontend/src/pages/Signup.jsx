import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Briefcase } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");

    // Validate role
    if (!role) {
      setMessage("Please select your role.");
      return;
    }

    if (!["student", "company"].includes(role)) {
      setMessage("Only Student or Company registration is available.");
      return;
    }

    // Validate email
    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Backend password requirement:
    // 12-128 characters
    // lowercase + uppercase + number + special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,128}$/;

    if (!passwordRegex.test(password)) {
      setMessage(
        "Password must be 12–128 characters and contain uppercase, lowercase, number and special character."
      );
      return;
    }

    setLoading(true);

    try {
      // Full Name is intentionally not sent because the current
      // backend registration API accepts email, password and role.
      await axiosInstance.post("/users/register", {
        email: email.trim().toLowerCase(),
        password,
        role,
      });

      setMessage("Signup successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login", {
          state: {
            registered: true,
          },
        });
      }, 800);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* Background Image */}
      <img
        src="https://plus.unsplash.com/premium_photo-1661347859297-859b8ae1d7c5?w=1200&auto=format&fit=crop&q=80"
        alt="Team collaborating in an office"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/55" />

      {/* Decorative Shapes */}
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-50/60 blur-3xl" />

      {/* Main Container */}
      <div className="z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-6 flex items-center justify-center gap-3.5">
          <img
            src="/rid-tech-logo.jpeg"
            alt="RID Tech Pvt Ltd"
            className="h-12 w-auto object-contain"
          />

          <span className="h-9 w-px bg-slate-200" />

          <span className="text-base font-extrabold uppercase leading-tight tracking-wide text-slate-900 sm:text-lg">
            Internship Management System
          </span>
        </div>

        {/* Signup Card */}
        <div className="rounded-2xl border border-slate-100 bg-white/95 p-8 shadow-xl backdrop-blur-sm">
          <h1 className="mb-1 text-center text-3xl font-black text-slate-900">
            Create account
          </h1>

          <p className="mb-6 text-center text-slate-500">
            Join IMS Engine to get started
          </p>

          {/* Message */}
          {message && (
            <p
              className={`mb-4 rounded-lg p-3 text-center text-sm font-semibold ${
                message.toLowerCase().includes("successful")
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSignup} autoComplete="off">
            {/* Full Name */}
            <div className="mb-4">
              <label className="text-sm font-bold text-slate-700">
                Full Name
              </label>

              <div className="relative mt-1.5">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="text-sm font-bold text-slate-700">
                Email
              </label>

              <div className="relative mt-1.5">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="text-sm font-bold text-slate-700">
                Role
              </label>

              <div className="relative mt-1.5">
                <Briefcase className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-slate-700 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                >
                  <option value="">Select your role</option>
                  <option value="student">Student</option>
                  <option value="company">Company</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="text-sm font-bold text-slate-700">
                Password
              </label>

              <div className="relative mt-1.5">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              <p className="mt-1 text-xs text-slate-400">
                12+ characters with uppercase, lowercase, number and special
                character.
              </p>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="text-sm font-bold text-slate-700">
                Confirm Password
              </label>

              <div className="relative mt-1.5">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>
            </div>

            {/* Create Account */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-sm text-slate-400">
                or
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google Signup */}
            <button
              type="button"
              onClick={() => {
                window.location.href = `${API_URL}/auth/google`;
              }}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3.5 font-bold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="h-5 w-5"
              />

              Continue with Google
            </button>

            {/* Login */}
            <p className="mt-5 text-center text-sm text-slate-500">
              Already have an account?{" "}

              <Link
                to="/login"
                className="font-bold text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}