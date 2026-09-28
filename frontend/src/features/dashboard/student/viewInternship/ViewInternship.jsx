import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewInternships() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedInternship, setSelectedInternship] = useState(null);

  const internships = [
    {
      id: 1,
      company: "Google India",
      logo: "G",
      position: "Software Engineer Intern",
      location: "Bangalore, India",
      type: "Remote",
      duration: "6 Months",
      stipend: "₹80,000/month",
      posted: "2 days ago",
      deadline: "May 30, 2024",
      skills: ["React", "Node.js", "Python"],
      applicants: 245,
      gradient: "from-red-500 to-orange-500",
      description:
        "We are looking for a passionate Software Engineer Intern to join our team in Bangalore. You will work closely with senior engineers to design, build, and maintain scalable web applications used by millions of users worldwide.",
      responsibilities: [
        "Collaborate with cross-functional teams to design and ship new features",
        "Write clean, maintainable, and efficient code",
        "Participate in code reviews and testing",
        "Debug and resolve technical issues",
      ],
      requirements: [
        "Currently pursuing a degree in Computer Science or related field",
        "Strong understanding of data structures and algorithms",
        "Familiarity with React, Node.js, or Python",
        "Good problem-solving and communication skills",
      ],
      perks: ["Certificate of completion", "Letter of recommendation", "Full-time PPO opportunity", "Flexible working hours"],
    },
    {
      id: 2,
      company: "Microsoft",
      logo: "M",
      position: "Cloud Developer Intern",
      location: "Hyderabad, India",
      type: "Hybrid",
      duration: "6 Months",
      stipend: "₹75,000/month",
      posted: "5 days ago",
      deadline: "June 5, 2024",
      skills: ["Azure", "C#", "Docker"],
      applicants: 189,
      gradient: "from-blue-500 to-cyan-500",
      description:
        "Join Microsoft's Cloud team as an intern and get hands-on experience building and deploying scalable cloud-native applications on Azure.",
      responsibilities: [
        "Develop and deploy microservices on Azure",
        "Containerize applications using Docker",
        "Work with the team to improve CI/CD pipelines",
        "Monitor and optimize cloud infrastructure",
      ],
      requirements: [
        "Knowledge of C# and .NET framework",
        "Basic understanding of cloud computing concepts",
        "Experience with Docker is a plus",
        "Willingness to learn Azure services",
      ],
      perks: ["Certificate of completion", "Mentorship from senior engineers", "Networking events", "Employee discounts"],
    },
    {
      id: 3,
      company: "Amazon",
      logo: "A",
      position: "Backend Developer Intern",
      location: "Mumbai, India",
      type: "On-site",
      duration: "4 Months",
      stipend: "₹70,000/month",
      posted: "1 week ago",
      deadline: "June 10, 2024",
      skills: ["Java", "AWS", "SQL"],
      applicants: 312,
      gradient: "from-orange-500 to-amber-500",
      description:
        "As a Backend Developer Intern at Amazon, you will build and maintain high performance, reliable backend services that power Amazon's e-commerce platform.",
      responsibilities: [
        "Design and implement RESTful APIs",
        "Optimize database queries for performance",
        "Work with AWS services like EC2, S3, and Lambda",
        "Write unit and integration tests",
      ],
      requirements: [
        "Strong knowledge of Java and OOP concepts",
        "Understanding of relational databases and SQL",
        "Familiarity with AWS is a plus",
        "Good analytical and debugging skills",
      ],
      perks: ["Certificate of completion", "Relocation assistance", "Free meals on-site", "Full-time PPO opportunity"],
    },
    {
      id: 4,
      company: "Meta",
      logo: "F",
      position: "Frontend Developer Intern",
      location: "Pune, India",
      type: "Remote",
      duration: "6 Months",
      stipend: "₹85,000/month",
      posted: "3 days ago",
      deadline: "June 1, 2024",
      skills: ["React", "JavaScript", "CSS"],
      applicants: 278,
      gradient: "from-blue-600 to-indigo-600",
      description:
        "Meta is looking for a Frontend Developer Intern to help build delightful, performant user interfaces for our family of apps.",
      responsibilities: [
        "Build reusable UI components with React",
        "Collaborate with designers to implement pixel-perfect UI",
        "Improve web performance and accessibility",
        "Write clean and well-tested code",
      ],
      requirements: [
        "Solid understanding of JavaScript, HTML, and CSS",
        "Experience with React or similar frameworks",
        "Eye for design and attention to detail",
        "Good communication skills",
      ],
      perks: ["Certificate of completion", "Remote work stipend", "Mentorship program", "Full-time PPO opportunity"],
    },
    {
      id: 5,
      company: "TCS",
      logo: "T",
      position: "Full Stack Developer",
      location: "Chennai, India",
      type: "Hybrid",
      duration: "6 Months",
      stipend: "₹25,000/month",
      posted: "1 day ago",
      deadline: "May 25, 2024",
      skills: ["React", "Node.js", "MongoDB"],
      applicants: 156,
      gradient: "from-purple-500 to-pink-500",
      description:
        "TCS is offering a Full Stack Developer internship for students who want to gain real-world experience building end-to-end web applications.",
      responsibilities: [
        "Develop full stack features using the MERN stack",
        "Integrate front-end UI with backend APIs",
        "Participate in daily stand-ups and sprint planning",
        "Fix bugs and improve application performance",
      ],
      requirements: [
        "Basic knowledge of React, Node.js, and MongoDB",
        "Understanding of REST APIs",
        "Willingness to learn and adapt quickly",
        "Good team collaboration skills",
      ],
      perks: ["Certificate of completion", "Training sessions", "Letter of recommendation", "Possibility of full-time offer"],
    },
    {
      id: 6,
      company: "Infosys",
      logo: "I",
      position: "Data Science Intern",
      location: "Bangalore, India",
      type: "On-site",
      duration: "5 Months",
      stipend: "₹30,000/month",
      posted: "4 days ago",
      deadline: "June 8, 2024",
      skills: ["Python", "ML", "Pandas"],
      applicants: 203,
      gradient: "from-violet-500 to-purple-500",
      description:
        "Join Infosys as a Data Science Intern and work on real-world datasets to build machine learning models that drive business decisions.",
      responsibilities: [
        "Clean and preprocess large datasets",
        "Build and evaluate machine learning models",
        "Visualize data insights for stakeholders",
        "Document findings and present results",
      ],
      requirements: [
        "Good knowledge of Python and Pandas",
        "Understanding of machine learning fundamentals",
        "Familiarity with data visualization tools",
        "Strong analytical thinking",
      ],
      perks: ["Certificate of completion", "Hands-on project experience", "Mentorship from data scientists", "Full-time PPO opportunity"],
    },
  ];

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

          {/* Search */}
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
                placeholder="Search internships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" w-full
                  pl-10 sm:pl-12
                  pr-4
                  py-2.5 sm:py-3
                  text-sm sm:text-base
                  bg-gray-50
                  border border-gray-200
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />
            </div>
          </div>

          {/* Type */}
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="
              w-full
              px-4
              py-2.5 sm:py-3
              text-sm sm:text-base
              bg-gray-50
              border border-gray-200
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <option value="all">All Types</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">On-site</option>
          </select>

          {/* Location */}
          <select
            className="
              w-full
              px-4
              py-2.5 sm:py-3
              text-sm sm:text-base
              bg-gray-50
              border border-gray-200
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <option>All Locations</option>
            <option>Bangalore</option>
            <option>Mumbai</option>
            <option>Hyderabad</option>
            <option>Pune</option>
            <option>Chennai</option>
          </select>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">

          <button className="px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-xs sm:text-sm font-medium hover:bg-blue-200 transition-colors">
            Tech
          </button>

          <button className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors">
            Finance
          </button>

          <button className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors">
            Marketing
          </button>

          <button className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors">
            Design
          </button>

          <button className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors">
            Data Science
          </button>
        </div>
      </div>

      {/* Result Count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <p className="text-sm sm:text-base text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {internships.length}
          </span>{" "}
          internships
        </p>

        <select
          className="
            w-full sm:w-auto
            px-4 py-2
            bg-white
            border border-gray-200
            rounded-xl
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        >
          <option>Most Recent</option>
          <option>Highest Stipend</option>
          <option>Ending Soon</option>
          <option>Most Applied</option>
        </select>
      </div>

      {/* Internship Cards */}
      <div className="grid gap-4 sm:gap-6">

        {internships.map((internship) => (
          <div
            key={internship.id}
            className="
              bg-white
              rounded-xl sm:rounded-2xl
              p-4 sm:p-6
              border border-gray-200
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
              sm:hover:scale-[1.01]
              group
            "
          >
            <div className="flex items-start gap-0 sm:gap-5 lg:gap-6">

              {/* Company Logo */}
              {/* Hidden on mobile */}
              <div
                className={`
                  hidden sm:flex
                  w-14 h-14 lg:w-16 lg:h-16
                  rounded-2xl
                  bg-gradient-to-br ${internship.gradient}
                  items-center justify-center
                  text-white
                  text-xl lg:text-2xl
                  font-bold
                  shadow-lg
                  flex-shrink-0
                  group-hover:scale-110
                  transition-transform
                  duration-300
                `}
              >
                {internship.logo}
              </div>

              {/* Card Content */}
              <div className="flex-1 min-w-0">

                {/* Title */}
                <div className="
                  flex flex-col
                  sm:flex-row
                  sm:items-start
                  sm:justify-between
                  gap-3
                  mb-4
                ">
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {internship.position}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 font-medium mt-1">
                      {internship.company}
                    </p>
                  </div>


                </div>

                {/* Internship Details */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">

                  {/* Location */}
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-gray-100 rounded-lg">

                    <svg
                      className="w-4 h-4 text-gray-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>

                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {internship.location}
                    </span>
                  </div>

                  {/* Type */}
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-blue-50 rounded-lg">

                    <svg
                      className="w-4 h-4 text-blue-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>

                    <span className="text-xs sm:text-sm font-medium text-blue-700">
                      {internship.type}
                    </span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-purple-50 rounded-lg">

                    <svg
                      className="w-4 h-4 text-purple-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <span className="text-xs sm:text-sm font-medium text-purple-700">
                      {internship.duration}
                    </span>
                  </div>

                  {/* Stipend */}
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-green-50 rounded-lg">

                    <svg
                      className="w-4 h-4 text-green-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <span className="text-xs sm:text-sm font-medium text-green-700">
                      {internship.stipend}
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {internship.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="
                        px-2.5 sm:px-3
                        py-1
                        bg-gray-100
                        text-gray-700
                        rounded-lg
                        text-xs
                        font-medium
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Apply & View Details buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate("/students/apply")}
                    className="
                        w-full sm:w-auto
                        flex-shrink-0
                        px-5 sm:px-6
                        py-2.5
                        bg-gradient-to-r
                        from-blue-600
                        to-purple-600
                        text-white
                        rounded-xl
                        text-sm sm:text-base
                        font-semibold
                        hover:shadow-lg
                        transition-all
                        sm:hover:scale-105
                      "
                  >
                    Apply Now
                  </button>

                  <button
                    onClick={() => setSelectedInternship(internship)}
                    className="
                        w-full sm:w-auto
                        flex-shrink-0
                        px-5 sm:px-6
                        py-2.5
                        bg-white
                        text-blue-700
                        rounded-xl
                        text-sm sm:text-base
                        font-semibold
                        border-2
                        border-blue-600
                        hover:bg-blue-50
                        transition-all
                        sm:hover:scale-105
                      "
                  >
                    View Details
                  </button>
                </div>

                {/* Card Footer */}
                <div className="
                  flex flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-3
                  pt-4
                  mt-4
                  border-t
                  border-gray-100
                ">

                  <div className="
                    flex flex-wrap
                    items-center
                    gap-2 sm:gap-6
                    text-xs sm:text-sm
                    text-gray-600
                  ">
                    <span>
                      Posted {internship.posted}
                    </span>

                    <span className="flex items-center gap-1">

                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>

                      {internship.applicants} applicants
                    </span>
                  </div>

                  <span className="text-xs sm:text-sm font-medium text-orange-600">
                    Deadline: {internship.deadline}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-2">
        <button
          className="
            w-full sm:w-auto
            px-6 sm:px-8
            py-3
            bg-white
            text-gray-700
            rounded-xl
            font-semibold
            border-2
            border-gray-200
            hover:border-blue-600
            hover:text-blue-600
            transition-all
          "
        >
          Load More Internships
        </button>
      </div>

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
                  className={`
                    hidden sm:flex
                    w-12 h-12 sm:w-14 sm:h-14
                    rounded-2xl
                    bg-gradient-to-br ${selectedInternship.gradient}
                    items-center justify-center
                    text-white
                    text-lg sm:text-xl
                    font-bold
                    shadow-lg
                    flex-shrink-0
                  `}
                >
                  {selectedInternship.logo}
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                    {selectedInternship.position}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 font-medium">
                    {selectedInternship.company}
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

              {/* Quick Info */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-gray-100 rounded-lg">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    📍 {selectedInternship.location}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-blue-50 rounded-lg">
                  <span className="text-xs sm:text-sm font-medium text-blue-700">
                    🏢 {selectedInternship.type}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-purple-50 rounded-lg">
                  <span className="text-xs sm:text-sm font-medium text-purple-700">
                    ⏳ {selectedInternship.duration}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-green-50 rounded-lg">
                  <span className="text-xs sm:text-sm font-medium text-green-700">
                    💰 {selectedInternship.stipend}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                  About the Internship
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {selectedInternship.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                  Responsibilities
                </h3>
                <ul className="space-y-2">
                  {selectedInternship.responsibilities.map((item, index) => (
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

              {/* Requirements */}
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

              {/* Skills */}
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

              {/* Perks */}
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

              {/* Meta info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-600">
                <span>Posted {selectedInternship.posted}</span>
                <span>{selectedInternship.applicants} applicants</span>
                <span className="font-medium text-orange-600">
                  Deadline: {selectedInternship.deadline}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row gap-3 p-5 sm:p-6 border-t border-gray-100 sticky bottom-0 bg-white rounded-b-2xl">
              <button
                onClick={() => setSelectedInternship(null)}
                className="
                  w-full sm:w-auto
                  px-5 sm:px-6
                  py-2.5
                  bg-white
                  text-gray-700
                  rounded-xl
                  text-sm sm:text-base
                  font-semibold
                  border-2
                  border-gray-200
                  hover:border-gray-300
                  transition-all
                "
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedInternship(null);
                  navigate("/students/apply");
                }}
                className="
                  w-full sm:w-auto
                  flex-1
                  px-5 sm:px-6
                  py-2.5
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  text-white
                  rounded-xl
                  text-sm sm:text-base
                  font-semibold
                  hover:shadow-lg
                  transition-all
                "
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
