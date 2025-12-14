import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

interface TwoFactorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (method: string, email: string) => void;
}

const TwoFactorModal: React.FC<TwoFactorModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [method, setMethod] = useState<'sms' | 'email'>('email');
    const [email, setEmail] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm(method, email);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl w-full max-w-sm relative animate-in fade-in zoom-in duration-200 shadow-2xl overflow-hidden">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="p-6">
                    <h2 className="text-xl font-serif text-[#6D635B] mb-4 font-bold text-center">Autenticazione a due fattori</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-[#8A8A8A] text-sm">Attiva su:</p>

                            <div className="flex flex-col gap-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded border-[#C5A572] text-[#A89160] focus:ring-[#A89160] w-5 h-5"
                                        checked={method === 'sms'}
                                        onChange={() => setMethod('sms')}
                                    />
                                    <span className="text-[#8A8A8A] text-sm">SMS</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded border-[#C5A572] text-[#A89160] focus:ring-[#A89160] w-5 h-5 bg-[#A89160]"
                                        checked={method === 'email'}
                                        onChange={() => setMethod('email')}
                                    />
                                    <span className="text-[#8A8A8A] text-sm">E-mail</span>
                                </label>
                            </div>
                        </div>

                        {method === 'email' && (
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded border border-[#E5E0D5] text-gray-700 bg-transparent focus:outline-none focus:border-[#A89160] placeholder:text-gray-300 text-sm"
                                placeholder="Inserisci e-mail"
                            />
                        )}

                        <div className="flex justify-end pt-2">
                            <Button
                                variant="primary"
                                className="bg-[#A89160] hover:bg-[#8C734B] text-white px-6 py-2 rounded text-sm font-medium"
                                onClick={handleSubmit}
                            >
                                Conferma
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TwoFactorModal;
