import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, FileText, Users, TrendingUp, MapPin, Calendar, ChevronRight, Plus } from 'lucide-react';
import axiosInstance from '../../../../utils/axiosInstance';

const StatCard = ({ Icon, label, value, colorClass, gradientClass }) => (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full ${gradientClass} opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-20`}></div>
        <div className="relative flex items-center gap-5">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${colorClass} shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <Icon size={26} className="text-white" />
            </div>
            <div>
                <p className="text-3xl font-extrabold text-slate-800 tracking-tight">{value}</p>
                <p className="text-sm font-medium text-slate-500 mt-0.5">{label}</p>
            </div>
        </div>
    </div>
);

export default function CompanyDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ internships: 0, applications: 0 });
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get('/internships/me');
                const allInternships = res.data?.data || [];
                setInternships(allInternships.slice(0, 5));
                setStats(prev => ({ ...prev, internships: allInternships.length }));
            } catch {
                // Silently fail for dashboard stats
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="h-32 rounded-3xl bg-slate-200"></div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 rounded-2xl bg-slate-200"></div>
                    ))}
                </div>
                <div className="h-96 rounded-2xl bg-slate-200"></div>
            </div>
        );
    }

    return (
        <div className="pb-10">
            {/* Header Section */}
            <div className="mb-8 relative overflow-hidden rounded-3xl bg-slate-900 p-8 shadow-lg">
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-emerald-500 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Dashboard Overview</h1>
                        <p className="text-slate-300 mt-2 text-base max-w-lg">
                            Track your internship postings, manage applications, and find the perfect candidates for your team.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <button onClick={() => navigate('/company/internships')} className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0">
                            <Plus size={20} strokeWidth={2.5} />
                            Post Internship
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                <StatCard 
                    Icon={Briefcase} 
                    label="Total Internships" 
                    value={stats.internships} 
                    colorClass="bg-gradient-to-br from-emerald-400 to-emerald-600" 
                    gradientClass="bg-emerald-500" 
                />
                <StatCard 
                    Icon={FileText} 
                    label="Applications" 
                    value={stats.applications} 
                    colorClass="bg-gradient-to-br from-blue-400 to-blue-600" 
                    gradientClass="bg-blue-500" 
                />
                <StatCard 
                    Icon={Users} 
                    label="Accepted Interns" 
                    value={0} 
                    colorClass="bg-gradient-to-br from-purple-400 to-purple-600" 
                    gradientClass="bg-purple-500" 
                />
                <StatCard 
                    Icon={TrendingUp} 
                    label="Active Postings" 
                    value={internships.filter(i => i.status === 'open').length} 
                    colorClass="bg-gradient-to-br from-amber-400 to-amber-600" 
                    gradientClass="bg-amber-500" 
                />
            </div>

            {/* Recent Internships Section */}
            <div className="rounded-3xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 bg-slate-50/50">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Recent Internships</h2>
                    <button onClick={() => navigate('/company/internships')} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                        View All &rarr;
                    </button>
                </div>
                
                <div className="p-2">
                    {internships.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                                <Briefcase className="text-slate-400" size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-700">No internships posted yet</h3>
                            <p className="text-slate-500 mt-2 max-w-sm">
                                Get started by creating your first internship posting to attract talented candidates.
                            </p>
                            <button onClick={() => navigate('/company/internships')} className="mt-6 font-semibold text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-4 transition-all">
                                Post an internship now
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            {internships.map((intern, index) => (
                                <div 
                                    key={intern._id || index} 
                                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-200 cursor-pointer"
                                >
                                    <div className="flex items-start sm:items-center gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100 group-hover:text-emerald-700">
                                            <Briefcase size={22} strokeWidth={2} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 text-base group-hover:text-emerald-700 transition-colors">{intern.title}</p>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs font-medium text-slate-500">
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin size={14} className="text-slate-400" /> 
                                                    {intern.location || 'Remote'}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar size={14} className="text-slate-400" /> 
                                                    {intern.duration || '3 Months'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pl-16 sm:pl-0">
                                        <span className={`rounded-full px-3.5 py-1 text-xs font-bold ring-1 ring-inset ${
                                            intern.status === 'open' 
                                                ? 'bg-emerald-50 text-emerald-700 ring-emerald-500/20' 
                                                : 'bg-slate-50 text-slate-600 ring-slate-500/20'
                                        }`}>
                                            {intern.status === 'open' ? 'Active' : 'Closed'}
                                        </span>
                                        <button onClick={() => navigate('/company/internships')} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors sm:opacity-0 group-hover:opacity-100 focus:opacity-100">
                                            <ChevronRight size={20} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
