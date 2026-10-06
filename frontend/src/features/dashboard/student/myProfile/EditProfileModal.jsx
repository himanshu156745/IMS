import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import axiosInstance from '../../../../utils/axiosInstance';

export default function EditProfileModal({ isOpen, onClose, currentData, onSaveSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    university: '',
    course: '',
    branch: '',
    semester: '',
    cgpa: '',
    skills: '',
    github: '',
    linkedin: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentData && isOpen) {
      setFormData({
        fullName: currentData.fullName || '',
        phoneNumber: currentData.phoneNumber || '',
        university: currentData.university || '',
        course: currentData.course || '',
        branch: currentData.branch || '',
        semester: currentData.semester || '',
        cgpa: currentData.cgpa || '',
        skills: currentData.skills ? currentData.skills.join(', ') : '',
        github: currentData.github || '',
        linkedin: currentData.linkedin || '',
      });
    }
  }, [currentData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'resume') setResumeFile(files[0]);
    if (name === 'avatar') setAvatarFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'skills') {
          const skillsArr = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
          data.append('skills', JSON.stringify(skillsArr));
        } else {
          data.append(key, formData[key]);
        }
      });

      if (resumeFile) data.append('resume', resumeFile);
      if (avatarFile) data.append('avatar', avatarFile);

      await axiosInstance.post('/student-profiles', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onSaveSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name *</label>
                <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none" />
              </div>

              {/* Education */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">University *</label>
                <input required type="text" name="university" value={formData.university} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Course *</label>
                <input required type="text" name="course" value={formData.course} onChange={handleChange} placeholder="e.g. B.Tech" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Branch/Department</label>
                <input type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="e.g. Computer Science" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Semester</label>
                <input type="text" name="semester" value={formData.semester} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">CGPA</label>
                <input type="text" name="cgpa" value={formData.cgpa} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none" />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Skills (Comma separated)</label>
              <textarea name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, Python..." className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none" rows="2" />
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">GitHub URL</label>
                <input type="url" name="github" value={formData.github} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">LinkedIn URL</label>
                <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none" />
              </div>
            </div>

            {/* Files */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Avatar Image</label>
                <input type="file" accept="image/*" name="avatar" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Resume (PDF)</label>
                <input type="file" accept=".pdf" name="resume" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <button type="button" onClick={onClose} disabled={loading} className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:shadow-lg transition-all flex items-center justify-center min-w-[120px]">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
