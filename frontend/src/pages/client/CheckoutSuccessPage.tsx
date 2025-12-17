import React from 'react';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CartSteps from '../../components/cart/CartSteps';
import CartSummary from '../../components/cart/CartSummary';
import Button from '../../components/ui/Button';
import usePageTitle from '../../hooks/usePageTitle';
// import { useShop } from '../context/ShopContext';

const CheckoutSuccessPage: React.FC = () => {
    usePageTitle("Mya Oro | Ordine Completato");
    const navigate = useNavigate();
    // In a real app, we'd clear the cart here or fetch the order details via ID
    // const { clearCart } = useShop(); 

    // Mock Order ID
    const orderId = "#32595643";

    return (
        <div className="pt-32 pb-20 px-4 md:px-8 max-w-[1920px] mx-auto min-h-screen">
            {/* Steps - All completed */}
            <div className="mb-16">
                <CartSteps currentStep={4} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
                {/* Left Column: Success Message */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[#FDFBF7] rounded-3xl p-12 text-center border border-[#E5E0D5]">
                        <div className="flex justify-center mb-6">
                            <CheckCircle size={64} className="text-[#A89160]" strokeWidth={1.5} />
                        </div>

                        <h1 className="text-3xl font-serif font-bold text-[#6D635B] mb-4">Grazie per il tuo acquisto!</h1>
                        <p className="text-gray-500 mb-8">
                            Il tuo ordine <span className="font-bold text-[#6D635B]">{orderId}</span> è stato confermato.<br />
                            Riceverai una email di conferma con i dettagli della spedizione.
                        </p>

                        <div className="flex justify-center gap-4">
                            <Button
                                variant="outline"
                                onClick={() => navigate('/profile/orders')}
                            >
                                I miei ordini
                            </Button>
                            <Button
                                onClick={() => navigate('/')}
                                icon={<ShoppingBag size={18} />}
                            >
                                Torna alla Home
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Summary (Recap) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32">
                        {/* 
                            Reusing CartSummary. 
                            In a real app, this might need a 'readOnly' prop to hide the checkout button 
                            or we just hide the button via CSS/prop.
                        */}
                        <div className="pointer-events-none opacity-80">
                            <CartSummary buttonText="Ordine Completato" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccessPage;
