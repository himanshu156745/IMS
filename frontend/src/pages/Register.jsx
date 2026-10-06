import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            await axiosInstance.post('/users/register', { email, password, role });
            navigate('/login', { state: { registered: true } });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
            <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full border border-slate-200">
                <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">Create Account</h2>
                <p className="text-slate-500 text-center mb-6 text-sm">Join the Internship Management System</p>

                {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-xl text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">I am a</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setRole('student')}
                                className={`py-3 rounded-xl border-2 text-sm font-bold transition-all ${role === 'student'
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                    }`}
                            >
                                Student
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('company')}
                                className={`py-3 rounded-xl border-2 text-sm font-bold transition-all ${role === 'company'
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                    }`}
                            >
                                Company
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min 6 characters"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-sm text-slate-500 text-center mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
