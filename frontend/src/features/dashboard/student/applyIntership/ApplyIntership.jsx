
import { useState } from "react";

export default function ApplyInternship() {
  const [currentStep, setCurrentStep] = useState(1);

  const skills = ["React", "Node.js", "Python", "MongoDB", "AWS", "Docker",];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* ================= HEADER ================= */}
      <div className="text-center px-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900"> Apply for Internship </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1"> Fill in your details to apply for this position </p>
      </div>

      {/* ================= COMPANY CARD ================= */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          {/* Company Logo */}
          {/* Hidden only on mobile */}
          <div
            className="hidden sm:flex w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-white/20 backdrop-blur-sm items-center justify-center text-2xl lg:text-3xl font-bold flex-shrink-0 "
          >
            G
          </div>

          {/* Company Information */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold mb-2"> Software Engineer Intern </h2>
            <p className="text-blue-100 text-sm sm:text-base mb-3"> Google India • Bangalore • Remote • 6 Months </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs sm:text-sm">React</span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs sm:text-sm"> Node.js </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs sm:text-sm"> Python </span>
            </div>
          </div>

          {/* Stipend */}
          <div className="sm:text-right border-t border-white/20 sm:border-0 pt-3 sm:pt-0 flex-shrink-0">
            <p className="text-blue-100 text-xs sm:text-sm mb-1"> Stipend </p>
            <p className="text-2xl sm:text-3xl font-bold"> ₹80K </p>
            <p className="text-blue-100 text-xs sm:text-sm"> per month </p>
          </div>
        </div>
      </div>

      {/* ================= PROGRESS STEPS ================= */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-start w-full">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className="flex items-start flex-1 min-w-0"
            >
              {/* Step */}
              <div className="flex flex-col items-center min-w-0">
                <div
                  className={` w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold flex-shrink-0 ${currentStep >= step ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white" : "bg-gray-200 text-gray-500"} `}
                >
                  {currentStep > step ? (
                    <svg
                      className="w-4 h-4 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (step)}
                </div>

                <span
                  className={` text-[10px] sm:text-xs mt-2 font-medium text-center ${currentStep >= step ? "text-gray-900" : "text-gray-500"} `}
                >
                  {step === 1 && "Personal"}
                  {step === 2 && "Education"}
                  {step === 3 && "Experience"}
                  {step === 4 && "Review"}
                </span>
              </div>

              {/* Progress Line */}
              {step < 4 && (
                <div
                  className={` h-1 flex-1 mt-[18px] sm:mt-[22px] mx-1 sm:mx-2 rounded-full ${currentStep > step ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gray-200"} `}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ================= FORM CONTAINER ================= */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 shadow-sm">
        {/* ================= STEP 1 ================= */}
        {currentStep === 1 && (
          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Full Name */}
              <div> 
                <label className="block text-sm font-semibold text-gray-700 mb-2"> Full Name * </label>
                <input type="text" defaultValue="Rahul Sharma" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>

                <input
                  type="email"
                  defaultValue="rahul.sharma@university.edu"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>

                <input
                  type="tel"
                  defaultValue="+91 98765 43210"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth *
                </label>

                <input
                  type="date"
                  defaultValue="2002-05-15"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* LinkedIn */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  LinkedIn Profile
                </label>

                <input
                  type="url"
                  placeholder="https://linkedin.com/in/your-profile"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Github */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  GitHub Profile
                </label>

                <input
                  type="url"
                  placeholder="https://github.com/your-profile"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2 ================= */}
        {currentStep === 2 && (
          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Educational Background
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* University */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  University *
                </label>

                <input
                  type="text"
                  defaultValue="MIT University"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Degree */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Degree *
                </label>

                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>B.Tech</option>
                  <option>B.E</option>
                  <option>BCA</option>
                  <option>MCA</option>
                  <option>M.Tech</option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Major / Department *
                </label>

                <input
                  type="text"
                  defaultValue="Computer Science"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Year *
                </label>

                <select
                  defaultValue="4"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Final Year</option>
                </select>
              </div>

              {/* CGPA */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  CGPA / Percentage *
                </label>

                <input
                  type="text"
                  defaultValue="8.7"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Graduation */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expected Graduation *
                </label>

                <input
                  type="month"
                  defaultValue="2024-06"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3 ================= */}
        {currentStep === 3 && (
          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Experience & Skills
            </h3>

            {/* Skills */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Technical Skills *
              </label>

              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs sm:text-sm font-medium"
                  >
                    {skill}

                    <button
                      type="button"
                      className="ml-2 text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <input
                type="text"
                placeholder="Add more skills..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Previous Internship */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Previous Internships (Optional)
              </label>

              <textarea
                rows="4"
                placeholder="Describe your previous internship experience..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>

            {/* Projects */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Projects *
              </label>

              <textarea
                rows="4"
                placeholder="Describe your relevant projects..."
                defaultValue="E-commerce Website: Built a full-stack e-commerce platform using React, Node.js, and MongoDB."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>

            {/* Resume */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Resume *
              </label>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>

                <p className="text-sm sm:text-base text-gray-700 font-medium mb-1">
                  Click to upload or drag and drop
                </p>

                <p className="text-xs sm:text-sm text-gray-500">
                  PDF, DOC (max. 5MB)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4 ================= */}
        {currentStep === 4 && (
          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Review Application
            </h3>

            {/* Summary */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-4">
                Application Summary
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Name</p>

                  <p className="font-semibold text-gray-900">
                    Rahul Sharma
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-gray-600">
                    Email
                  </p>

                  <p className="font-semibold text-gray-900 break-all">
                    rahul.sharma@university.edu
                  </p>
                </div>

                <div>
                  <p className="text-gray-600">
                    University
                  </p>

                  <p className="font-semibold text-gray-900">
                    MIT University
                  </p>
                </div>

                <div>
                  <p className="text-gray-600">
                    CGPA
                  </p>

                  <p className="font-semibold text-gray-900">
                    8.7
                  </p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Skills
              </h4>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs sm:text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-0.5 w-5 h-5 text-blue-600 rounded flex-shrink-0"
                />

                <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  I confirm that all information provided is accurate and I
                  agree to the terms and conditions.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* ================= NAVIGATION BUTTONS ================= */}
        <div className="flex items-center justify-between gap-3 pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-gray-200">
          {/* Previous */}
          <button
            type="button"
            onClick={() =>
              setCurrentStep((prev) => Math.max(1, prev - 1))
            }
            disabled={currentStep === 1}
            className="
              px-4 sm:px-6
              py-2.5 sm:py-3
              bg-gray-100
              text-gray-700
              rounded-xl
              text-sm sm:text-base
              font-semibold
              hover:bg-gray-200
              transition-colors
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Previous
          </button>

          {/* Next */}
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() =>
                setCurrentStep((prev) => Math.min(4, prev + 1))
              }
              className="
                px-4 sm:px-6
                py-2.5 sm:py-3
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
              Next Step
            </button>
          ) : (
            <button
              type="button"
              className="
                px-4 sm:px-8
                py-2.5 sm:py-3
                bg-gradient-to-r
                from-green-600
                to-emerald-600
                text-white
                rounded-xl
                text-sm sm:text-base
                font-semibold
                hover:shadow-lg
                transition-all
                sm:hover:scale-105
              "
            >
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
