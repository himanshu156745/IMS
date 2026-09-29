import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    const justRegistered = location.state?.registered;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            // Redirect based on role or to the originally requested URL
            if (from === "/") {
                if (data.user.role === 'admin' || data.user.role === 'super_admin') navigate('/admin');
                else if (data.user.role === 'student') navigate('/students');
                else if (data.user.role === 'faculty' || data.user.role === 'mentor') navigate('/faculty');
                else if (data.user.role === 'company') navigate('/company');
                else navigate('/');
            } else {
                navigate(from, { replace: true });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
            <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full border border-slate-200">
                <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Login</h2>
                {justRegistered && (
                    <div className="mb-4 text-green-700 bg-green-50 p-3 rounded-xl text-sm">
                        Account created successfully! Please log in.
                    </div>
                )}
                {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-xl text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary mt-2">Sign In</button>
                </form>
                <p className="text-sm text-slate-500 text-center mt-6">
                    Don&apos;t have an account?{' '}
                    <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

