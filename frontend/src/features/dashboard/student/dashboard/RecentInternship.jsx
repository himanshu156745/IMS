import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardData } from '../../../../hooks/useDashboardData';

export default function RecentInternship({ applications: propApps, loading: propLoading }) {
  const navigate = useNavigate();
  const { applications: hookApps, loading: hookLoading } = useDashboardData();
  const applications = propApps !== undefined ? propApps : hookApps;
  const loading = propLoading !== undefined ? propLoading : hookLoading;

  const activeApp = applications.find(a => a.status === 'accepted') || applications[0];

  const title = activeApp?.internship?.title || "Enrolled Internship";
  const companyName = activeApp?.internship?.company?.name || "Partner Organization";
  const companyInitials = (companyName.split(' ').map(w => w[0]).join('').slice(0, 3) || "INT").toUpperCase();
  const location = activeApp?.internship?.location || "Remote";
  const duration = activeApp?.internship?.duration || "Standard Duration";
  const stipend = activeApp?.internship?.stipend 
    ? `₹${Number(activeApp.internship.stipend).toLocaleString()}/mo` 
    : (activeApp?.internship ? "Unpaid" : "₹0/mo");
  const statusLabel = activeApp 
    ? (activeApp.status === 'accepted' ? 'Active' : activeApp.status.charAt(0).toUpperCase() + activeApp.status.slice(1)) 
    : 'Not Enrolled';

  const startDate = activeApp?.updatedAt 
    ? new Date(activeApp.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : (activeApp?.createdAt ? new Date(activeApp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recently");

  const endDate = activeApp?.internship?.deadline
    ? new Date(activeApp.internship.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : "Ongoing";

  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    if (!activeApp) {
      setProgressPercentage(0);
      return;
    }
    if (activeApp.status !== 'accepted') {
      setProgressPercentage(25);
      return;
    }
    const start = new Date(activeApp.createdAt).getTime();
    const end = activeApp.internship?.deadline ? new Date(activeApp.internship.deadline).getTime() : 0;
    const now = Date.now();
    if (end > start) {
      setProgressPercentage(Math.min(100, Math.max(10, Math.round(((now - start) / (end - start)) * 100))));
    } else {
      setProgressPercentage(75);
    }
  }, [activeApp]);

  if (loading && (!applications || applications.length === 0)) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-40 bg-gray-200 rounded"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-24 bg-gray-100 rounded-xl mb-4"></div>
        <div className="h-10 bg-gray-100 rounded-xl"></div>
      </div>
    );
  }

  if (!activeApp) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Current Internship</h2>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full capitalize">Not Enrolled</span>
        </div>
        <div className="text-center py-10 space-y-3">
          <p className="text-sm text-gray-500">You are not currently enrolled in an active internship.</p>
          <button 
            onClick={() => navigate('/students/view-internships')} 
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
          >
            Explore Internships
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Current Internship</h2>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${
          activeApp.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {statusLabel}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">{companyInitials}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 mb-2">{companyName}</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">{location}</span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">{duration}</span>
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">Stipend: {stipend}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Internship Progress</span>
            <span className="font-semibold text-blue-600">{progressPercentage}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <span>Started: {startDate}</span>
            <span>Ends: {endDate}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button onClick={() => navigate('/students/applications')} className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
            View Details
          </button>
          <button onClick={() => navigate('/students/reports')} className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}
