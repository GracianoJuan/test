'use client'

import { useState } from "react"
import { EyeIcon, EyeOff } from 'lucide-react'
import { apiService } from "@/services/apiServices";

type InputPasswordProps = {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputPassword: React.FC<InputPasswordProps> = ({ placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <button 
                type="button" 
                onClick={() => setShowPassword(s => !s)} 
                className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors"
            >
                {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
            </button>
        </div>
    );
};

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Add your login logic here
        setTimeout(() => {
            setLoading(false);
            setMessage('Login berhasil!');
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                </label>
                <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                </label>
                <InputPassword
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={e => setFormData(f => ({ ...f, password: e.target.value }))}
                />
            </div>

            {message && (
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    {message}
                </div>
            )}

            <button 
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {loading ? 'Loading...' : 'Login'}
            </button>
        </form>
    )
}

const RegisterForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (formData.password !== formData.confirmPassword) {
            setError('Password tidak cocok!');
            return;
        }

        setLoading(true);
        // Add your register logic here
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                </label>
                <input 
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nama lengkap"
                    value={formData.name}
                    onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asal
                </label>
                <input 
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Asal Perusahaan"
                    value={formData.name}
                    onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                </label>
                <input 
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                </label>
                <InputPassword
                    placeholder="Buat password"
                    value={formData.password}
                    onChange={e => setFormData(f => ({ ...f, password: e.target.value }))}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konfirmasi Password
                </label>
                <InputPassword
                    placeholder="Konfirmasi password"
                    value={formData.confirmPassword}
                    onChange={e => setFormData(f => ({ ...f, confirmPassword: e.target.value }))}
                />
            </div>

            {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                    {error}
                </div>
            )}

            <button 
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {loading ? 'Loading...' : 'Daftar'}
            </button>
        </form>
    )
}

const ForgotForm = () => {
    const [formData, setFormData] = useState({ email: '' })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Add your forgot password logic here
        setTimeout(() => {
            setLoading(false);
            setMessage('Link reset password telah dikirim ke email Anda');
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                </label>
                <input 
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                    required
                />
            </div>

            {message && (
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    {message}
                </div>
            )}

            <button 
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {loading ? 'Loading...' : 'Kirim Link Reset'}
            </button>
        </form>
    )
}

const ResetForm = () => {
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (formData.password !== formData.confirmPassword) {
            setError('Password tidak cocok!');
            return;
        }

        setLoading(true);
        // Add your reset password logic here
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password Baru
                </label>
                <InputPassword
                    placeholder="Buat password baru"
                    value={formData.password}
                    onChange={e => setFormData(f => ({ ...f, password: e.target.value }))}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konfirmasi Password
                </label>
                <InputPassword
                    placeholder="Konfirmasi password baru"
                    value={formData.confirmPassword}
                    onChange={e => setFormData(f => ({ ...f, confirmPassword: e.target.value }))}
                />
            </div>

            {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                    {error}
                </div>
            )}

            <button 
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {loading ? 'Loading...' : 'Reset Password'}
            </button>
        </form>
    )
}

export { LoginForm, RegisterForm, ForgotForm, ResetForm }
