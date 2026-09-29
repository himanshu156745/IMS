import { useState, useEffect } from 'react';
import { FileText, Search, Filter } from 'lucide-react';
import axiosInstance from '../../../../utils/axiosInstance';

export default function CompanyApplications() {
    const [, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                // TODO: create a real endpoint to fetch all applications for a company's internships
                // For now, we will just mock or gracefully handle 404
                const res = await axiosInstance.get('/applications/company').catch(() => ({ data: { data: [] } }));
                setApplications(res.data?.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

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
                        <input type="text" placeholder="Search applications..." className="input-field pl-10 w-full" />
                    </div>
                    <button className="p-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-16 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                        <FileText size={32} className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700">No applications yet</h3>
                    <p className="text-slate-500 mt-2 max-w-md mx-auto">
                        Once students apply to your internship postings, their applications will appear here for you to review.
                    </p>
                </div>
            </div>
        </div>
    );
}
