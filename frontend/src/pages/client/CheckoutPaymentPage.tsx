
import React, { useState } from 'react';
import { CreditCard, Lock, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CartSteps from '../../components/cart/CartSteps';
import CartSummary from '../../components/cart/CartSummary';
import {
    PurchaseConfirmationModal,
    CheckoutErrorModal,
    CancelPurchaseModal,
    PurchaseSuccessModal
} from '../../components/checkout/CheckoutModals';
import usePageTitle from '../../hooks/usePageTitle';

const CheckoutPaymentPage: React.FC = () => {
    usePageTitle("Mya Oro | Pagamento");
    const navigate = useNavigate();

    // Modal States
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const handleProceed = () => {
        setIsConfirmOpen(true);
    };

    const handleConfirmPurchase = () => {
        setIsConfirmOpen(false);
        // Simulate error or success
        const randomError = Math.random() > 0.7; // 30% chance of error
        if (randomError) {
            setIsErrorOpen(true);
        } else {
            // Show Success Modal instead of immediate navigate
            setIsSuccessOpen(true);
        }
    };

    const handleBack = () => {
        // Trigger cancel modal when trying to go back
        setIsCancelOpen(true);
    };

    const confirmCancel = () => {
        setIsCancelOpen(false);
        navigate('/cart'); // Go back to cart or empty it? Usually just back.
    };

    const proceedToOrderDetails = () => {
        navigate('/checkout/success');
    };

    return (
        <div className="pt-32 pb-20 px-4 md:px-8 max-w-[1920px] mx-auto min-h-screen">
            <div className="mb-16">
                <CartSteps currentStep={3} />
            </div>

            {/* Back Button / Cancel Trigger */}
            <button
                onClick={handleBack}
                className="mb-8 flex items-center gap-2 text-[#8C734B] hover:text-[#6D635B] transition-colors font-medium"
            >
                <ChevronLeft size={20} /> Torna indietro
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
                {/* Left Column: Payment Mockup */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[#FDFBF7] rounded-3xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <CreditCard size={24} className="text-[#6D635B]" />
                            <h2 className="text-2xl font-serif font-bold text-[#6D635B]">Metodo di pagamento</h2>
                        </div>

                        {/* Placeholder Payment Form */}
                        <div className="bg-white border border-[#E5E0D5] rounded-xl p-8 text-center space-y-4">
                            <Lock size={48} className="mx-auto text-[#A89160]" />
                            <h3 className="text-lg font-bold text-[#6D635B]">Pagamento Sicuro</h3>
                            <p className="text-gray-500">I dati della tua carta sono protetti con crittografia SSL.</p>
                            <div className="p-4 border border-dashed border-gray-300 rounded bg-gray-50">
                                [Modulistica Stripe/PayPal andrebbe qui]
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32">
                        <CartSummary
                            onCheckout={handleProceed}
                            buttonText="Completa l'acquisto"
                        />
                    </div>
                </div>
            </div>

            {/* Modals */}
            <PurchaseConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmPurchase}
            />

            <CheckoutErrorModal
                isOpen={isErrorOpen}
                onClose={() => setIsErrorOpen(false)}
            />

            <CancelPurchaseModal
                isOpen={isCancelOpen}
                onClose={() => setIsCancelOpen(false)}
                onConfirmCancel={confirmCancel}
            />

            <PurchaseSuccessModal
                isOpen={isSuccessOpen}
                onViewOrder={proceedToOrderDetails}
            />
        </div>
    );
};

export default CheckoutPaymentPage;

