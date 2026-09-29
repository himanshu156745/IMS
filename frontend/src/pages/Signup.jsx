import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Signup successful.");
        login(data.user, data.token);
        setName("");
        setEmail("");
        setPassword("");
        setTimeout(() => navigate("/dashboard"), 1200);
      } else {
        setMessage(data.message || "Signup failed.");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <img
        src="https://plus.unsplash.com/premium_photo-1661347859297-859b8ae1d7c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVldGluZ3N8ZW58MHx8MHx8fDA%3D"
        alt="Team collaborating in an office"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-white/55" />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-50/60 blur-3xl" />

      <div className="z-10 w-full max-w-md">
        {/* BRAND */}
        <div className="mb-6 flex items-center justify-center gap-3.5">
          <img src="/rid-tech-logo.jpeg" alt="RID Tech Pvt Ltd" className="h-12 w-auto object-contain" />
          <span className="h-9 w-px bg-slate-200" />
          <span className="text-base font-extrabold uppercase leading-tight tracking-wide text-slate-900 sm:text-lg">
            Internship Management System
          </span>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white/95 p-8 shadow-xl backdrop-blur-sm">
          <h1 className="mb-1 text-center text-3xl font-black text-slate-900">Create account</h1>
          <p className="mb-6 text-center text-slate-500">Join IMS Engine to get started</p>

          {message && (
            <p
              className={`mb-4 text-center text-sm font-semibold ${
                message.includes("successful") ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSignup} autoComplete="off">
            {/* Hidden fields to block browser autofill */}
            <input type="text" name="fake_user" autoComplete="username" hidden readOnly value="" />
            <input type="password" name="fake_pass" autoComplete="new-password" hidden readOnly value="" />

            {/* NAME */}
            <div className="mb-4">
              <label className="text-sm font-bold text-slate-700">Full Name</label>
              <div className="relative mt-1.5">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="name_real"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label className="text-sm font-bold text-slate-700">Email</label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email_real"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="mb-6">
              <label className="text-sm font-bold text-slate-700">Password</label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  name="pass_real"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white transition-colors hover:bg-blue-500 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            {/* DIVIDER */}
            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-sm text-slate-400">or</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* LOGIN LINK */}
            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}