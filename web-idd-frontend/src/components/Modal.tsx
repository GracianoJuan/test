import React from "react"

type ModalProps = {
    title? : string,
    children? : React.ReactNode,
    isOpen : boolean,
    onClose : () => void,
    size : string | 'max-w-6xl'
}

const handler = () => {}

export const Modal= ({title, children
    // , isOpen, onClose, size
} : ModalProps) => {
    // if (!isOpen) return null
    return (
        <>
            <div className="fixed inset-0 backdrop-brightness-25 flex items-center justify-center p-4 z-50">
                <div>
                    <div>
                        <h3 className="text-lg font-medium border-b">{title}</h3>
                        <button
                            // onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                        >
                            ×
                        </button>
                    </div>
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
