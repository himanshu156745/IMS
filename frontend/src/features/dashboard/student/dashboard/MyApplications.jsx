export default function MyApplications() {
  const applications = [
    { 
      id: 1,
      company: 'Google India', 
      logo: 'G',
      role: 'Software Engineer Intern', 
      date: 'May 10, 2024', 
      status: 'Reviewed',
      location: 'Bangalore',
      stipend: '₹80,000',
      gradient: 'from-red-500 to-orange-500',
      timeline: ['Applied', 'Reviewed', 'Interview Pending']
    },
    { 
      id: 2,
      company: 'Microsoft', 
      logo: 'M',
      role: 'Cloud Developer Intern', 
      date: 'May 8, 2024', 
      status: 'Selected',
      location: 'Hyderabad',
      stipend: '₹75,000',
      gradient: 'from-blue-500 to-cyan-500',
      timeline: ['Applied', 'Reviewed', 'Interview', 'Selected']
    },
    { 
      id: 3,
      company: 'Amazon', 
      logo: 'A',
      role: 'Backend Developer', 
      date: 'May 5, 2024', 
      status: 'Pending',
      location: 'Mumbai',
      stipend: '₹70,000',
      gradient: 'from-orange-500 to-amber-500',
      timeline: ['Applied']
    },
    { 
      id: 4,
      company: 'Flipkart', 
      logo: 'F',
      role: 'Full Stack Developer', 
      date: 'May 3, 2024', 
      status: 'Rejected',
      location: 'Bangalore',
      stipend: '₹50,000',
      gradient: 'from-yellow-500 to-orange-500',
      timeline: ['Applied', 'Reviewed', 'Rejected']
    },
    { 
      id: 5,
      company: 'TCS', 
      logo: 'T',
      role: 'Full Stack Developer', 
      date: 'Apr 28, 2024', 
      status: 'Selected',
      location: 'Chennai',
      stipend: '₹25,000',
      gradient: 'from-purple-500 to-pink-500',
      timeline: ['Applied', 'Reviewed', 'Selected']
    },
    { 
      id: 6,
      company: 'Infosys', 
      logo: 'I',
      role: 'Frontend Developer', 
      date: 'Apr 25, 2024', 
      status: 'Reviewed',
      location: 'Bangalore',
      stipend: '₹30,000',
      gradient: 'from-violet-500 to-purple-500',
      timeline: ['Applied', 'Reviewed']
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selected': return 'bg-green-100 text-green-700';
      case 'Reviewed': return 'bg-blue-100 text-blue-700';
      case 'Pending': return 'bg-orange-100 text-orange-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600 mt-1">Track and manage all your internship applications</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
          Apply New
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Total Applied</span>
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">6</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">6</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Selected</span>
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-bold text-lg">2</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">2</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Under Review</span>
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">2</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">2</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Pending</span>
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <span className="text-orange-600 font-bold text-lg">1</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">1</p>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-6">
              {/* Company Logo */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0`}>
                {app.logo}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{app.role}</h3>
                    <p className="text-gray-600 font-medium">{app.company}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Applied on {app.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {app.location}
                  </span>
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {app.stipend}/month
                  </span>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-2 mb-4">
                  {app.timeline.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                        {step}
                      </span>
                      {index < app.timeline.length - 1 && (
                        <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all hover:scale-105">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
