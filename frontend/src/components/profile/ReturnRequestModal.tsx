import React from 'react';
import { X, Upload } from 'lucide-react';
import Button from '../ui/Button';

interface ReturnRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentOrder?: any; // Pass order details to pre-fill if needed
}

const Star: React.FC<{ className?: string }> = ({ className }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#C5A572" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
);

const ReturnRequestModal: React.FC<ReturnRequestModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-[#FDFBF7] rounded-xl w-full max-w-2xl relative animate-in fade-in zoom-in duration-200 shadow-2xl p-8 max-h-[90vh] overflow-y-auto">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-serif text-[#6D635B] mb-8 font-bold">Compila il modulo per il reso</h2>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Nome"
                                className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            />
                            <Star className="absolute -top-2 -right-2 text-[#C5A572] w-4 h-4 bg-[#FDFBF7]" />
                        </div>
                        {/* Surname */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cognome"
                                className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            />
                            <Star className="absolute -top-2 -right-2 text-[#C5A572] w-4 h-4 bg-[#FDFBF7]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="E-mail"
                                className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            />
                            <Star className="absolute -top-2 -right-2 text-[#C5A572] w-4 h-4 bg-[#FDFBF7]" />
                        </div>
                        {/* Phone */}
                        <div className="relative">
                            <input
                                type="tel"
                                placeholder="N. di telefono"
                                className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            />
                            <Star className="absolute -top-2 -right-2 text-[#C5A572] w-4 h-4 bg-[#FDFBF7]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Warrant Number */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Numero garanzia"
                                className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            />
                            <Star className="absolute -top-2 -right-2 text-[#C5A572] w-4 h-4 bg-[#FDFBF7]" />
                        </div>
                        {/* Order Number */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Numero ordine"
                                className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            />
                            <Star className="absolute -top-2 -right-2 text-[#C5A572] w-4 h-4 bg-[#FDFBF7]" />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="relative">
                        <textarea
                            rows={4}
                            placeholder="Descrizione delle motivazioni di reso"
                            className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572] resize-none"
                        ></textarea>
                        <Star className="absolute -top-2 -right-2 text-[#C5A572] w-4 h-4 bg-[#FDFBF7]" />
                    </div>

                    {/* Image Upload */}
                    <div className="pt-2">
                        <label className="flex items-center gap-2 text-[#6D635B] cursor-pointer hover:text-[#A89160] transition-colors w-fit">
                            <Upload size={20} />
                            <span className="text-lg font-medium">Carica la foto dell'articolo</span>
                            <input type="file" className="hidden" />
                        </label>

                        {/* Divider Line with end dot */}
                        <div className="relative mt-4 mb-4">
                            <div className="h-[1px] bg-[#C5A572] w-full"></div>
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C5A572]"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C5A572]"></div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            className="bg-[#A89160] text-white px-12 py-3 text-lg font-medium rounded hover:bg-[#8C734B]"
                        >
                            Invia
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ReturnRequestModal;
