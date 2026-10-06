import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axiosInstance from '../../../../../utils/axiosInstance';

export default function PostInternshipModal({ isOpen, onClose, onInternshipSaved, editingInternship }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        location: '',
        stipend: '',
        duration: '',
        positions: '',
        deadline: '',
        status: 'open'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (editingInternship) {
            setFormData({
                title: editingInternship.title || '',
                description: editingInternship.description || '',
                requirements: editingInternship.requirements || '',
                location: editingInternship.location || '',
                stipend: editingInternship.stipend || '',
                duration: editingInternship.duration || '',
                positions: editingInternship.positions || '',
                deadline: editingInternship.deadline ? new Date(editingInternship.deadline).toISOString().split('T')[0] : '',
                status: editingInternship.status || 'open'
            });
        } else {
            setFormData({
                title: '',
                description: '',
                requirements: '',
                location: '',
                stipend: '',
                duration: '',
                positions: '',
                deadline: '',
                status: 'open'
            });
        }
        setError('');
    }, [editingInternship, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (editingInternship) {
                await axiosInstance.patch(`/internships/${editingInternship._id}`, formData);
            } else {
                await axiosInstance.post('/internships', formData);
            }
            onInternshipSaved();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden my-8">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">
                        {editingInternship ? 'Edit Internship' : 'Post New Internship'}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Job Title</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    value={formData.title} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                                    placeholder="e.g. Software Engineer Intern"
                                    required 
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Location</label>
                                <input 
                                    type="text" 
                                    name="location" 
                                    value={formData.location} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                                    placeholder="e.g. Remote, New York, NY"
                                    required 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Duration</label>
                                <input 
                                    type="text" 
                                    name="duration" 
                                    value={formData.duration} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                                    placeholder="e.g. 3 Months, 6 Months"
                                    required 
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Positions Available</label>
                                <input 
                                    type="number" 
                                    name="positions" 
                                    value={formData.positions} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                                    placeholder="e.g. 5"
                                    min="1"
                                    required 
                                />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Stipend (Optional)</label>
                                <input 
                                    type="text" 
                                    name="stipend" 
                                    value={formData.stipend} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                                    placeholder="e.g. 10000 INR/month or Unpaid"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Application Deadline</label>
                                <input 
                                    type="date" 
                                    name="deadline" 
                                    value={formData.deadline} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                                    required 
                                />
                            </div>
                        </div>

                        {editingInternship && (
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                >
                                    <option value="open">Active (Open for applications)</option>
                                    <option value="closed">Closed (Not accepting applications)</option>
                                </select>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Description</label>
                            <textarea 
                                name="description" 
                                value={formData.description} 
                                onChange={handleChange} 
                                rows="3"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none" 
                                placeholder="Detail the role and responsibilities..."
                                required 
                            ></textarea>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Requirements & Skills</label>
                            <textarea 
                                name="requirements" 
                                value={formData.requirements} 
                                onChange={handleChange} 
                                rows="3"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none" 
                                placeholder="List the required skills and qualifications..."
                                required 
                            ></textarea>
                        </div>

                        <div className="pt-4 flex items-center justify-end gap-3">
                            <button 
                                type="button" 
                                onClick={onClose}
                                className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {loading && (
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {editingInternship ? 'Save Changes' : 'Post Internship'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
