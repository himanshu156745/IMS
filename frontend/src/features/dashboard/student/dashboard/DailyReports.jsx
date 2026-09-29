import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../../../utils/axiosInstance';
import { FiFileText, FiPlus, FiX } from 'react-icons/fi';

export default function DailyReports() {
  const [applications, setApplications] = useState([]);
  const [selectedInternshipId, setSelectedInternshipId] = useState(null);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [taskDescription, setTaskDescription] = useState('');
  const [hoursWorked, setHoursWorked] = useState(8);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchApplications = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/applications/me');
      const accepted = res.data.data.filter(app => app.status === 'accepted');
      setApplications(accepted);
      if (accepted.length > 0) {
        setSelectedInternshipId(accepted[0].internship._id);
      }
    } catch {
      toast.error('Failed to fetch applications');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchReports = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/reports/me/${selectedInternshipId}`);
      setReports(res.data.data);
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

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!selectedInternshipId) return;
    if (taskDescription.length < 20) {
      return toast.error("Task description must be at least 20 characters");
    }

    setIsSubmitting(true);
    try {
      await axiosInstance.post(`/reports/${selectedInternshipId}`, {
        taskDescription,
        hoursWorked: Number(hoursWorked)
      });
      toast.success("Daily report submitted successfully");
      setShowForm(false);
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
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-orange-100 text-orange-700';
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center p-8">Loading...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-center items-center h-64 text-gray-500">
        <FiFileText className="w-16 h-16 mb-4 text-gray-300" />
        <h2 className="text-xl font-semibold">No Active Internships</h2>
        <p>You need to have an accepted internship to submit daily reports.</p>
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
              {applications.map(app => (
                <option key={app.internship._id} value={app.internship._id}>
                  {app.internship.title}
                </option>
              ))}
            </select>
          )}

          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
          >
            {showForm ? <><FiX /> Cancel</> : <><FiPlus /> Submit Report</>}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">New Daily Report</h3>
          <form onSubmit={handleSubmitReport} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Task Description</label>
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
                rows={4}
                placeholder="Describe what you worked on today... (min 20 characters)"
                className="w-full rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-sm p-3"
              />
            </div>
            <div className="w-48">
              <label className="block text-sm font-medium text-slate-700 mb-1">Hours Worked</label>
              <input
                type="number"
                min="1"
                max="12"
                value={hoursWorked}
                onChange={(e) => setHoursWorked(e.target.value)}
                required
                className="w-full rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-sm p-3"
              />
            </div>
            <div className="flex justify-end">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
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
                    {new Date(report.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium max-w-xs truncate" title={report.taskDescription}>
                    {report.taskDescription}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{report.hoursWorked}h</td>
                  <td className="py-4 px-4 text-sm text-gray-600 max-w-xs truncate" title={report.facultyFeedback}>
                    {report.facultyFeedback || '-'}
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
