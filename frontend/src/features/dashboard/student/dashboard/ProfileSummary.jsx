import { useNavigate } from "react-router-dom";

export default function ProfileSummary({ profile = null }) {
  const navigate = useNavigate();

  if (!profile) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Summary</h2>
        <p className="text-gray-600 mb-6">Profile incomplete — click to add details</p>
        <button
          onClick={() => navigate('/students/profile')}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
        >
          Add Profile Details
        </button>
      </div>
    );
  }

  const nameParts = (profile.fullName || '').split(' ');
  const initials = nameParts.length > 1
    ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
    : (nameParts[0]?.[0] || 'S').toUpperCase();

  const displaySkills = (profile.skills || []).slice(0, 5);

  const colors = ['bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700', 'bg-green-100 text-green-700', 'bg-orange-100 text-orange-700', 'bg-pink-100 text-pink-700'];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Summary</h2>

      <div className="text-center mb-6">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          {initials}
        </div>
        <h3 className="font-bold text-gray-900 text-lg">{profile.fullName}</h3>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Department</span>
          <span className="font-semibold text-gray-900">{profile.branch || '—'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Course</span>
          <span className="font-semibold text-gray-900">{profile.course || '—'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">University</span>
          <span className="font-semibold text-gray-900">{profile.university || '—'}</span>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Skills</h4>
        {displaySkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {displaySkills.map((skill, idx) => (
              <span key={idx} className={`px-3 py-1 ${colors[idx % colors.length]} rounded-full text-xs font-medium`}>
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500">No skills added yet.</p>
        )}
      </div>

      <button
        onClick={() => navigate('/students/profile')}
        className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
      >
        View Profile
      </button>
    </div>
  );
}
