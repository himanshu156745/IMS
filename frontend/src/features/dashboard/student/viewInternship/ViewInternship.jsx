import { useState } from 'react';

export default function ViewInternships() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const internships = [
    {
      id: 1,
      company: 'Google India',
      logo: 'G',
      position: 'Software Engineer Intern',
      location: 'Bangalore, India',
      type: 'Remote',
      duration: '6 Months',
      stipend: '₹80,000/month',
      posted: '2 days ago',
      deadline: 'May 30, 2024',
      skills: ['React', 'Node.js', 'Python'],
      applicants: 245,
      gradient: 'from-red-500 to-orange-500'
    },
    {
      id: 2,
      company: 'Microsoft',
      logo: 'M',
      position: 'Cloud Developer Intern',
      location: 'Hyderabad, India',
      type: 'Hybrid',
      duration: '6 Months',
      stipend: '₹75,000/month',
      posted: '5 days ago',
      deadline: 'June 5, 2024',
      skills: ['Azure', 'C#', 'Docker'],
      applicants: 189,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      company: 'Amazon',
      logo: 'A',
      position: 'Backend Developer Intern',
      location: 'Mumbai, India',
      type: 'On-site',
      duration: '4 Months',
      stipend: '₹70,000/month',
      posted: '1 week ago',
      deadline: 'June 10, 2024',
      skills: ['Java', 'AWS', 'SQL'],
      applicants: 312,
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      id: 4,
      company: 'Meta',
      logo: 'F',
      position: 'Frontend Developer Intern',
      location: 'Pune, India',
      type: 'Remote',
      duration: '6 Months',
      stipend: '₹85,000/month',
      posted: '3 days ago',
      deadline: 'June 1, 2024',
      skills: ['React', 'JavaScript', 'CSS'],
      applicants: 278,
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      id: 5,
      company: 'TCS',
      logo: 'T',
      position: 'Full Stack Developer',
      location: 'Chennai, India',
      type: 'Hybrid',
      duration: '6 Months',
      stipend: '₹25,000/month',
      posted: '1 day ago',
      deadline: 'May 25, 2024',
      skills: ['React', 'Node.js', 'MongoDB'],
      applicants: 156,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 6,
      company: 'Infosys',
      logo: 'I',
      position: 'Data Science Intern',
      location: 'Bangalore, India',
      type: 'On-site',
      duration: '5 Months',
      stipend: '₹30,000/month',
      posted: '4 days ago',
      deadline: 'June 8, 2024',
      skills: ['Python', 'ML', 'Pandas'],
      applicants: 203,
      gradient: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Browse Internships</h1>
        <p className="text-gray-600 mt-1">Discover and apply to exciting internship opportunities</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by company, position, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select 
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">On-site</option>
          </select>
          <select className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Locations</option>
            <option>Bangalore</option>
            <option>Mumbai</option>
            <option>Hyderabad</option>
            <option>Pune</option>
          </select>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-3 mt-4">
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-200 transition-colors">
            Tech
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
            Finance
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
            Marketing
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
            Design
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
            Data Science
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{internships.length}</span> internships
        </p>
        <select className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Most Recent</option>
          <option>Highest Stipend</option>
          <option>Ending Soon</option>
          <option>Most Applied</option>
        </select>
      </div>

      {/* Internship Cards */}
      <div className="grid gap-6">
        {internships.map((internship) => (
          <div
            key={internship.id}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
          >
            <div className="flex items-start gap-6">
              {/* Company Logo */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${internship.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                {internship.logo}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{internship.position}</h3>
                    <p className="text-gray-600 font-medium">{internship.company}</p>
                  </div>
                  <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
                    Apply Now
                  </button>
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">{internship.location}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span className="text-sm font-medium text-blue-700">{internship.type}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-purple-700">{internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-green-700">{internship.stipend}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {internship.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span>Posted {internship.posted}</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {internship.applicants} applicants
                    </span>
                  </div>
                  <span className="text-sm font-medium text-orange-600">
                    Deadline: {internship.deadline}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-8 py-3 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all">
          Load More Internships
        </button>
      </div>
    </div>
  );
}
