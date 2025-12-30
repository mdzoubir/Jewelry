import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

interface AddressData {
    name?: string;
    phone?: string;
    city?: string;
    zip?: string;
    province?: string;
    street?: string;
    instructions?: boolean;
}

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: AddressData;
    mode?: 'add' | 'edit';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSave?: (data: any) => Promise<void>;
}

const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, initialData, mode = 'add', onSave }) => {
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        email: '',
        telefono: '',
        citta: '',
        cap: '',
        provincia: '',
        indirizzo: '',
        civico: '',
        istruzioni: '',
        privacy: false
    });

    useEffect(() => {
        if (initialData) {
            // Map backend data to form if editing
            // eslint-disable-next-line 
            setFormData({
                nome: initialData.name?.split(' ')[0] || '',
                cognome: initialData.name?.split(' ').slice(1).join(' ') || '',
                email: '', // Not stored in address usually?
                telefono: initialData.phone || '',
                citta: initialData.city || '',
                cap: initialData.zip || '',
                provincia: initialData.province || '',
                indirizzo: initialData.street?.split(', n.')[0] || initialData.street || '',
                civico: initialData.street?.split(', n.')[1] || '',
                istruzioni: initialData.instructions ? 'Si' : '', // simplified
                privacy: true
            });
        } else {
            // Reset form on add
            setFormData({
                nome: '',
                cognome: '',
                email: '',
                telefono: '',
                citta: '',
                cap: '',
                provincia: '',
                indirizzo: '',
                civico: '',
                istruzioni: '',
                privacy: false
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (onSave) {
            // Map form data to backend format
            const backendData = {
                title: `${formData.nome} ${formData.cognome} - ${formData.citta}`, // Auto-generate title
                name: `${formData.nome} ${formData.cognome}`,
                phone: formData.telefono,
                street: `${formData.indirizzo}${formData.civico ? `, n.${formData.civico}` : ''}`,
                city: formData.citta,
                zip: formData.cap,
                province: formData.provincia,
                country: 'Italia',
                is_default: false // Managed outside or default false
            };
            await onSave(backendData);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl w-full max-w-2xl relative animate-in fade-in zoom-in duration-200 shadow-2xl p-8 max-h-[90vh] overflow-y-auto">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-serif text-[#6D635B] mb-8 font-bold">
                    {mode === 'edit' ? 'Modifica indirizzo' : 'Nuovo indirizzo di spedizione'}
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Nome"
                                required
                                className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            />
                        </div>
                        {/* Surname */}
                        <div>
                            <input
                                type="text"
                                name="cognome"
                                value={formData.cognome}
                                onChange={handleChange}
                                placeholder="Cognome"
                                required
                                className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="E-mail"
                                className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            />
                        </div>
                        {/* Phone */}
                        <div className="relative">
                            <input
                                type="tel"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                placeholder="N. telefono"
                                required
                                className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            />
                        </div>
                    </div>

                    {/* City */}
                    <div>
                        <input
                            type="text"
                            name="citta"
                            value={formData.citta}
                            onChange={handleChange}
                            placeholder="Città di residenza"
                            required
                            className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* CAP */}
                        <div>
                            <input
                                type="text"
                                name="cap"
                                value={formData.cap}
                                onChange={handleChange}
                                placeholder="C.A.P."
                                required
                                className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            />
                        </div>
                        {/* Province */}
                        <div>
                            <input
                                type="text"
                                name="provincia"
                                value={formData.provincia}
                                onChange={handleChange}
                                placeholder="Provincia"
                                required
                                className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Address */}
                        <div className="col-span-1 md:col-span-2">
                            <input
                                type="text"
                                name="indirizzo"
                                value={formData.indirizzo}
                                onChange={handleChange}
                                placeholder="Indirizzo di consegna"
                                required
                                className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            />
                        </div>
                        {/* Civico */}
                        <div className="col-span-1">
                            <input
                                type="text"
                                name="civico"
                                value={formData.civico}
                                onChange={handleChange}
                                placeholder="N. Civico"
                                className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            />
                        </div>
                    </div>

                    {/* Instructions */}
                    <div>
                        <textarea
                            rows={4}
                            name="istruzioni"
                            value={formData.istruzioni}
                            onChange={handleChange}
                            placeholder="Aggiungi istruzioni di consegna"
                            className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572] resize-none"
                        ></textarea>
                    </div>

                    {/* Privacy */}
                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="privacy"
                            name="privacy"
                            checked={formData.privacy}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-gray-300 text-[#A89160] focus:ring-[#A89160]"
                        />
                        <label htmlFor="privacy" className="text-sm text-gray-500">Privacy and Cookie policy</label>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button
                            className="bg-[#A89160] text-white px-12 py-3 text-lg font-medium rounded hover:bg-[#8C734B]"
                        >
                            Salva
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddressModal;
