import { useState } from 'react';

export default function ApplyInternship() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Apply for Internship</h1>
        <p className="text-gray-600 mt-1">Fill in your details to apply for this position</p>
      </div>

      {/* Company Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold">
            G
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Software Engineer Intern</h2>
            <p className="text-blue-100 mb-3">Google India • Bangalore • Remote • 6 Months</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm">React</span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm">Node.js</span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm">Python</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm mb-1">Stipend</p>
            <p className="text-3xl font-bold">₹80K</p>
            <p className="text-blue-100 text-sm">per month</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step 
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <span className={`text-xs mt-2 font-medium ${currentStep >= step ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step === 1 && 'Personal'}
                  {step === 2 && 'Education'}
                  {step === 3 && 'Experience'}
                  {step === 4 && 'Review'}
                </span>
              </div>
              {step < 4 && (
                <div className={`h-1 flex-1 ${currentStep > step ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  defaultValue="Rahul Sharma"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input 
                  type="email" 
                  defaultValue="rahul.sharma@university.edu"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  defaultValue="+91 98765 43210"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                <input 
                  type="date" 
                  defaultValue="2002-05-15"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn Profile</label>
                <input 
                  type="url" 
                  placeholder="https://linkedin.com/in/your-profile"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub Profile</label>
                <input 
                  type="url" 
                  placeholder="https://github.com/your-profile"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Educational Background</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">University *</label>
                <input 
                  type="text" 
                  defaultValue="MIT University"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Degree *</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>B.Tech</option>
                  <option>B.E</option>
                  <option>BCA</option>
                  <option>MCA</option>
                  <option>M.Tech</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Major/Department *</label>
                <input 
                  type="text" 
                  defaultValue="Computer Science"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Year *</label>
                <select defaultValue="4" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Final Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CGPA/Percentage *</label>
                <input 
                  type="text" 
                  defaultValue="8.7"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Graduation *</label>
                <input 
                  type="month" 
                  defaultValue="2024-06"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Experience & Skills</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Technical Skills *</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {['React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker'].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                    {skill} <button className="ml-2 text-blue-900">×</button>
                  </span>
                ))}
              </div>
              <input 
                type="text" 
                placeholder="Add more skills..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Previous Internships (Optional)</label>
              <textarea 
                rows="4"
                placeholder="Describe your previous internship experience..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Projects *</label>
              <textarea 
                rows="4"
                placeholder="Describe your relevant projects..."
                defaultValue="E-commerce Website: Built a full-stack e-commerce platform using React, Node.js, and MongoDB."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Resume *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-gray-700 font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-gray-500 text-sm">PDF, DOC (max. 5MB)</p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Review Application</h3>
            
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-4">Application Summary</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-semibold text-gray-900">Rahul Sharma</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">rahul.sharma@university.edu</p>
                </div>
                <div>
                  <p className="text-gray-600">University</p>
                  <p className="font-semibold text-gray-900">MIT University</p>
                </div>
                <div>
                  <p className="text-gray-600">CGPA</p>
                  <p className="font-semibold text-gray-900">8.7</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker'].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <input type="checkbox" className="mt-1 w-5 h-5 text-blue-600 rounded" />
                <span className="text-sm text-gray-700">
                  I confirm that all information provided is accurate and I agree to the terms and conditions.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Next Step
            </button>
          ) : (
            <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
