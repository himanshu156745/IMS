import { useState, useEffect } from 'react';
import { Check, Clock } from 'lucide-react';
import { useAuth } from '../../../../hooks/useAuth';
import axiosInstance from '../../../../utils/axiosInstance';
import EditProfileModal from './EditProfileModal';

export default function MyProfile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/student-profiles/me');
      setProfileData(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
      return <div className="p-8 text-center">Loading profile...</div>;
  }

  // Fallback info if profile is not created yet
  const studentInfo = {
    initials: profileData?.fullName ? profileData.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'ST',
    name: profileData?.fullName || 'No Name Provided',
    rollNumber: profileData?.rollNumber || 'N/A', // Assuming rollNumber might be added later, or just N/A
    course: profileData?.course || 'N/A',
    department: profileData?.branch || 'N/A',
    email: user?.email || 'N/A',
    phone: profileData?.phoneNumber || 'N/A',
    cgpa: profileData?.cgpa || 'N/A',
    batch: 'N/A' // Not explicitly in schema
  };

  const technicalSkills = profileData?.skills?.length ? profileData.skills : ['No skills added yet'];

  const calculateCompletion = () => {
    if (!profileData) return { percentage: 0, items: [] };
    const items = [
      { name: 'Personal Info', completed: !!profileData.fullName && !!profileData.phoneNumber },
      { name: 'Skills', completed: profileData.skills?.length > 0 },
      { name: 'Education', completed: !!profileData.university && !!profileData.course },
      { name: 'Resume', completed: !!profileData.resumeUrl },
      { name: 'Links', completed: !!profileData.github || !!profileData.linkedin }
    ];
    const completedCount = items.filter(i => i.completed).length;
    return {
      percentage: Math.round((completedCount / items.length) * 100),
      items
    };
  };

  const resumeCompletion = calculateCompletion();

  const academicInfo = {
    university: profileData?.university || 'N/A',
    branch: profileData?.branch || 'N/A',
    course: profileData?.course || 'N/A',
    semester: profileData?.semester ? `${profileData.semester} Semester` : 'N/A'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:px-8 lg:py-0">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">My Profile</h1>
          <p className="text-sm text-gray-500">Personal, academic, and professional information</p>
        </div>

        {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
                {error} - Please edit your profile to create one if it doesn't exist.
            </div>
        )}

        {/* Two-column Layout */}
        <div className="grid lg:grid-cols-[380px_1fr] gap-6">
          
          {/* LEFT: Profile Card */}
          <div className="bg-white rounded-2xl h-fit border border-gray-200 shadow-sm p-8">
            <div className="flex flex-col items-center text-center">
              {/* Avatar with Online Status */}
              <div className="relative mb-6">
                {profileData?.avatarUrl ? (
                    <img src={profileData.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-2xl object-cover" />
                ) : (
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">{studentInfo.initials}</span>
                    </div>
                )}
                {/* Green online dot */}
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              {/* Name and Info */}
              <h2 className="text-xl font-bold text-gray-900 mb-1">{studentInfo.name}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {studentInfo.course}
              </p>
              <p className="text-sm font-semibold text-violet-600 mb-6">{studentInfo.department}</p>

              {/* Info List */}
              <div className="w-full space-y-0 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className="text-sm font-bold text-gray-900 truncate ml-4 max-w-[180px]" title={studentInfo.email}>
                    {studentInfo.email}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-sm text-gray-500">Phone</span>
                  <span className="text-sm font-bold text-gray-900">{studentInfo.phone}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-sm text-gray-500">CGPA</span>
                  <span className="text-sm font-bold text-gray-900">{studentInfo.cgpa}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-gray-500">Links</span>
                  <div className="flex gap-2">
                      {profileData?.github && <a href={profileData.github} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 hover:underline">GitHub</a>}
                      {profileData?.linkedin && <a href={profileData.linkedin} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 hover:underline">LinkedIn</a>}
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* RIGHT: Three Cards */}
          <div className="space-y-4">
            
            {/* 1. Technical Skills Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full border border-indigo-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Resume Completion Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-gray-900">Profile Completion</h3>
                <span className="text-2xl font-bold text-indigo-600">{resumeCompletion.percentage}%</span>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-violet-600 rounded-full transition-all duration-500"
                    style={{ width: `${resumeCompletion.percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Checklist Grid */}
              <div className="grid grid-cols-2 gap-2">
                {resumeCompletion.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {item.completed ? (
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${item.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Academic Information Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Academic Information
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* University */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">University</p>
                  <p className="text-sm font-bold text-gray-900">{academicInfo.university}</p>
                </div>

                {/* Branch */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Branch</p>
                  <p className="text-sm font-bold text-gray-900">{academicInfo.branch}</p>
                </div>

                {/* Course */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Course</p>
                  <p className="text-sm font-bold text-gray-900">{academicInfo.course}</p>
                </div>

                {/* Semester */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Semester</p>
                  <p className="text-sm font-bold text-gray-900">{academicInfo.semester}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentData={profileData}
        onSaveSuccess={fetchProfile}
      />
    </div>
  );
}
