import { Lock, Bell } from 'lucide-react';

export default function CompanySettings() {
    return (
        <div className="max-w-4xl space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Account Settings</h1>
                <p className="text-slate-500 text-sm mt-1">Manage your account preferences and security</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-6 sm:p-8 space-y-8">
                    
                    {/* Security Section */}
                    <section>
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                            <Lock size={20} className="text-emerald-500" /> Security
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Current Password</label>
                                <input type="password" placeholder="••••••••" className="input-field max-w-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">New Password</label>
                                <input type="password" placeholder="••••••••" className="input-field max-w-md" />
                            </div>
                            <button className="btn-primary mt-2">Update Password</button>
                        </div>
                    </section>

                    <hr className="border-slate-100" />

                    {/* Notifications Section */}
                    <section>
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                            <Bell size={20} className="text-blue-500" /> Notifications
                        </h2>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500" defaultChecked />
                                <div>
                                    <div className="font-semibold text-slate-800 text-sm">Email Alerts</div>
                                    <div className="text-xs text-slate-500">Receive an email when a student applies</div>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500" defaultChecked />
                                <div>
                                    <div className="font-semibold text-slate-800 text-sm">System Notifications</div>
                                    <div className="text-xs text-slate-500">Receive in-app alerts for internship updates</div>
                                </div>
                            </label>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
