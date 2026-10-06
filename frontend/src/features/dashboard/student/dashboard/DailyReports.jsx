import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../../../utils/axiosInstance';
import { FiFileText, FiPlus, FiX } from 'react-icons/fi';
import { unwrapList } from '../../../../utils/api';

export default function DailyReports() {
  const [applications, setApplications] = useState([]);
  const [selectedInternshipId, setSelectedInternshipId] = useState('');
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    taskDescription: '',
    hoursWorked: 8
  });

  const fetchApplications = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/applications/me');
      const accepted = unwrapList(res).filter(app => app.status === 'accepted');
      setApplications(accepted);
      if (accepted.length > 0) {
        setSelectedInternshipId(accepted[0].internship._id);
      }
    } catch {
      toast.error('Failed to fetch active internships');
    }finally {
      setIsLoading(false);
    }
  }, []);

  const fetchReports = useCallback(async () => {
    if (!selectedInternshipId) return;
    try {
      const res = await axiosInstance.get(`/reports/me/${selectedInternshipId}`);
      setReports(unwrapList(res));
    } catch {
      toast.error('Failed to fetch reports');
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      taskDescription: '',
      hoursWorked: 8
    });
  };

  const handleClose = () => {
    setShowForm(false);
    resetForm();
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!selectedInternshipId) return;
    if (formData.taskDescription.trim().length < 20) {
      return toast.error("Task description must be at least 20 characters");
    }

    setIsSubmitting(true);
    try {
      await axiosInstance.post(`/reports/${selectedInternshipId}`, {
        date: formData.date,
        taskDescription: formData.taskDescription,
        hoursWorked: Number(formData.hoursWorked)
      });
      toast.success("Daily report submitted successfully");
      handleClose();
      fetchReports();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit report');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status = '') => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center p-12 text-gray-600 font-medium">Loading reports...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col justify-center items-center h-64 text-center text-gray-500">
        <FiFileText className="w-16 h-16 mb-4 text-gray-300" />
        <h2 className="text-xl font-semibold text-gray-800">No Active Internships</h2>
        <p className="mt-1 text-sm text-gray-500">You need to have an accepted internship to submit daily reports.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Daily Reports</h2>
          <p className="text-sm text-gray-500 mt-0.5">Submit and track your daily work logs</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {applications.length > 1 && (
            <select
              value={selectedInternshipId}
              onChange={(e) => setSelectedInternshipId(e.target.value)}
              className="rounded-xl border border-gray-300 text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            >
              {applications.map((app) => (
                <option key={app.internship?._id || app._id} value={app.internship?._id || app._id}>
                  {app.internship?.title || 'Internship'}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" />
            Upload Report
          </button>
        </div>
      </div>

      {/* Reports Table or Empty State */}
      {reports.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
          <p className="text-gray-500 font-medium">No daily reports submitted yet.</p>
          <p className="text-xs text-gray-400 mt-1">Click "Upload Report" above to add your first entry.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50/50">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Task Completed</th>
                <th className="py-3 px-4">Hours</th>
                <th className="py-3 px-4">Mentor Feedback</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {reports.map((report) => (
                <tr key={report._id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 font-medium text-gray-700 whitespace-nowrap">
                    {report.date ? new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                  </td>
                  <td className="py-4 px-4 text-gray-900 font-medium max-w-xs md:max-w-md truncate" title={report.taskDescription}>
                    {report.taskDescription}
                  </td>
                  <td className="py-4 px-4 text-gray-600 font-medium whitespace-nowrap">
                    {report.hoursWorked || 8} hrs
                  </td>
                  <td className="py-4 px-4 text-gray-600 max-w-xs truncate" title={report.facultyFeedback || report.feedback}>
                    {report.facultyFeedback || report.feedback || '-'}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(report.status)}`}>
                      {report.status || 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload Report Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Upload Daily Report</h3>
              <button
                onClick={handleClose}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitReport} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hours Worked <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="hoursWorked"
                    min="1"
                    max="16"
                    value={formData.hoursWorked}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Task Completed <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="taskDescription"
                  value={formData.taskDescription}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Describe the tasks and progress you completed today... (min 20 characters)"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}