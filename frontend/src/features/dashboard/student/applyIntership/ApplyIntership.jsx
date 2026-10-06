import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import { useAuth } from "@/hooks/useAuth";
// import { useAuth } from "../../../../context/AuthContext";

export default function ApplyInternship() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [internship, setInternship] = useState(null);

  // Form Fields
  const [coverLetter, setCoverLetter] = useState("");
  const [availability, setAvailability] = useState("Immediate");
  const [resumeUrl, setResumeUrl] = useState(user?.resume || "");

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const res = await axiosInstance.get(`/internships/${id}`);
        setInternship(res.data.data || res.data);
      } catch (err) {
        setError("Failed to fetch internship details.");
      } finally {
        setLoading(false);
      }
    };
    fetchInternship();
  }, [id]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);
      await axiosInstance.post(`/applications`, {
        internshipId: id,
        coverLetter,
        availability,
        resumeUrl,
      });
      navigate("/student/applications");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Apply for {internship?.title || "Internship"}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          {internship?.companyName} • {internship?.location}
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Step Navigation Indicators */}
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex items-center space-x-2 ${
                step === i ? "text-emerald-600 font-bold" : "text-gray-400"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  step === i
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {i}
              </span>
              <span className="hidden sm:inline">
                {i === 1 ? "Review" : i === 2 ? "Cover Letter" : "Confirm"}
              </span>
            </div>
          ))}
        </div>

        {/* Form Body Steps */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Personal Information Review
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
              <div>
                <label className="text-xs text-gray-500">Full Name</label>
                <p className="font-medium text-gray-800">{user?.name || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Email</label>
                <p className="font-medium text-gray-800">{user?.email || "N/A"}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resume Link
              </label>
              <input
                type="url"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="https://drive.google.com/your-resume"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Why should you be hired?
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter
              </label>
              <textarea
                rows={5}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write about your relevant skills and motivation..."
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm bg-white"
              >
                <option value="Immediate">Immediate (Within 2-3 days)</option>
                <option value="1 Week">Within 1 Week</option>
                <option value="2 Weeks">Within 2 Weeks</option>
                <option value="1 Month">1 Month</option>
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Final Confirmation
            </h2>
            <div className="bg-emerald-50 p-4 rounded-xl text-emerald-900 text-sm space-y-2">
              <p>
                <strong>Role:</strong> {internship?.title}
              </p>
              <p>
                <strong>Stipend:</strong> {internship?.stipend || "Unpaid"}
              </p>
              <p>
                <strong>Duration:</strong> {internship?.duration || "N/A"}
              </p>
            </div>
            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="confirmCheck"
                className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
              />
              <label htmlFor="confirmCheck" className="text-sm text-gray-700">
                I confirm that all provided details are accurate.
              </label>
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 sm:px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm sm:text-base font-semibold transition-all"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 1 && !resumeUrl.trim()) {
                  setError("Please enter a valid resume URL.");
                  return;
                }
                setError(null);
                setStep(step + 1);
              }}
              className="px-4 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg transition-all sm:hover:scale-105"
            >
              Next Step
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (!document.getElementById("confirmCheck")?.checked) {
                  setError("Please check the confirmation box");
                  return;
                }
                handleSubmit();
              }}
              disabled={submitting}
              className="px-4 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg transition-all sm:hover:scale-105 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}