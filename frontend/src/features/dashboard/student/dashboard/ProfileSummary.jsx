import { useNavigate } from "react-router-dom";

export default function ProfileSummary() {
  const navigate = useNavigate()
  const resumeCompletion = 85;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Summary</h2>

      <div className="text-center mb-6">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          RS
        </div>
        <h3 className="font-bold text-gray-900 text-lg">Rahul Sharma</h3>
        <p className="text-sm text-gray-600">rahul.sharma@university.edu</p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Department</span>
          <span className="font-semibold text-gray-900">Computer Science</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">University</span>
          <span className="font-semibold text-gray-900">MIT University</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Year</span>
          <span className="font-semibold text-gray-900">Final Year</span>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Skills</h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">React</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Node.js</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">MongoDB</span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">Python</span>
          <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">AWS</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-semibold text-gray-900">Resume Completion</span>
          <span className="font-bold text-blue-600">{resumeCompletion}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${resumeCompletion}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Add project details to complete</p>
      </div>

      <button onClick={()=>navigate("/students/profile")} className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
        Edit Profile
      </button>
    </div>
  );
}
