
export default function RecentInternship() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Current Internship</h2>
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Active</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">TCS</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Full Stack Developer</h3>
            <p className="text-sm text-gray-600 mb-2">Tata Consultancy Services</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">Remote</span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">6 Months</span>
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">Stipend: ₹25,000/mo</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Internship Progress</span>
            <span className="font-semibold text-blue-600">65%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-[65%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <span>Started: Jan 15, 2024</span>
            <span>Ends: Jul 15, 2024</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
            View Details
          </button>
          <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}
