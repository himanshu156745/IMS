import { useState, useEffect } from 'react';
import { Plus, MapPin, Calendar, Users, Edit3, Trash2 } from 'lucide-react';
import axiosInstance from '../../../../utils/axiosInstance';
import PostInternshipModal from './components/PostInternshipModal';
import { unwrapList } from '../../../../utils/api';

export default function CompanyInternships() {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingInternship, setEditingInternship] = useState(null);

    const fetchInternships = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/internships/me');
            setInternships(res.data?.data || []);
        } catch (err) {
            console.error(err);
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
            fetchInternships();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete internship');
        }
    };

    const handleEdit = (intern) => {
        setEditingInternship(intern);
        setIsModalOpen(true);
    };

    const handlePostNew = () => {
        setEditingInternship(null);
        setIsModalOpen(true);
    };

    if (loading && internships.length === 0) {
        return <div className="animate-pulse h-96 bg-slate-200 rounded-2xl"></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">My Internships</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage your posted internship opportunities</p>
                </div>
                <button onClick={handlePostNew} className="btn-primary flex items-center gap-2">
                    <Plus size={18} strokeWidth={2.5} />
                    <span>Post Internship</span>
                </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                                <th className="px-6 py-4">Position</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Applicants</th>
                                <th className="px-6 py-4">Posted Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {internships.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                        No internships found. Post one to get started!
                                    </td>
                                </tr>
                            ) : (
                                internships.map((intern) => (
                                    <tr key={intern._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-800">{intern.title}</div>
                                            <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-medium">
                                                <span className="flex items-center gap-1"><MapPin size={12} /> {intern.location || 'Remote'}</span>
                                                <span className="flex items-center gap-1"><Calendar size={12} /> {intern.duration || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                intern.status === 'open' 
                                                ? 'bg-emerald-100 text-emerald-800' 
                                                : 'bg-slate-100 text-slate-800'
                                            }`}>
                                                {intern.status === 'open' ? 'Active' : 'Closed'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-600">
                                            <div className="flex items-center gap-1.5">
                                                <Users size={16} className="text-slate-400" />
                                                0
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(intern.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleEdit(intern)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Edit3 size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(intern._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <PostInternshipModal 
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingInternship(null);
                }}
                onInternshipSaved={fetchInternships}
                editingInternship={editingInternship}
            />
        </div>
    );
}
