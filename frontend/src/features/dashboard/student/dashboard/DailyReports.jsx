import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../../../utils/axiosInstance';
import { FiFileText, FiPlus, FiX } from 'react-icons/fi';
import { unwrapList } from '../../../../utils/api';

export default function DailyReports() {
  const [applications, setApplications] = useState([]);
  const [selectedInternshipId, setSelectedInternshipId] = useState(null);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [taskDescription, setTaskDescription] = useState('');
  const [hoursWorked, setHoursWorked] = useState(8);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      toast.error('Failed to fetch applications');
    } finally {
      setIsLoading(false);
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

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!selectedInternshipId) {
      return toast.error("Please select an active internship");
    }
    if (taskDescription.trim().length < 20) {
      return toast.error("Task description must be at least 20 characters");
    }
    if (Number(hoursWorked) < 1 || Number(hoursWorked) > 12) {
      return toast.error("Hours worked must be between 1 and 12");
    }

    setIsSubmitting(true);
    try {
      await axiosInstance.post(`/reports/${selectedInternshipId}`, {
        taskDescription: taskDescription.trim(),
        hoursWorked: Number(hoursWorked)
      });
      toast.success("Daily report submitted successfully");
      setShowModal(false);
      setTaskDescription('');
      setHoursWorked(8);
      fetchReports();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit report');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-orange-100 text-orange-700';
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center p-8 text-gray-500">Loading daily reports...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-center items-center h-64 text-gray-500">
        <FiFileText className="w-16 h-16 mb-4 text-gray-300" />
        <h2 className="text-xl font-semibold">No Active Internships</h2>
        <p className="text-sm mt-1">You need an accepted internship to submit daily reports.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Daily Reports</h2>
          <p className="text-sm text-gray-500 mt-1">Submit and track your daily work</p>
        </div>
        
        <div className="flex gap-4 items-center">
          {applications.length > 1 && (
            <select 
              value={selectedInternshipId}
              onChange={(e) => setSelectedInternshipId(e.target.value)}
              className="rounded-lg border-gray-300 shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {applications.map(app => {
                const appId = app.internship?._id || app.internship;
                const title = app.internship?.title || 'Internship';
                return (
                  <option key={appId} value={appId}>
                    {title}
                  </option>
                );
              })}
            </select>
          )}

          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
          >
            <FiPlus /> Submit Report
          </button>
        </div>
      </div>

      {/* Submit Report Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Submit Daily Report</h2>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmitReport} className="space-y-4">
              {applications.length > 1 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Internship *</label>
                  <select 
                    value={selectedInternshipId}
                    onChange={(e) => setSelectedInternshipId(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {applications.map(app => {
                      const appId = app.internship?._id || app.internship;
                      const title = app.internship?.title || 'Internship';
                      return (
                        <option key={appId} value={appId}>
                          {title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Task Description (Min 20 characters) *</label>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  required
                  rows={4}
                  placeholder="Describe what you worked on today... (min 20 characters)"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Hours Worked (1 - 12) *</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={hoursWorked}
                  onChange={(e) => setHoursWorked(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {reports.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No daily reports found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Task Completed</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Hours</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mentor Feedback</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {report.date ? new Date(report.date).toLocaleDateString() : report.dateKey}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium max-w-xs truncate" title={report.taskDescription}>
                    {report.taskDescription}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{report.hoursWorked}h</td>
                  <td className="py-4 px-4 text-sm text-gray-600 max-w-xs truncate" title={report.facultyFeedback}>
                    {report.facultyFeedback || 'Pending review'}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
