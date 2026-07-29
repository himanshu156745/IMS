import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full text-center border border-slate-200">
        <h1 className="text-5xl font-bold text-slate-800 mb-4">
          Student Internship Portal
        </h1>

        <p className="text-slate-600 text-lg mb-8">
          Manage your profile, explore internships, apply for opportunities,
          submit daily reports, track attendance, and download certificates—all
          in one place.
        </p>

        <button
          onClick={() => navigate("/students")}
          className="px-8 py-4 cursor-pointer rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-sky-500 to-violet-600 hover:from-sky-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          Go to Student Dashboard
        </button>
      </div>
    </div>
  );
};

export default LandingPage;