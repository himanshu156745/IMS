export default function Charts() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Analytics Overview</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Attendance Trend</h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {[85, 92, 88, 95, 90, 92, 94].map((value, index) => (
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
                <span className="font-semibold text-green-600">2 (17%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[17%] bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Reviewed</span>
                <span className="font-semibold text-blue-600">5 (42%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[42%] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Pending</span>
                <span className="font-semibold text-orange-600">4 (33%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[33%] bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Rejected</span>
                <span className="font-semibold text-red-600">1 (8%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[8%] bg-gradient-to-r from-red-500 to-rose-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Submission Progress */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Report Submission Progress</h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }).map((_, index) => {
            const status = index < 18 ? 'completed' : index === 18 || index === 19 ? 'pending' : 'upcoming';
            const colorClass = 
              status === 'completed' ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
              status === 'pending' ? 'bg-gradient-to-br from-orange-500 to-amber-500' :
              'bg-gray-100';
            
            return (
              <div
                key={index}
                className={`aspect-square rounded-lg ${colorClass} hover:scale-110 transition-transform cursor-pointer`}
                title={`Day ${index + 1}`}
              ></div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-br from-green-500 to-emerald-500"></div>
            <span className="text-gray-600">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-br from-orange-500 to-amber-500"></div>
            <span className="text-gray-600">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gray-100"></div>
            <span className="text-gray-600">Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );
}
