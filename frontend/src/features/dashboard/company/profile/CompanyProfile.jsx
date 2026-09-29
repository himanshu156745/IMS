import { useState, useEffect } from 'react';
import { User, Building, MapPin, Globe, Loader2 } from 'lucide-react';
import axiosInstance from '../../../../utils/axiosInstance';
import toast from 'react-hot-toast';

export default function CompanyProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '', description: '', website: '', location: '', industry: '', hrName: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axiosInstance.get('/companies/me');
                if (res.data?.data) {
                    setProfile(res.data.data);
                    setFormData({
                        name: res.data.data.name || '',
                        description: res.data.data.description || '',
                        website: res.data.data.website || '',
                        location: res.data.data.location || '',
                        industry: res.data.data.industry || '',
                        hrName: res.data.data.hrName || ''
                    });
                }
            } catch {
                // Ignore 404 if profile not created yet
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (profile) {
                // Assuming update endpoint exists, or just show info toast
                toast.success("Profile updated functionality pending API support.");
            } else {
                const res = await axiosInstance.post('/companies', formData);
                setProfile(res.data.data);
                toast.success("Profile created successfully!");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to save profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="animate-pulse h-96 bg-slate-200 rounded-2xl"></div>;

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Company Profile</h1>
                <p className="text-slate-500 text-sm mt-1">Manage your company's public information</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Company Name</label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input name="name" value={formData.name} onChange={handleChange} required className="input-field pl-10 w-full" placeholder="Acme Corp" />
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">HR Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input name="hrName" value={formData.hrName} onChange={handleChange} required className="input-field pl-10 w-full" placeholder="John Doe" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Industry</label>
                        <input name="industry" value={formData.industry} onChange={handleChange} className="input-field w-full" placeholder="Technology" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input name="location" value={formData.location} onChange={handleChange} required className="input-field pl-10 w-full" placeholder="San Francisco, CA" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Website</label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input name="website" type="url" value={formData.website} onChange={handleChange} className="input-field pl-10 w-full" placeholder="https://example.com" />
                        </div>
                    </div>

                    <div className="space-y-1 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Company Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required className="input-field w-full min-h-[120px] py-3" placeholder="Tell students about your company..."></textarea>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button type="submit" disabled={saving} className="btn-primary min-w-[140px]">
                        {saving ? <Loader2 className="animate-spin mx-auto" size={20} /> : (profile ? "Save Changes" : "Create Profile")}
                    </button>
                </div>
            </form>
        </div>
    );
}
