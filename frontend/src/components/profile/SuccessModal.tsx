import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

interface SuccessModalProps {
    onClose?: () => void;
    title?: string;
    message?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
    onClose,
    title = "Modifica dati",
    message = "Avvenuta con successo!"
}) => {

    // Auto close after 2 seconds if onClose is provided
    useEffect(() => {
        if (onClose) {
            const timer = setTimeout(() => {
                onClose();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
            <div className="bg-white rounded-3xl p-12 flex flex-col items-center justify-center shadow-2xl animate-in fade-in zoom-in duration-300 min-w-[320px]">
                {/* Icon Circle */}
                <div className="mb-6">
                    <Check size={48} className="text-[#C5A572]" strokeWidth={4} />
                </div>

                <h3 className="text-2xl font-bold text-[#6D635B] mb-2 font-serif text-center">
                    {title}
                </h3>

                <p className="text-[#9CA3AF] text-lg text-center">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default SuccessModal;
