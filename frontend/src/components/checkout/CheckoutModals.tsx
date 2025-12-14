import React from 'react';
import { ShoppingBag, X, AlertTriangle, Phone } from 'lucide-react';
// import Button from '../ui/Button';

// ----------------------------------------------------------------------
// Purchase Confirmation Modal
// ----------------------------------------------------------------------
interface PurchaseConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const PurchaseConfirmationModal: React.FC<PurchaseConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#FAF9F6] rounded-xl w-full max-w-sm relative shadow-2xl p-8 text-center animate-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <ShoppingBag size={48} className="text-[#6D635B]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-[#6D635B] mb-4">Conferma di acquisto</h2>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Hai selezionato queste caratteristiche per l'acquisto del tuo gioiello.<br />
                    Vuoi continuare?
                </p>

                {/* Actions */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onClose}
                        className="px-8 py-2 rounded bg-[#A09B95] text-white font-medium hover:bg-[#8A857F] transition-colors shadow-sm"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-8 py-2 rounded bg-[#A89160] text-white font-medium hover:bg-[#8C734B] transition-colors shadow-sm"
                    >
                        Si
                    </button>
                </div>
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------
// Checkout Error Modal
// ----------------------------------------------------------------------
interface CheckoutErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CheckoutErrorModal: React.FC<CheckoutErrorModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#5A5954] text-white rounded-xl w-full max-w-sm relative shadow-2xl p-8 text-center animate-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <AlertTriangle size={48} className="text-white fill-white" strokeWidth={0} />
                    {/* Note: In Lucide, AlertTriangle is outlined. To match the solid look, we might rely on fill if supported or just stroke. 
                        Actually standard Lucide icon is outlined. Let's stick to outline or fill if possible.
                        Let's just use white color. The image shows a solid white triangle with ! inside. 
                        Lucide's AlertTriangle is just the triangle outline with ! inside.
                    */}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-white mb-4">Qualcosa è andato storto</h2>

                {/* Description */}
                <p className="text-gray-200 text-xs mb-6 leading-relaxed">
                    Non siamo riusciti a completare il tuo acquisto.<br />
                    Controlla i dettagli di pagamento e riprova, oppure contatta il supporto se il problema persiste.
                </p>

                {/* Phone Support */}
                <div className="flex items-center justify-center gap-2 text-white font-bold text-lg">
                    <Phone size={20} className="fill-white" />
                    <span>347 864 3456</span>
                </div>
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------
// Cancel Purchase Modal
// ----------------------------------------------------------------------
interface CancelPurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmCancel: () => void;
}

export const CancelPurchaseModal: React.FC<CancelPurchaseModalProps> = ({ isOpen, onClose, onConfirmCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#5A5954] text-white rounded-xl w-full max-w-sm relative shadow-2xl p-8 text-center animate-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Icon (Frown) */}
                <div className="flex justify-center mb-6">
                    <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-white mb-4">Sicuro di voler annullare l’acquisto?</h2>

                {/* Description */}
                <p className="text-gray-200 text-xs mb-8 leading-relaxed">
                    Hai selezionato queste caratteristiche<br />per l'acquisto del tuo gioiello.
                </p>

                {/* Actions */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded bg-[#8A857F] text-white text-sm font-medium hover:bg-[#7A756F] transition-colors shadow-sm"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirmCancel}
                        className="px-6 py-2 rounded bg-[#A89160] text-white text-sm font-medium hover:bg-[#8C734B] transition-colors shadow-sm"
                    >
                        Si
                    </button>
                </div>
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------
// Purchase Success Modal
// ----------------------------------------------------------------------
interface PurchaseSuccessModalProps {
    isOpen: boolean;
    onViewOrder: () => void;
}

export const PurchaseSuccessModal: React.FC<PurchaseSuccessModalProps> = ({ isOpen, onViewOrder }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#FAF9F6] rounded-xl w-full max-w-sm relative shadow-2xl p-8 text-center animate-in zoom-in-95 duration-200">
                {/* Icon (Sparkles) */}
                <div className="flex justify-center mb-6">
                    <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="#D4B982"
                        className="text-[#D4B982]"
                    >
                        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a0.5 0.5 0 0 1 0-0.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a0.5 0.5 0 0 1 0.963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a0.5 0.5 0 0 1 0 0.962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a0.5 0.5 0 0 1-0.963 0z" />
                        <path d="M20 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M22 5h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-[#6D635B] mb-2">Acquisto completato!</h2>

                {/* Description */}
                <p className="text-gray-500 text-xs mb-8 leading-relaxed">
                    Il tuo ordine è stato effettuato con successo.<br />
                    Riceverai a breve un'email di conferma con tutti i dettagli.
                </p>

                {/* Action */}
                <div className="flex justify-center">
                    <button
                        onClick={onViewOrder}
                        className="w-full py-3 rounded bg-[#A89160] text-white font-medium hover:bg-[#8C734B] transition-colors shadow-sm"
                    >
                        Visualizza il tuo ordine
                    </button>
                </div>
            </div>
        </div>
    );
};
