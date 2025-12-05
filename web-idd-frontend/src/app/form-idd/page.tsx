'use client';

import { formConfig, FormConfigItem } from "@/config/formConfig";
import { useState } from "react";
import { CheckCircle, Clock, Circle, ChevronRight } from "lucide-react";
import FormTemplate from "@/components/FormTemplate";

const FormIDD = () => {
    const [selectedForm, setSelectedForm] = useState<FormConfigItem | null>(null);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'done':
                return <CheckCircle size={20} className="text-green-600" />;
            case 'in-progress':
                return <Clock size={20} className="text-yellow-600" />;
            default:
                return <Circle size={20} className="text-gray-400" />;
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'done':
                return 'bg-green-50 border-green-200 hover:bg-green-100';
            case 'in-progress':
                return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
            default:
                return 'bg-white border-gray-200 hover:bg-gray-50';
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'done':
                return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Selesai</span>;
            case 'in-progress':
                return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">Sedang Diisi</span>;
            default:
                return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">Belum Diisi</span>;
        }
    }

    const completedForms = formConfig.filter(f => f.status === 'done').length;
    const progressPercentage = (completedForms / formConfig.length) * 100;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Form Integrity Due Diligence</h1>
                        <p className="text-gray-600">Lengkapi seluruh formulir untuk menyelesaikan proses IDD</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">{completedForms}/{formConfig.length}</div>
                        <div className="text-sm text-gray-500">Form Selesai</div>
                    </div>
                </div>
            </div>

            {/* Form List */}
            {!selectedForm ? (
                <div className="grid grid-cols-1 gap-4">
                    {formConfig.map((item) => (
                        <button
                            key={item.form}
                            onClick={() => setSelectedForm(item)}
                            className={`${getStatusColor(item.status)} border-2 rounded-xl p-6 transition-all text-left group`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shrink-0">
                                        {item.form}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-lg font-semibold text-gray-800">Form {item.form}: {item.title}</h3>
                                            {getStatusBadge(item.status)}
                                        </div>
                                        {/* <p className="text-sm text-gray-600">{item.description}</p> */}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {getStatusIcon(item.status)}
                                    <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" size={24} />
                                </div>
                            </div>
                        </button>
                    ))}
                    <div>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center gap-2">Submit Form</button>
                    </div>
                </div>
            ) : (
                <FormTemplate
                    formData={selectedForm}
                    onBack={() => setSelectedForm(null)}
                />
            )}
        </div>
    )
}

export default FormIDD;