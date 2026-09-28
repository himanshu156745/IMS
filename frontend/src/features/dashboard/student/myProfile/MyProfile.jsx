import { Check, Clock, X, Plus, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import MyProfileSkeleton from './MyProfileSkeleton';

export default function MyProfile() {
  // Mock data
  const [studentInfo, setStudentInfo] = useState({
    initials: 'RS',
    name: 'Rahul Sharma',
    rollNumber: 'CS2021045',
    year: '3rd Year',
    department: 'Computer Science & Engineering',
    email: 'rahul.sharma@university.edu',
    phone: '+91 98765 43210',
    cgpa: '8.7',
    batch: '2021-2025'
  });

  const [technicalSkills, setTechnicalSkills] = useState([
    'React.js',
    'Node.js',
    'Python',
    'MongoDB',
    'Express.js',
    'TypeScript',
    'Docker',
    'AWS',
    'GraphQL',
    'Next.js',
    'TailwindCSS',
    'Git'
  ]);

  const [resumeItems, setResumeItems] = useState([
    { name: 'Personal Info', completed: true },
    { name: 'Skills', completed: true },
    { name: 'Work Experience', completed: false },
    { name: 'Education', completed: true },
    { name: 'Projects', completed: true },
    { name: 'References', completed: false }
  ]);

  const [academicInfo, setAcademicInfo] = useState({
    university: 'JNTUH Hyderabad',
    branch: 'Computer Science & Engineering',
    batch: '2021-2025',
    semester: '6th Semester'
  });

  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  // Draft states used inside the edit form (only committed on Save)
  const [draftStudentInfo, setDraftStudentInfo] = useState(studentInfo);
  const [draftSkills, setDraftSkills] = useState(technicalSkills);
  const [draftResumeItems, setDraftResumeItems] = useState(resumeItems);
  const [draftAcademicInfo, setDraftAcademicInfo] = useState(academicInfo);
  const [newSkill, setNewSkill] = useState('');

  const resumePercentage = Math.round(
    (draftResumeItems.filter((i) => i.completed).length / draftResumeItems.length) * 100
  );

  const savedResumePercentage = Math.round(
    (resumeItems.filter((i) => i.completed).length / resumeItems.length) * 100
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const openEditModal = () => {
    // Reset drafts to current saved values every time modal opens
    setDraftStudentInfo(studentInfo);
    setDraftSkills(technicalSkills);
    setDraftResumeItems(resumeItems);
    setDraftAcademicInfo(academicInfo);
    setNewSkill('');
    setActiveTab('personal');
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const handleSave = () => {
    setStudentInfo(draftStudentInfo);
    setTechnicalSkills(draftSkills);
    setResumeItems(draftResumeItems);
    setAcademicInfo(draftAcademicInfo);
    setIsEditOpen(false);
  };

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !draftSkills.includes(trimmed)) {
      setDraftSkills([...draftSkills, trimmed]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setDraftSkills(draftSkills.filter((s) => s !== skill));
  };

  const toggleResumeItem = (index) => {
    setDraftResumeItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, completed: !item.completed } : item))
    );
  };

  if (loading) {
    return (
      <MyProfileSkeleton/>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:px-8 lg:py-0">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">My Profile</h1>
          <p className="text-sm text-gray-500">Personal, academic, and professional information</p>
        </div>

        {/* Two-column Layout */}
        <div className="grid lg:grid-cols-[380px_1fr] gap-6">

          {/* LEFT: Profile Card */}
          <div className="bg-white rounded-2xl h-fit border border-gray-200 shadow-sm p-8">
            <div className="flex flex-col items-center text-center">
              {/* Avatar with Online Status */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">{studentInfo.initials}</span>
                </div>
                {/* Green online dot */}
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              {/* Name and Info */}
              <h2 className="text-xl font-bold text-gray-900 mb-1">{studentInfo.name}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {studentInfo.rollNumber} • {studentInfo.year}
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
                  <span className="text-sm text-gray-500">Batch</span>
                  <span className="text-sm font-bold text-gray-900">{studentInfo.batch}</span>
                </div>
              </div>

              {/* Edit Profile Button */}
              <button
                onClick={openEditModal}
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
                <h3 className="text-base font-bold text-gray-900">Resume Completion</h3>
                <span className="text-2xl font-bold text-indigo-600">{savedResumePercentage}%</span>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-violet-600 rounded-full transition-all duration-500"
                    style={{ width: `${savedResumePercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Checklist Grid */}
              <div className="grid grid-cols-2 gap-2">
                {resumeItems.map((item, index) => (
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

                {/* Batch */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Batch</p>
                  <p className="text-sm font-bold text-gray-900">{academicInfo.batch}</p>
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

      {/* EDIT PROFILE MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={closeEditModal}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Edit Profile</h2>
              <button
                onClick={closeEditModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-6 pt-4 border-b border-gray-200 overflow-x-auto">
              {[
                { key: 'personal', label: 'Personal' },
                { key: 'skills', label: 'Skills' },
                { key: 'resume', label: 'Resume' },
                { key: 'academic', label: 'Academic' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-t-lg whitespace-nowrap transition-colors ${activeTab === tab.key
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* PERSONAL TAB */}
              {activeTab === 'personal' && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={draftStudentInfo.name}
                        onChange={(e) => setDraftStudentInfo({ ...draftStudentInfo, name: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Roll Number</label>
                      <input
                        type="text"
                        value={draftStudentInfo.rollNumber}
                        onChange={(e) => setDraftStudentInfo({ ...draftStudentInfo, rollNumber: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Year</label>
                      <input
                        type="text"
                        value={draftStudentInfo.year}
                        onChange={(e) => setDraftStudentInfo({ ...draftStudentInfo, year: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Department</label>
                      <input
                        type="text"
                        value={draftStudentInfo.department}
                        onChange={(e) => setDraftStudentInfo({ ...draftStudentInfo, department: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email</label>
                      <input
                        type="email"
                        value={draftStudentInfo.email}
                        onChange={(e) => setDraftStudentInfo({ ...draftStudentInfo, email: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={draftStudentInfo.phone}
                        onChange={(e) => setDraftStudentInfo({ ...draftStudentInfo, phone: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">CGPA</label>
                      <input
                        type="text"
                        value={draftStudentInfo.cgpa}
                        onChange={(e) => setDraftStudentInfo({ ...draftStudentInfo, cgpa: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Batch</label>
                      <input
                        type="text"
                        value={draftStudentInfo.batch}
                        onChange={(e) => setDraftStudentInfo({ ...draftStudentInfo, batch: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Initials (Avatar)</label>
                      <input
                        type="text"
                        maxLength={2}
                        value={draftStudentInfo.initials}
                        onChange={(e) =>
                          setDraftStudentInfo({ ...draftStudentInfo, initials: e.target.value.toUpperCase() })
                        }
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SKILLS TAB */}
              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Add a Skill</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                        placeholder="e.g. Kubernetes"
                        className="flex-1 px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleAddSkill}
                        className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm flex items-center gap-1.5 hover:bg-indigo-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2">Your Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {draftSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="pl-3 pr-2 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full border border-indigo-100 flex items-center gap-1.5"
                        >
                          {skill}
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-indigo-200 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      {draftSkills.length === 0 && (
                        <p className="text-sm text-gray-400">No skills added yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* RESUME TAB */}
              {activeTab === 'resume' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-700">Toggle items to mark them complete</p>
                    <span className="text-xl font-bold text-indigo-600">{resumePercentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-violet-600 rounded-full transition-all duration-300"
                      style={{ width: `${resumePercentage}%` }}
                    ></div>
                  </div>
                  <div className="space-y-2">
                    {draftResumeItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => toggleResumeItem(index)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors ${item.completed
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                      >
                        <span className={`text-sm font-medium ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {item.name}
                        </span>
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${item.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                            }`}
                        >
                          {item.completed ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ACADEMIC TAB */}
              {activeTab === 'academic' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">University</label>
                    <input
                      type="text"
                      value={draftAcademicInfo.university}
                      onChange={(e) => setDraftAcademicInfo({ ...draftAcademicInfo, university: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Branch</label>
                    <input
                      type="text"
                      value={draftAcademicInfo.branch}
                      onChange={(e) => setDraftAcademicInfo({ ...draftAcademicInfo, branch: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Batch</label>
                    <input
                      type="text"
                      value={draftAcademicInfo.batch}
                      onChange={(e) => setDraftAcademicInfo({ ...draftAcademicInfo, batch: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Semester</label>
                    <input
                      type="text"
                      value={draftAcademicInfo.semester}
                      onChange={(e) => setDraftAcademicInfo({ ...draftAcademicInfo, semester: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={closeEditModal}
                className="px-5 py-2.5 rounded-xl font-semibold text-sm text-gray-600 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-sm rounded-xl flex items-center gap-2 hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

