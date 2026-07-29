export default function DailyReports() {
  const reports = [
    { date: 'May 18, 2024', task: 'Completed user authentication module', feedback: 'Excellent work!', status: 'Approved' },
    { date: 'May 17, 2024', task: 'Fixed bugs in payment gateway', feedback: 'Good progress', status: 'Approved' },
    { date: 'May 16, 2024', task: 'Implemented dashboard UI', feedback: 'Pending review', status: 'Pending' },
    { date: 'May 15, 2024', task: 'Database schema design', feedback: 'Well structured', status: 'Approved' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Daily Reports</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all hover:scale-105">
          Upload Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Task Completed</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mentor Feedback</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 text-sm text-gray-600">{report.date}</td>
                <td className="py-4 px-4 text-sm text-gray-900 font-medium">{report.task}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{report.feedback}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    report.status === 'Approved' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {report.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
