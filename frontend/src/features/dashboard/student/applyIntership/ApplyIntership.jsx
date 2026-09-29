import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../utils/axiosInstance';
import { useAuth } from '../../../../hooks/useAuth';

export default function ApplyInternship() {
  const { internshipId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [internship, setInternship] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Form State
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [internshipRes, profileRes] = await Promise.all([
          axiosInstance.get(`/internships/${internshipId}`),
          axiosInstance.get('/student-profiles/me').catch(() => null) // Ignore if no profile
        ]);
        
        setInternship(internshipRes.data.data);
        if (profileRes && profileRes.data.data) {
            setProfile(profileRes.data.data);
            setResumeUrl(profileRes.data.data.resumeUrl || '');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [internshipId]);

  const handleSubmit = async () => {
      try {
          setSubmitting(true);
          setError(null);
          await axiosInstance.post(`/applications/${internshipId}`, {
              resumeUrl,
              coverLetter
          });
          navigate('/students/applications');
      } catch (err) {
          setError(err.response?.data?.message || 'Failed to submit application');
      } finally {
          setSubmitting(false);
      }
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!internship) return <div className="p-8 text-center text-red-500">{error || 'Internship not found'}</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Apply for Internship</h1>
        <p className="text-gray-600 mt-1">Fill in your details to apply for this position</p>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>}

      {/* Company Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold">
            {internship.company?.name?.charAt(0) || 'C'}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{internship.title}</h2>
            <p className="text-blue-100 mb-3">{internship.company?.name} • {internship.location} • {internship.duration}</p>
            <div className="flex gap-2">
                {internship.requirements?.slice(0, 3).map((req, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm">{req}</span>
                ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm mb-1">Stipend</p>
            <p className="text-3xl font-bold">₹{internship.stipend}</p>
            <p className="text-blue-100 text-sm">per month</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
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
                  {step === 1 && 'Personal Info'}
                  {step === 2 && 'Application Docs'}
                  {step === 3 && 'Review'}
                </span>
              </div>
              {step < 3 && (
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
            <h3 className="text-xl font-bold text-gray-900">Personal Information (From Profile)</h3>
            <p className="text-sm text-gray-500 mb-4">Note: This is automatically fetched from your profile. Go to My Profile to edit.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  readOnly
                  value={profile?.fullName || ''}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  readOnly
                  value={user?.email || ''}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">University</label>
                <input 
                  type="text" 
                  readOnly
                  value={profile?.university || ''}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Course / Branch</label>
                <input 
                  type="text" 
                  readOnly
                  value={`${profile?.course || ''} / ${profile?.branch || ''}`}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Application Documents</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Resume URL (HTTPS required) *</label>
              <input 
                type="url"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">If you have uploaded one in your profile, it is pre-filled.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Letter (Optional)</label>
              <textarea 
                rows="6"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Why are you a great fit for this position?"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Review Application</h3>
            
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-4">Application Summary</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-semibold text-gray-900">{profile?.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Resume Link</p>
                  <p className="font-semibold text-blue-600 truncate"><a href={resumeUrl} target="_blank" rel="noreferrer">{resumeUrl || 'Not provided'}</a></p>
                </div>
                <div>
                  <p className="text-gray-600">Cover Letter</p>
                  <p className="font-semibold text-gray-900">{coverLetter ? 'Provided' : 'None'}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <input type="checkbox" className="mt-1 w-5 h-5 text-blue-600 rounded" required id="confirmCheck" />
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
            disabled={currentStep === 1 || submitting}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Next Step
            </button>
          ) : (
            <button 
                onClick={() => {
                    if(!document.getElementById('confirmCheck').checked) {
                        setError('Please check the confirmation box');
                        return;
                    }
                    handleSubmit();
                }}
                disabled={submitting}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
