import { ForgotForm } from "@/components/AuthForm"
import Link from "next/link"
import { KeyRound } from "lucide-react"

const Forgot = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <KeyRound className="text-blue-600" size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Lupa Password</h1>
                        <p className="text-gray-600">
                            Masukkan email Anda dan kami akan mengirimkan link untuk reset password
                        </p>
                    </div>

                    <ForgotForm />

                    <div className="mt-6 text-center">
                        <Link 
                            href="/login" 
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            ← Kembali ke Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgot