import { useState, useEffect } from 'react';
import { Plus, MapPin, Calendar, Users, Edit3, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../../../utils/axiosInstance';
import PostInternshipModal from './components/PostInternshipModal';
import { unwrapList } from '../../../../utils/api';

export default function CompanyInternships() {
    const [internships, setInternships] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingInternship, setEditingInternship] = useState(null);

    const fetchInternships = async () => {
        setLoading(true);
        try {
            const [internRes, appRes] = await Promise.allSettled([
                axiosInstance.get('/internships/me'),
                axiosInstance.get('/applications/company')
            ]);
            const allInternships = internRes.status === 'fulfilled' ? unwrapList(internRes.value) : [];
            const allApplications = appRes.status === 'fulfilled' ? unwrapList(appRes.value) : [];
            setInternships(allInternships);
            setApplications(allApplications);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to load internships');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInternships();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this internship?')) return;
        try {
            await axiosInstance.delete(`/internships/${id}`);
            toast.success('Internship deleted successfully');
            fetchInternships();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete internship');
        }
    };

    const handleEdit = (intern) => {
        setEditingInternship(intern);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingInternship(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Manage Internships</h1>
                    <p className="text-slate-500 text-sm">Create, edit and manage your internship listings</p>
                </div>
                <button
                    onClick={() => {
                        setEditingInternship(null);
                        setIsModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition-all text-sm w-fit"
                >
                    <Plus size={18} />
                    Post New Internship
                </button>
            </div>

            {/* List */}
            {loading ? (
                <div className="flex justify-center items-center h-48 text-slate-400">Loading internships...</div>
            ) : internships.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-100">
                    <p className="text-slate-500 mb-4">You haven&apos;t posted any internships yet.</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm"
                    >
                        Post Your First Internship
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {internships.map((intern) => (
                        <div key={intern._id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:border-slate-200 transition-all">
                            <div>
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{intern.title}</h3>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                                        intern.status === 'open' 
                                            ? 'bg-emerald-50 text-emerald-600' 
                                            : 'bg-slate-100 text-slate-600'
                                    }`}>
                                        {intern.status || 'open'}
                                    </span>
                                </div>

                                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{intern.description}</p>

                                <div className="space-y-2 text-xs text-slate-500 mb-6">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-slate-400" />
                                        <span>{intern.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-slate-400" />
                                        <span>{intern.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users size={14} className="text-slate-400" />
                                        <span>
                                            {applications.filter(a => (a.internship?._id || a.internship) === intern._id).length} Applicants • {intern.positions} open
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                                <span className="text-xs font-bold text-slate-700">
                                    {intern.stipend ? `₹${intern.stipend}/mo` : 'Unpaid'}
                                </span>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => handleEdit(intern)}
                                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit3 size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(intern._id)}
                                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <PostInternshipModal 
                isOpen={isModalOpen} 
                onClose={handleModalClose} 
                onInternshipSaved={fetchInternships} 
                editingInternship={editingInternship}
            />
        </div>
    );
}
