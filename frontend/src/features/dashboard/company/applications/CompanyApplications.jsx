import { useState, useEffect, useMemo } from 'react';
import { FileText, Search, CheckCircle2, XCircle } from 'lucide-react';
import axiosInstance from '../../../../utils/axiosInstance';
import { unwrapList } from '../../../../utils/api';
import toast from 'react-hot-toast';

export default function CompanyApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get('/applications/company');
            setApplications(unwrapList(res));
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to fetch applications');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        const previousApplications = [...applications];
        setApplications(prev => prev.map(a => a._id === id ? { ...a, status } : a));
        try {
            await axiosInstance.patch(`/applications/${id}/status`, { status });
            toast.success(`Application marked as ${status}`);
        } catch (err) {
            setApplications(previousApplications);
            toast.error(err.response?.data?.message || 'Failed to update status');
        }
    };

    const filteredApplications = useMemo(() => {
        return applications.filter(app => {
            const studentName = app.studentName || app.studentProfile?.fullName || app.student?.name || app.student?.email || '';
            const internTitle = app.internship?.title || '';
            const query = searchQuery.toLowerCase();
            const matchesSearch = studentName.toLowerCase().includes(query) || internTitle.toLowerCase().includes(query);
            const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [applications, searchQuery, statusFilter]);

    if (loading) return <div className="animate-pulse h-96 bg-slate-200 rounded-2xl"></div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Applications</h1>
                    <p className="text-slate-500 text-sm mt-1">Review and manage student applications</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search applications..." 
                            className="input-field pl-10 w-full" 
                        />
                    </div>
                    <select
                        aria-label="Filter by application status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="p-2.5 border border-slate-200 rounded-xl text-slate-600 bg-white text-sm outline-none cursor-pointer"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                {filteredApplications.length === 0 ? (
                    <div className="p-16 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                            <FileText size={32} className="text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">No applications yet</h3>
                        <p className="text-slate-500 mt-2 max-w-md mx-auto">
                            Once students apply to your internship postings, their applications will appear here for you to review.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                                    <th className="px-6 py-4">Applicant</th>
                                    <th className="px-6 py-4">Internship</th>
                                    <th className="px-6 py-4">Applied Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Resume</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {filteredApplications.map((app) => (
                                    <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-800">{app.studentName || app.studentProfile?.fullName || app.student?.name || 'Student Applicant'}</div>
                                            <div className="text-xs text-slate-400">{app.studentCollege || app.studentProfile?.university || app.student?.email || ''}</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-700">
                                            {app.internship?.title || 'Internship Position'}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 text-xs">
                                            {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                                                app.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                                                app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                app.status === 'shortlisted' ? 'bg-blue-100 text-blue-800' :
                                                'bg-amber-100 text-amber-800'
                                            }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {(app.resumeUrl || app.studentProfile?.resumeUrl) ? (
                                                <a 
                                                    href={app.resumeUrl || app.studentProfile?.resumeUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                                                >
                                                    <FileText size={14} /> View
                                                </a>
                                            ) : (
                                                <span className="text-xs text-slate-400">Not provided</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                {app.status !== 'accepted' && (
                                                    <button 
                                                        onClick={() => handleStatusUpdate(app._id, 'accepted')}
                                                        className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1"
                                                    >
                                                        <CheckCircle2 size={13} /> Accept
                                                    </button>
                                                )}
                                                {app.status !== 'rejected' && (
                                                    <button 
                                                        onClick={() => handleStatusUpdate(app._id, 'rejected')}
                                                        className="px-2.5 py-1 text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-1"
                                                    >
                                                        <XCircle size={13} /> Reject
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
