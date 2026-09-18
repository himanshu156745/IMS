import { useNavigate } from "react-router-dom";

export default function WelcomeSection() {
  const navigate = useNavigate()
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 mb-6 shadow-xl overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Welcome Back, Rahul 👋
          </h1>
          <p className="text-lg text-blue-100 leading-relaxed">
            Track your internships, attendance, reports, and applications from one place.
          </p>
          <div className="flex gap-4 mt-6">
            <button onClick={()=>navigate("/students/applications")} className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl transition-all hover:scale-105">
              View Applications
            </button>
            <button onClick={()=>navigate("/students/reports")} className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all">
              Submit Report
            </button>
          </div>
        </div>

        {/* Abstract Illustration */}
        <div className="hidden lg:flex justify-center items-center">
          <div className="relative w-full h-64">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 backdrop-blur-sm rounded-3xl rotate-12 animate-float"></div>
            <div className="absolute bottom-0 left-12 w-48 h-48 bg-white/20 backdrop-blur-sm rounded-3xl -rotate-12 animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/30 backdrop-blur-sm rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(12deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(-12deg); }
          50% { transform: translateY(-20px) rotate(-12deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 0.5s;
        }
      `}</style>
    </div>
  );
}
