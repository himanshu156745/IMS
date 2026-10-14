import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../../../utils/axiosInstance';
import { unwrapList } from '../../../../utils/api';

export default function DailyReportsPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedInternshipId, setSelectedInternshipId] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [taskDescription, setTaskDescription] = useState('');
  const [hoursWorked, setHoursWorked] = useState('8');
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchApplications = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/applications/me');
      const list = unwrapList(res);
      const accepted = list.filter(app => app.status === 'accepted');
      setApplications(accepted);
      if (accepted.length > 0) {
        const firstId = accepted[0].internship?._id || accepted[0].internship;
        setSelectedInternshipId(firstId);
      }
    } catch {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchReports = useCallback(async () => {
    if (!selectedInternshipId) return;
    try {
      const res = await axiosInstance.get(`/reports/me/${selectedInternshipId}`);
      setReports(unwrapList(res));
    } catch {
      setReports([]);
    }
  }, [selectedInternshipId]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  useEffect(() => {
    if (selectedInternshipId) {
      fetchReports();
    }
  }, [selectedInternshipId, fetchReports]);

  const handleSubmit = async () => {
    if (!selectedInternshipId) {
      return toast.error("Please select an active internship");
    }
    if (!taskDescription || taskDescription.trim().length < 20) {
      return toast.error("Task description must be at least 20 characters");
    }
    const hours = Number(hoursWorked);
    if (!hours || hours < 1 || hours > 12) {
      return toast.error("Hours worked must be between 1 and 12");
    }

    setSubmitting(true);
    try {
      await axiosInstance.post(`/reports/${selectedInternshipId}`, {
        taskDescription: taskDescription.trim(),
        hoursWorked: hours
      });
      toast.success("Daily report submitted successfully");
      setShowUploadModal(false);
      setTaskDescription('');
      setHoursWorked('8');
      fetchReports();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit report');
    } finally {
      setSubmitting(false);
    }
  };

  const totalReports = reports.length;
  const approvedReports = reports.filter(r => (r.status || '').toLowerCase() === 'approved').length;
  const pendingReports = reports.filter(r => (r.status || '').toLowerCase() === 'pending').length;
  const avgHours = totalReports > 0 
    ? (reports.reduce((acc, r) => acc + (Number(r.hoursWorked) || 0), 0) / totalReports).toFixed(1)
    : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daily Reports</h1>
          <p className="text-gray-600 mt-1">Track your daily progress and receive mentor feedback</p>
        </div>
        <div className="flex items-center gap-4">
          {applications.length > 1 && (
            <select
              value={selectedInternshipId}
              onChange={(e) => setSelectedInternshipId(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {applications.map(app => {
                const appId = app.internship?._id || app.internship;
                return (
                  <option key={appId} value={appId}>
                    {app.internship?.title || 'Internship'}
                  </option>
                );
              })}
            </select>
          )}
          <button 
            onClick={() => setShowUploadModal(true)}
            disabled={applications.length === 0}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50"
          >
            + Submit Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalReports}</p>
              <p className="text-sm text-gray-600">Total Reports</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{approvedReports}</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingReports}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{avgHours}</p>
              <p className="text-sm text-gray-600">Avg Hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      {loading ? (
        <div className="p-8 text-center text-gray-500">Loading daily reports...</div>
      ) : reports.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm text-center">
          <p className="text-gray-500">No daily reports recorded yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => {
            const reportDateObj = report.date ? new Date(report.date) : (report.createdAt ? new Date(report.createdAt) : new Date());
            const formattedDate = reportDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const dayName = reportDateObj.toLocaleDateString('en-US', { weekday: 'long' });
            const dayNumber = reportDateObj.getDate();
            const statusLabel = report.status ? report.status.charAt(0).toUpperCase() + report.status.slice(1) : 'Pending';
            const isApproved = (report.status || '').toLowerCase() === 'approved';

            return (
              <div key={report._id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {dayNumber}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{dayName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          isApproved ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {statusLabel}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{formattedDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Task */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Task Completed</p>
                    <p className="text-gray-900">{report.taskDescription}</p>
                  </div>

                  {/* Hours */}
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">{report.hoursWorked} hours</span> worked
                    </span>
                  </div>

                  {/* Mentor Feedback */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                        FB
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 mb-1">Mentor Feedback</p>
                        <p className="text-sm text-gray-700 mb-2">{report.facultyFeedback || 'Pending review'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Submit Daily Report</h2>
              <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                <input 
                  type="date" 
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Task Completed (Min 20 characters) *</label>
                <textarea 
                  rows="4" 
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Describe what you accomplished today..." 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Hours Worked (1 - 12) *</label>
                <input 
                  type="number" 
                  step="0.5" 
                  min="1" 
                  max="12" 
                  value={hoursWorked}
                  onChange={(e) => setHoursWorked(e.target.value)}
                  placeholder="8" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowUploadModal(false)} 
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  disabled={submitting}
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
