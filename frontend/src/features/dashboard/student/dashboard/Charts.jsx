import { useMemo } from 'react';
import { useDashboardData } from '../../../../hooks/useDashboardData';

export default function Charts({ applications: propApps }) {
  const { applications: hookApps } = useDashboardData();
  const applications = propApps !== undefined ? propApps : hookApps;

  const appStats = useMemo(() => {
    const total = applications.length || 1;
    const selected = applications.filter(a => a.status === 'accepted').length;
    const reviewed = applications.filter(a => a.status === 'reviewed').length;
    const pending = applications.filter(a => a.status === 'applied').length;
    const rejected = applications.filter(a => a.status === 'rejected').length;

    return {
      selected: { count: selected, pct: Math.round((selected / total) * 100) },
      reviewed: { count: reviewed, pct: Math.round((reviewed / total) * 100) },
      pending: { count: pending, pct: Math.round((pending / total) * 100) },
      rejected: { count: rejected, pct: Math.round((rejected / total) * 100) },
    };
  }, [applications]);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Analytics Overview</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Attendance Trend</h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {[80, 85, 90, 85, 95, 90, 100].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gray-100 rounded-t-lg relative overflow-hidden" style={{ height: '100%' }}>
                  <div 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all duration-500"
                    style={{ height: `${value}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">W{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application Analytics */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Application Status</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Selected</span>
                <span className="font-semibold text-green-600">{appStats.selected.count} ({appStats.selected.pct}%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${appStats.selected.pct}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Reviewed</span>
                <span className="font-semibold text-blue-600">{appStats.reviewed.count} ({appStats.reviewed.pct}%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${appStats.reviewed.pct}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Pending</span>
                <span className="font-semibold text-orange-600">{appStats.pending.count} ({appStats.pending.pct}%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${appStats.pending.pct}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Rejected</span>
                <span className="font-semibold text-red-600">{appStats.rejected.count} ({appStats.rejected.pct}%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full transition-all duration-500"
                  style={{ width: `${appStats.rejected.pct}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
