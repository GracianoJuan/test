'use client';

import { useState } from "react";
import { FormConfigItem } from "@/config/formConfig";
import { Question, TableColumn, getQuestionsByForm } from "@/config/questionConfig";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";

interface FormTemplateProps {
  formData: FormConfigItem;
  onBack: () => void;
}

const FormTemplate: React.FC<FormTemplateProps> = ({ formData, onBack }) => {
  const questions = getQuestionsByForm(formData.form);
  
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [tableData, setTableData] = useState<Record<string, any[]>>({});

  const handleRadioChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value })
    if (value === 'Tidak' && tableData[questionId]) {
      const newTableData = { ...tableData };
      delete newTableData[questionId];
      setTableData(newTableData);
    }
  };

  const handleTextChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value })
  };

  const addTableRow = (questionId: string, columns: TableColumn[]) => {
    const currentData = tableData[questionId] || []
    const newRow: any = { id: Date.now() }
    columns.forEach(col => {
      newRow[col.key] = ''
    });
    
    setTableData({
      ...tableData,
      [questionId]: [...currentData, newRow]
    })
  }

  const removeTableRow = (questionId: string, rowId: number) => {
    const currentData = tableData[questionId] || []
    setTableData({
      ...tableData,
      [questionId]: currentData.filter(row => row.id !== rowId)
    })
  }

  const handleTableCellChange = (questionId: string, rowId: number, columnKey: string, value: string) => {
    const currentData = tableData[questionId] || [];
    const updatedData = currentData.map(row => 
      row.id === rowId ? { ...row, [columnKey]: value } : row
    );
    setTableData({
      ...tableData,
      [questionId]: updatedData
    })
  }

  const handleSave = () => {
    console.log('Saving form:', { formData, answers, tableData })
    // Implement your save logic here
    alert('Form berhasil disimpan!')
  };

  const renderTableInput = (question: Question, columns: TableColumn[]) => (
    <div>
      <button
        onClick={() => addTableRow(question.id, columns)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <Plus size={18} />
        Tambah Data
      </button>
      {(tableData[question.id]?.length || 0) > 0 ? (
        <div className="border border-gray-300 rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No</th>
                {columns.map(col => (
                  <th key={col.key} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tableData[question.id]?.map((row, idx) => (
                <tr key={row.id} className="border-t border-gray-200">
                  <td className="px-4 py-3 text-sm text-gray-700">{idx + 1}</td>
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3">
                      {col.type === 'select' ? (
                        <select
                          value={row[col.key] || ''}
                          onChange={(e) => handleTableCellChange(question.id, row.id, col.key, e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Pilih...</option>
                          {col.options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={col.type === 'number' ? 'number' : col.type === 'date' ? 'date' : 'text'}
                          value={row[col.key] || ''}
                          onChange={(e) => handleTableCellChange(question.id, row.id, col.key, e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={col.placeholder}
                        />
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => removeTableRow(question.id, row.id)}
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg">
          Belum ada data. Klik "Tambah Data" untuk menambahkan.
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Kembali ke Daftar Form</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            {formData.form}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Form {formData.form}: {formData.title}</h2>
            {/* <p className="text-sm text-gray-600">{formData.description}</p> */}
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="p-6 space-y-8">
        {questions.map((question, index) => (
          <div key={question.id} className="border-b border-gray-100 pb-8 last:border-0">
            {/* Question */}
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-2">
                {index + 1}. {question.question}
              </label>
            </div>

            {/* Answer Section */}
            <div className="ml-6">
              {/* Text Input */}
              {question.answerType === 'text' && (
                <input
                  type="text"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleTextChange(question.id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan jawaban..."
                />
              )}

              {/* Radio Input */}
              {question.answerType === 'radio' && (
                <div className="space-y-2">
                  {question.options?.map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={(e) => handleRadioChange(question.id, e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Table Input */}
              {question.answerType === 'table' && question.tableConfig && (
                renderTableInput(question, question.tableConfig.columns)
              )}

              {/* Radio then Table */}
              {question.answerType === 'radio-then-table' && (
                <div>
                  <div className="space-y-2 mb-4">
                    {question.options?.map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name={question.id}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={(e) => handleRadioChange(question.id, e.target.value)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>

                  {answers[question.id] === 'Ya' && question.tableConfig && (
                    <div className="mt-4 pl-6 border-l-4 border-blue-500">
                      <p className="text-sm font-medium text-gray-700 mb-3">Jelaskan detail:</p>
                      {renderTableInput(question, question.tableConfig.columns)}
                    </div>
                  )}
                </div>
              )}

              {/* Radio then Text */}
              {question.answerType === 'radio-then-text' && (
                <div>
                  <div className="space-y-2 mb-4">
                    {question.options?.map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name={question.id}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={(e) => handleRadioChange(question.id, e.target.value)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>

                  {answers[question.id] === 'Ya' && (
                    <div className="mt-4 pl-6 border-l-4 border-blue-500">
                      <p className="text-sm font-medium text-gray-700 mb-3">Jelaskan detail:</p>
                      <textarea
                        value={answers[`${question.id}_detail`] || ''}
                        onChange={(e) => handleTextChange(`${question.id}_detail`, e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan penjelasan..."
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-200 p-6 bg-gray-50 flex justify-between items-center">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Batal
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Save size={18} />
          Simpan Form
        </button>
      </div>
    </div>
  );
};

export default FormTemplate