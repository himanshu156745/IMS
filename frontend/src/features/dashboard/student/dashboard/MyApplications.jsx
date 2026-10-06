import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../utils/axiosInstance';
import { unwrapList } from '../../../../utils/api';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get('/applications/me');
        setApplications(unwrapList(res));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
      case 'selected':
        return 'bg-green-100 text-green-700';
      case 'reviewed':
        return 'bg-blue-100 text-blue-700';
      case 'applied':
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTimeline = (status) => {
    const s = status?.toLowerCase();
    const base = ['Applied'];
    if (s === 'reviewed') base.push('Reviewed');
    if (s === 'accepted' || s === 'selected') {
      base.push('Reviewed', 'Accepted');
    }
    if (s === 'rejected') {
      base.push('Reviewed', 'Rejected');
    }
    return base;
  };

  const stats = {
    total: applications.length,
    selected: applications.filter((a) =>
      ['accepted', 'selected'].includes(a.status?.toLowerCase())
    ).length,
    review: applications.filter((a) => a.status?.toLowerCase() === 'reviewed')
      .length,
    pending: applications.filter((a) =>
      ['applied', 'pending'].includes(a.status?.toLowerCase())
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600 mt-1">
            Track and manage all your internship applications
          </p>
        </div>
        <button
          onClick={() => navigate('/students/view-internships')}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
        >
          Apply New
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Total Applied</span>
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">{stats.total}</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Selected</span>
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-bold text-lg">{stats.selected}</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.selected}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Under Review</span>
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">{stats.review}</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.review}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Pending</span>
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <span className="text-orange-600 font-bold text-lg">{stats.pending}</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
        </div>
      </div>

      {loading && <p className="text-gray-500 font-medium">Loading applications...</p>}
      {error && <p className="text-red-500 font-medium">{error}</p>}

      {/* Applications List */}
      {!loading && !error && (
        <div className="space-y-4">
          {applications.map((app) => {
            const companyName = app.internship?.company?.name || 'Unknown Company';
            const roleTitle = app.internship?.title || 'Unknown Position';

            return (
              <div
                key={app._id || app.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  {/* Logo / Badge */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">
                    {companyName.charAt(0)}
                  </div>

                  {/* Card Main Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{roleTitle}</h3>
                        <p className="text-gray-600 font-medium">{companyName}</p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Applied on {new Date(app.createdAt || app.date || Date.now()).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                        </svg>
                        {app.internship?.location || 'Remote/TBD'}
                      </span>
                      <span className="flex items-center gap-1 text-green-600 font-semibold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        ₹{app.internship?.stipend ?? 0}/month
                      </span>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-2 mb-4">
                      {getTimeline(app.status).map((step, index, arr) => (
                        <div key={index} className="flex items-center">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                            {step}
                          </span>
                          {index < arr.length - 1 && (
                            <svg
                              className="w-4 h-4 text-gray-400 mx-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all hover:scale-105"
                      >
                        View Details
                      </button>
                      {['applied', 'pending'].includes(app.status?.toLowerCase()) && (
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
                          Withdraw
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {applications.length === 0 && (
            <p className="text-gray-500 font-medium">No applications found.</p>
          )}
        </div>
      )}

      {/* Details Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start gap-4 p-6 border-b border-gray-200">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">
                {(selectedApp.internship?.company?.name || 'C').charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedApp.internship?.title || 'Unknown Position'}
                </h2>
                <p className="text-gray-600 font-medium">
                  {selectedApp.internship?.company?.name || 'Unknown Company'}
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <span
                  className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize ${getStatusColor(
                    selectedApp.status
                  )}`}
                >
                  {selectedApp.status}
                </span>
                <span className="text-sm text-gray-500">
                  Applied on{' '}
                  {new Date(
                    selectedApp.createdAt || selectedApp.date || Date.now()
                  ).toLocaleDateString()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="font-semibold text-gray-900">
                    {selectedApp.internship?.location || 'Remote/TBD'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Stipend</p>
                  <p className="font-semibold text-green-600">
                    ₹{selectedApp.internship?.stipend ?? 0}/month
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Duration</p>
                  <p className="font-semibold text-gray-900">
                    {selectedApp.internship?.duration || 'N/A'}
                  </p>
                </div>
              </div>

              {selectedApp.internship?.description && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">About the Role</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {selectedApp.internship.description}
                  </p>
                </div>
              )}

              {selectedApp.internship?.skills?.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Skills Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedApp.internship.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedApp.internship?.perks?.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Perks & Benefits</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedApp.internship.perks.map((perk, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium"
                      >
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">Application Timeline</h3>
                <div className="flex flex-wrap items-center gap-2">
                  {getTimeline(selectedApp.status).map((step, index, arr) => (
                    <div key={index} className="flex items-center">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                        {step}
                      </span>
                      {index < arr.length - 1 && (
                        <svg
                          className="w-4 h-4 text-gray-400 mx-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              {['applied', 'pending'].includes(selectedApp.status?.toLowerCase()) && (
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all hover:scale-105">
                  Withdraw Application
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}