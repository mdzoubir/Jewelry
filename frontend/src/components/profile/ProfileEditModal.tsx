import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

interface ProfileEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSave: (data: any) => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose, initialData, onSave }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200 shadow-2xl">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="p-8 md:p-10">
                    <h2 className="text-2xl font-serif text-[#6D635B] mb-8 font-bold">Informazioni personali</h2>



                    {/* Let's restart the form content to be exact */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Nome"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded border border-[#E5E0D5] text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-[#A89160]"
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Cognome"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded border border-[#E5E0D5] text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-[#A89160]"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded border border-[#E5E0D5] text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-[#A89160]"
                            />
                            <div className="relative">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="N. telefono"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded border border-[#E5E0D5] text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-[#A89160]"
                                />
                                <span className="absolute top-2 right-2 text-[#A89160]">*</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="city"
                                placeholder="Città di residenza"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded border border-[#E5E0D5] text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-[#A89160]"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="zip"
                                    placeholder="C.A.P."
                                    value={formData.zip}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded border border-[#E5E0D5] text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-[#A89160]"
                                />
                                <input
                                    type="text"
                                    name="province"
                                    placeholder="Provincia"
                                    value={formData.province}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded border border-[#E5E0D5] text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-[#A89160]"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="address"
                                placeholder="Indirizzo di residenza"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded border border-[#E5E0D5] text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-[#A89160]"
                            />
                            <input
                                type="text"
                                name="houseNumber"
                                placeholder="N. Civico"
                                value={formData.houseNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded border border-[#E5E0D5] text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-[#A89160]"
                            />
                        </div>

                        <div className="pt-2">
                            <p className="text-xs text-gray-500 mb-4">* I dati inseriti verrano utilizzati per l'autenticazione a due fattori.</p>

                            <div className="flex items-center gap-2 mb-8">
                                <input type="checkbox" id="privacy" className="rounded border-gray-300 text-[#A89160] focus:ring-[#A89160]" />
                                <label htmlFor="privacy" className="text-sm text-gray-500">Privacy and Cookie policy</label>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit}
                                    className="bg-[#A89160] text-white px-10 py-3 rounded hover:bg-[#8C734B] font-medium"
                                >
                                    Salva
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileEditModal;
