import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';


interface PaymentMethodModalProps {
    isOpen: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData?: any;
    mode?: 'add' | 'edit';
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({ isOpen, onClose, initialData, mode = 'add' }) => {
    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        isDefault: false
    });

    useEffect(() => {
        if (initialData) {
            // eslint-disable-next-line
            setFormData(initialData);
        } else {
            setFormData({
                cardName: '',
                cardNumber: '',
                expiry: '',
                cvv: '',
                isDefault: false
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleToggleDefault = () => {
        setFormData(prev => ({ ...prev, isDefault: !prev.isDefault }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl w-full max-w-lg relative animate-in fade-in zoom-in duration-200 shadow-2xl p-8">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-serif text-[#6D635B] font-bold">
                        {mode === 'edit' ? 'Modifica dati carta' : 'Aggiungi nuova carta'}
                    </h2>
                    <span className="text-sm text-[#A89160]">*Obbligatorio</span>
                </div>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>

                    {/* Card Name */}
                    <div>
                        <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            placeholder="Davide Murro"
                            className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                        />
                    </div>

                    {/* Card Number */}
                    <div>
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="**** **** **** 9098"
                            className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Expiry */}
                        <div>
                            <input
                                type="text"
                                name="expiry"
                                value={formData.expiry}
                                onChange={handleChange}
                                placeholder="Scadenza carta"
                                className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            />
                        </div>
                        {/* CVV */}
                        <div>
                            <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                placeholder="C.V.V."
                                className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        {/* Default Toggle Button - styled as outlined button */}
                        <button
                            type="button"
                            onClick={handleToggleDefault}
                            className={`flex-1 py-3 text-sm font-medium rounded border transition-colors
                                ${formData.isDefault
                                    ? 'bg-[#A89160] text-white border-[#A89160]'
                                    : 'bg-white text-[#6D635B] border-[#A89160] hover:bg-[#A89160]/5'
                                }`}
                        >
                            {formData.isDefault ? 'Impostato come predefinito' : 'Imposta come predefinito'}
                        </button>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="flex-1 bg-[#A89160] text-white py-3 text-lg font-medium rounded hover:bg-[#8C734B] shadow-sm transition-colors"
                        >
                            Conferma
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default PaymentMethodModal;
