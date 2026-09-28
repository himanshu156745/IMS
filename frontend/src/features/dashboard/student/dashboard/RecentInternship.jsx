import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X, MapPin, Clock, Wallet, User, Mail, FileText, CheckCircle2, Circle,
} from "lucide-react";

const internshipDetails = {
  role: "Full Stack Developer",
  company: "Tata Consultancy Services",
  location: "Remote",
  duration: "6 Months",
  stipend: "₹25,000/mo",
  progress: 65,
  startDate: "Jan 15, 2024",
  endDate: "Jul 15, 2024",
  description:
    "As a Full Stack Developer Intern at TCS, you will work closely with the product engineering team to design, build and ship features across the stack — from React based front-ends to Node.js micro-services.",
  responsibilities: [
    "Develop and maintain scalable web applications using React and Node.js",
    "Collaborate with UI/UX designers to implement responsive interfaces",
    "Write clean, well tested and documented code",
    "Participate in daily stand-ups and sprint planning sessions",
  ],
  skills: ["React", "Node.js", "TypeScript", "MongoDB", "REST APIs", "Git"],
  mentor: {
    name: "Ananya Sharma",
    designation: "Senior Engineering Manager",
    email: "ananya.sharma@tcs.com",
  },
  documents: [
    { name: "Offer Letter.pdf", type: "PDF" },
    { name: "NDA Agreement.pdf", type: "PDF" },
    { name: "Onboarding Guide.docx", type: "DOCX" },
  ],
  timeline: [
    { label: "Application Accepted", date: "Dec 20, 2023", done: true },
    { label: "Onboarding Completed", date: "Jan 15, 2024", done: true },
    { label: "Mid-term Review", date: "Apr 15, 2024", done: true },
    { label: "Final Evaluation", date: "Jul 10, 2024", done: false },
    { label: "Internship Completion", date: "Jul 15, 2024", done: false },
  ],
};

function InternshipDetailsModal({ onClose }) {
  const d = internshipDetails;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* Modal - center me */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col animate-[popIn_0.2s_ease-out] overflow-hidden">
        {/* Right side cross button */}
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100 shadow-sm transition-all hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-7">
          {/* Header */}
          <div className="flex items-start gap-4 pr-10">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TCS
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{d.role}</h2>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{d.company}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                  <MapPin className="w-3.5 h-3.5" /> {d.location}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">
                  <Clock className="w-3.5 h-3.5" /> {d.duration}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">
                  <Wallet className="w-3.5 h-3.5" /> {d.stipend}
                </span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">Internship Progress</span>
              <span className="font-semibold text-blue-600">{d.progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                style={{ width: `${d.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
              <span>Started: {d.startDate}</span>
              <span>Ends: {d.endDate}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
              About this Internship
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{d.description}</p>
          </div>

          {/* Responsibilities */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Key Responsibilities
            </h3>
            <ul className="space-y-2">
              {d.responsibilities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Skills Involved
            </h3>
            <div className="flex flex-wrap gap-2">
              {d.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Mentor */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Mentor
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{d.mentor.name}</p>
                <p className="text-xs text-gray-500">{d.mentor.designation}</p>
                <p className="text-xs text-blue-600 flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3" /> {d.mentor.email}
                </p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Documents
            </h3>
            <div className="space-y-2">
              {d.documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between px-4 py-3 border border-gray-100 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700 font-medium">{doc.name}</span>
                  </div>
                  <span className="text-xs text-gray-400 font-semibold">{doc.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default function RecentInternship() {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Current Internship</h2>
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
          Active
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TCS
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Full Stack Developer</h3>
            <p className="text-sm text-gray-600 mb-2">Tata Consultancy Services</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                Remote
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">
                6 Months
              </span>
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">
                Stipend: ₹25,000/mo
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Internship Progress</span>
            <span className="font-semibold text-blue-600">65%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-[65%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <span>Started: Jan 15, 2024</span>
            <span>Ends: Jul 15, 2024</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setShowDetails(true)}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            View Details
          </button>
          <button
            onClick={() => navigate("/students/reports")}
            className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Submit Report
          </button>
        </div>
      </div>

      {/* Modal - View Details click karne pe center me aata hai */}
      {showDetails && <InternshipDetailsModal onClose={() => setShowDetails(false)} />}
    </div>
  );
}
