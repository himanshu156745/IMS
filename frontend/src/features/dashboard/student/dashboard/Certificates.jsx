import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../../../utils/axiosInstance';
import { FiDownload, FiExternalLink, FiAward, FiCheckCircle, FiClock, FiShield } from 'react-icons/fi';

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCertificates = async () => {
    try {
      const res = await axiosInstance.get('/certificates/me');
      setCertificates(res.data.data);
    } catch {
      toast.error('Failed to fetch certificates');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const getGradient = (index) => {
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-violet-500 to-purple-500'
    ];
    return gradients[index % gradients.length];
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
          <p className="text-gray-600 mt-1">View and verify your internship certificates</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
            <FiCheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Earned Certificates</p>
            <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
            <FiShield className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Verified Status</p>
            <p className="text-2xl font-bold text-gray-900">100%</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
            <FiClock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Latest Issue</p>
            <p className="text-lg font-bold text-gray-900">
              {certificates.length > 0 ? new Date(certificates[0].issueDate).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      {certificates.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAward className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No Certificates Yet</h3>
          <p className="text-gray-500 mt-2">Complete your internships to earn certificates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <div key={cert._id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden group">
              {/* Certificate Visual */}
              <div className={`h-48 bg-gradient-to-br ${getGradient(index)} p-6 relative overflow-hidden flex flex-col justify-between`}>
                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 p-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

                <div className="relative z-10 flex justify-between items-start">
                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/30 text-white font-bold tracking-wider">
                    {cert.internship?.company?.name || 'Company'}
                  </div>
                  <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-xl border border-white/30 flex items-center justify-center text-white font-bold text-xl">
                    <FiAward />
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-1 line-clamp-2">
                    {cert.internship?.title || 'Internship Completion'}
                  </h3>
                  <p className="text-white/80 font-medium">Certificate of Completion</p>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Issue Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(cert.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Verification ID</p>
                    <p className="font-semibold text-gray-900 font-mono text-sm">{cert.certificateId}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      <FiCheckCircle className="text-green-500" />
                      <span className="font-semibold text-green-600">Verified</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-6 border-t border-gray-100">
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiDownload className="w-4 h-4" />
                    Download PDF
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/verify/${cert.certificateId}`);
                      toast.success("Verification link copied!");
                    }}
                    className="px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
                    title="Copy Verification Link"
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
