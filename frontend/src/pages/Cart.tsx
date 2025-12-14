import React from 'react';
import { useShop } from '../context/ShopContext';
import CartSteps from '../components/cart/CartSteps';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import SuggestedProducts from '../components/products/SuggestedProducts';
import CartWishlistSection from '../components/cart/CartWishlistSection';
import CartNewProductsSection from '../components/cart/CartNewProductsSection';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
    usePageTitle("Mya Oro | Carrello");
    const { cartItems } = useShop();
    const navigate = useNavigate();

    return (
        <div className="pt-32 pb-20 px-4 md:px-8 max-w-[1920px] mx-auto min-h-screen">
            {/* Steps Indicator */}
            <div className="mb-16">
                <CartSteps currentStep={1} />
            </div>

            {/* Page Title */}
            <div className="flex items-center gap-4 mb-10">
                <ShoppingBag size={32} className="text-[#5A5A5A]" strokeWidth={1.5} />
                <h1 className="text-4xl font-serif font-bold text-[#5A5A5A]">Carrello</h1>
            </div>

            <p className="text-gray-400 mb-12 border-b border-[#C5A572]/30 pb-4">
                Prodotti selezionati
            </p>

            {cartItems.length === 0 ? (
                <div className="text-center py-24 bg-gray-50 rounded-3xl mb-12">
                    <p className="text-xl text-gray-500 mb-6">Il tuo carrello è vuoto.</p>
                    <Link to="/" className="text-[#A89160] hover:underline font-semibold">
                        Torna alla Home per fare shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative mb-16">

                    {/* Left Column: Product List */}
                    <div className="lg:col-span-2 space-y-8">
                        {cartItems.map(item => (
                            <CartItem key={item.uniqueId} item={item} />
                        ))}
                    </div>

                    {/* Right Column: Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32">
                            <CartSummary
                                onCheckout={() => navigate('/checkout/shipping')}
                                buttonText="Procedi all'ordine"
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-20">
                <SuggestedProducts />
                <CartWishlistSection />
                <CartNewProductsSection />
            </div>
        </div>
    );
};

export default Cart;
