import { LoginForm } from "@/components/AuthForm";
import Link from "next/link";
import { Lock } from "lucide-react";

const Login = () => {
    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-600 to-blue-800 p-12 text-white flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-xl">PLN</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">PT PLN Energi Primer Indonesia</h2>
                            <p className="text-sm text-blue-100">Integrity Due Diligence System</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl font-bold leading-tight">
                        Selamat Datang di<br />Sistem IDD
                    </h1>
                    <p className="text-lg text-blue-100">
                        Platform terintegrasi untuk mengelola proses Integrity Due Diligence.
                    </p>
                </div>

            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="text-blue-600" size={32} />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Login</h1>
                            <p className="text-gray-600">Masuk ke akun Anda</p>
                        </div>

                        <LoginForm />

                        <div className="mt-6 space-y-3">
                            <div className="text-center">
                                <Link 
                                    href="/forgot" 
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Lupa Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">atau</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="text-sm text-gray-600">Belum punya akun? </span>
                                <Link 
                                    href="/register" 
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Request Buat Akun
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Branding */}
                    <div className="lg:hidden text-center mt-8 text-gray-600 text-sm">
                        <p>PT PLN Energi Primer Indonesia</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;