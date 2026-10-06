import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import { unwrapList } from "../../../../utils/api";

export default function ViewInternships() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/internships");
        setInternships(unwrapList(res));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch internships");
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);

  const getCompanyName = (company) => {
    if (typeof company === "object" && company !== null) {
      return company.name || "Unknown Company";
    }
    return company || "Unknown Company";
  };

  const formatStipend = (stipend) => {
    if (!stipend) return null;
    if (typeof stipend === "number") return `₹${stipend}/month`;
    return stipend.startsWith("₹") ? stipend : `₹${stipend}`;
  };

  const filteredInternships = internships.filter((internship) => {
    const title = internship.title || internship.position || "";
    const companyName = getCompanyName(internship.company);
    const skills = Array.isArray(internship.skills)
      ? internship.skills.join(" ")
      : Array.isArray(internship.requirements)
      ? internship.requirements.join(" ")
      : "";

    const matchesSearch =
      !searchQuery ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skills.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedFilter === "all" ||
      (internship.type &&
        internship.type.toLowerCase() === selectedFilter.toLowerCase());

    return matchesSearch && matchesType;
  });

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Browse Internships
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Discover and apply to exciting internship opportunities
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <div className="relative">
              <svg
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by company, position, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Type Filter */}
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">On-site</option>
          </select>

          {/* Location Filter */}
          <select className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Locations</option>
            <option>Bangalore</option>
            <option>Mumbai</option>
            <option>Hyderabad</option>
            <option>Pune</option>
            <option>Chennai</option>
          </select>
        </div>
      </div>

      {/* Result Count & Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm sm:text-base text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {filteredInternships.length}
          </span>{" "}
          internships
        </p>

        <select className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Most Recent</option>
          <option>Highest Stipend</option>
          <option>Ending Soon</option>
          <option>Most Applied</option>
        </select>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-2 text-gray-600 text-sm">Loading internships...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Internship Cards */}
      {!loading && !error && (
        <div className="grid gap-4 sm:gap-6">
          {filteredInternships.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-200 text-gray-500">
              No internships match your filter criteria.
            </div>
          ) : (
            filteredInternships.map((internship) => {
              const companyName = getCompanyName(internship.company);
              const skillsList =
                internship.skills || internship.requirements || [];

              return (
                <div
                  key={internship._id || internship.id}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 sm:hover:scale-[1.01] group"
                >
                  <div className="flex items-start gap-0 sm:gap-5 lg:gap-6">
                    {/* Company Logo Badge */}
                    <div
                      className={`hidden sm:flex w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${
                        internship.gradient || "from-blue-500 to-indigo-500"
                      } items-center justify-center text-white text-xl lg:text-2xl font-bold shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {internship.logo || companyName.charAt(0)}
                    </div>

                    {/* Card Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                            {internship.title || internship.position}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600 font-medium mt-1">
                            {companyName}
                          </p>
                        </div>
                      </div>

                      {/* Meta Details */}
                      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                        {internship.location && (
                          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-gray-100 rounded-lg">
                            <span className="text-xs sm:text-sm font-medium text-gray-700">
                              📍 {internship.location}
                            </span>
                          </div>
                        )}
                        {internship.type && (
                          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-blue-50 rounded-lg">
                            <span className="text-xs sm:text-sm font-medium text-blue-700">
                              🏢 {internship.type}
                            </span>
                          </div>
                        )}
                        {internship.duration && (
                          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-purple-50 rounded-lg">
                            <span className="text-xs sm:text-sm font-medium text-purple-700">
                              ⏳ {internship.duration}
                            </span>
                          </div>
                        )}
                        {internship.stipend && (
                          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-green-50 rounded-lg">
                            <span className="text-xs sm:text-sm font-medium text-green-700">
                              💰 {formatStipend(internship.stipend)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Skills/Requirements */}
                      {Array.isArray(skillsList) && skillsList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {skillsList.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2.5 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() =>
                            navigate(
                              `/students/apply/${internship._id || internship.id}`
                            )
                          }
                          className="w-full sm:w-auto flex-shrink-0 px-5 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg transition-all sm:hover:scale-105"
                        >
                          Apply Now
                        </button>

                        <button
                          onClick={() => setSelectedInternship(internship)}
                          className="w-full sm:w-auto flex-shrink-0 px-5 sm:px-6 py-2.5 bg-white text-blue-700 rounded-xl text-sm sm:text-base font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all sm:hover:scale-105"
                        >
                          View Details
                        </button>
                      </div>

                      {/* Card Footer */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 mt-4 border-t border-gray-100">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-6 text-xs sm:text-sm text-gray-600">
                          {internship.createdAt ? (
                            <span>
                              Posted on{" "}
                              {new Date(
                                internship.createdAt
                              ).toLocaleDateString()}
                            </span>
                          ) : (
                            internship.posted && (
                              <span>Posted {internship.posted}</span>
                            )
                          )}
                          {internship.positions !== undefined && (
                            <span>{internship.positions} positions available</span>
                          )}
                          {internship.applicants !== undefined && (
                            <span>{internship.applicants} applicants</span>
                          )}
                        </div>

                        {internship.deadline && (
                          <span className="text-xs sm:text-sm font-medium text-orange-600">
                            Deadline: {internship.deadline}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* View Details Modal */}
      {selectedInternship && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedInternship(null)}
        >
          <div
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <div className="flex items-center gap-4">
                <div
                  className={`hidden sm:flex w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${
                    selectedInternship.gradient || "from-blue-500 to-indigo-500"
                  } items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg flex-shrink-0`}
                >
                  {selectedInternship.logo ||
                    getCompanyName(selectedInternship.company).charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                    {selectedInternship.title || selectedInternship.position}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 font-medium">
                    {getCompanyName(selectedInternship.company)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedInternship(null)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
            <div className="p-5 sm:p-6 space-y-6">
              {/* Quick Details */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {selectedInternship.location && (
                  <span className="text-xs sm:text-sm font-medium px-3 py-1.5 bg-gray-100 rounded-lg">
                    📍 {selectedInternship.location}
                  </span>
                )}
                {selectedInternship.type && (
                  <span className="text-xs sm:text-sm font-medium px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg">
                    🏢 {selectedInternship.type}
                  </span>
                )}
                {selectedInternship.duration && (
                  <span className="text-xs sm:text-sm font-medium px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg">
                    ⏳ {selectedInternship.duration}
                  </span>
                )}
                {selectedInternship.stipend && (
                  <span className="text-xs sm:text-sm font-medium px-3 py-1.5 bg-green-50 text-green-700 rounded-lg">
                    💰 {formatStipend(selectedInternship.stipend)}
                  </span>
                )}
              </div>

              {/* Description */}
              {selectedInternship.description && (
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                    About the Internship
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {selectedInternship.description}
                  </p>
                </div>
              )}

              {/* Responsibilities */}
              {Array.isArray(selectedInternship.responsibilities) &&
                selectedInternship.responsibilities.length > 0 && (
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                      Responsibilities
                    </h3>
                    <ul className="space-y-2">
                      {selectedInternship.responsibilities.map(
                        (item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm sm:text-base text-gray-600"
                          >
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {/* Requirements */}
              {Array.isArray(selectedInternship.requirements) &&
                selectedInternship.requirements.length > 0 && (
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {selectedInternship.requirements.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm sm:text-base text-gray-600"
                        >
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Skills */}
              {Array.isArray(selectedInternship.skills) &&
                selectedInternship.skills.length > 0 && (
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                      Skills Required
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedInternship.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2.5 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs sm:text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Perks & Benefits */}
              {Array.isArray(selectedInternship.perks) &&
                selectedInternship.perks.length > 0 && (
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                      Perks & Benefits
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedInternship.perks.map((perk, index) => (
                        <span
                          key={index}
                          className="px-2.5 sm:px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs sm:text-sm font-medium"
                        >
                          ✨ {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Meta info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-600">
                {selectedInternship.createdAt ? (
                  <span>
                    Posted on{" "}
                    {new Date(
                      selectedInternship.createdAt
                    ).toLocaleDateString()}
                  </span>
                ) : (
                  selectedInternship.posted && (
                    <span>Posted {selectedInternship.posted}</span>
                  )
                )}
                {selectedInternship.applicants !== undefined && (
                  <span>{selectedInternship.applicants} applicants</span>
                )}
                {selectedInternship.deadline && (
                  <span className="font-medium text-orange-600">
                    Deadline: {selectedInternship.deadline}
                  </span>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row gap-3 p-5 sm:p-6 border-t border-gray-100 sticky bottom-0 bg-white rounded-b-2xl">
              <button
                onClick={() => setSelectedInternship(null)}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 bg-white text-gray-700 rounded-xl text-sm sm:text-base font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const targetId =
                    selectedInternship._id || selectedInternship.id;
                  setSelectedInternship(null);
                  navigate(
                    targetId
                      ? `/students/apply/${targetId}`
                      : "/students/apply"
                  );
                }}
                className="w-full sm:w-auto flex-1 px-5 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg transition-all"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}