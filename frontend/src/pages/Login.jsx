import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";
  const justRegistered = location.state?.registered;

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await login(email, password);
      setMessage("Login successful.");

      // Role-based navigation redirect or back to originally requested route
      setTimeout(() => {
        if (from === "/") {
          const role = data?.user?.role;
          if (role === "admin" || role === "super_admin") {
            navigate("/admin");
          } else if (role === "student") {
            navigate("/students");
          } else if (role === "faculty" || role === "mentor") {
            navigate("/faculty");
          } else if (role === "company") {
            navigate("/company");
          } else {
            navigate("/dashboard");
          }
        } else {
          navigate(from, { replace: true });
        }
      }, 500);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Invalid credentials or server error."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-slate-50 md:grid-cols-2">
      {/* LEFT — Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-12 text-white md:flex">
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="z-10 flex items-center gap-3.5">
          <img
            src="/rid-tech-logo.jpeg"
            alt="RID Tech Pvt Ltd"
            className="h-12 w-auto object-contain"
          />
          <span className="h-9 w-px bg-white/20" />
          <span className="text-lg font-extrabold leading-tight tracking-wide text-white">
            Internship Management System
          </span>
        </div>

        <div className="z-10">
          <h2 className="mb-6 text-5xl font-extrabold leading-tight">
            Run your internship <br />
            <span className="text-blue-400">program like a product.</span>
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-slate-300">
            Automate onboarding, attendance, weekly reports, and
            tamper-proof certificates — all from one dashboard.
          </p>
        </div>

        <p className="z-10 text-sm text-slate-500">
          © {new Date().getFullYear()} RID Tech Pvt Ltd
        </p>
      </div>

      {/* RIGHT — Form */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-xl">
          <h2 className="mb-2 text-3xl font-extrabold text-slate-900">
            Welcome back
          </h2>
          <p className="mb-6 text-slate-500">Login to continue to IMS Engine</p>

          {/* Just Registered Success Alert */}
          {justRegistered && (
            <div className="mb-4 text-center text-sm font-semibold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
              Account created successfully! Please log in.
            </div>
          )}

          {/* Feedback Message */}
          {message && (
            <p
              className={`mb-4 text-center text-sm font-semibold ${
                message.includes("successful")
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleLogin} autoComplete="off" className="space-y-5">
            {/* Hidden inputs to bypass browser aggressive autofill */}
            <input
              type="text"
              name="fakeuser"
              autoComplete="username"
              hidden
              readOnly
              value=""
            />
            <input
              type="password"
              name="fakepass"
              autoComplete="new-password"
              hidden
              readOnly
              value=""
            />

            {/* EMAIL */}
            <div>
              <label className="text-sm font-bold text-slate-700">Email</label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email_real"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-bold text-slate-700">Password</label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  name="pass_real"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white transition-colors hover:bg-blue-500 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* DIVIDER */}
            <div className="my-2 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-sm text-slate-400">or</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* GOOGLE LOGIN */}
            <button
              type="button"
              onClick={() =>
                (window.location.href = `${API_URL}/auth/google`)
              }
              className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-200 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="h-5 w-5"
              />
              Continue with Google
            </button>

            {/* SIGNUP LINK */}
            <p className="text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-blue-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}