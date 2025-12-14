import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

interface PasswordResetModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSend: (email: string) => void;
    initialEmail?: string;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ isOpen, onClose, onSend, initialEmail = '' }) => {
    const [email, setEmail] = useState(initialEmail);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSend(email);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl w-full max-w-lg relative animate-in fade-in zoom-in duration-200 shadow-2xl p-8">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="text-center">
                    <h2 className="text-2xl font-serif text-[#6D635B] mb-4 font-bold">Modifica la tua password</h2>

                    <p className="text-[#8A8A8A] text-sm mb-6 leading-relaxed">
                        Ti invieremo un'email all'indirizzo registrato, <br />
                        con un link per modificare la tua password.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded border border-[#C5A572] text-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                            placeholder="Inserisci la tua email"
                        />

                        <Button
                            variant="primary"
                            className="w-full bg-[#A89160] hover:bg-[#8C734B] text-white py-3 rounded text-sm font-medium"
                            onClick={handleSubmit}
                        >
                            Invia nuovamente il codice
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PasswordResetModal;
