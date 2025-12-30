import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { formatCurrency } from '../../utils/currency';
import client from '../../api/client';
import usePageTitle from '../../hooks/usePageTitle';

const CheckoutPage: React.FC = () => {
    usePageTitle("Checkout | Mya Oro");
    const { cartItems, total, shippingCost, subtotal, discountAmount, clearCart } = useShop();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [shippingAddress, setShippingAddress] = useState({
        name: user ? user.name : '',
        address: '',
        city: '',
        zip: '',
        country: 'Italia'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await client.post('/orders', {
                shippingAddress,
                total_amount: total // Backend recalculates, but good for validation if needed
            });

            // On success, backend clears cart. Frontend should re-fetch cart or we manually clear?
            // ShopContext syncs on mount or change, forcing a reload might be safest, 
            // but let's rely on redirection to Success page which might trigger updates if structured well.
            // Actually, we should probably force a cart refresh in context or manually clear frontend state.
            // For now, let's assume redirection is enough.

            // Wait a bit or context update. Since context syncs on load, OrderSuccess page is static mostly.
            // We should likely clear the local cart state to be immediate.
            // But strict "sync" is better. A window reload is crude but effective for MVP state sync.
            // Better: Context provides a clearCart function? 
            // We'll rely on the fact that if we navigate to Success, 
            // the backend cart is empty, so next sync will empty it.

            clearCart();
            navigate('/order-success');

        } catch (err: any) {
            console.error("Checkout failed", err);
            setError(err.response?.data?.message || "Si è verificato un errore durante l'ordine.");
            setIsSubmitting(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-32 px-4 text-center">
                <h1 className="text-2xl font-serif text-[#6D635B] mb-4">Il tuo carrello è vuoto</h1>
                <Button onClick={() => navigate('/products')}>Torna allo shopping</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-[#FEFEFD]">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left Column: Form */}
                <div>
                    <h2 className="text-2xl font-serif text-[#6D635B] mb-8 font-bold">Indirizzo di Spedizione</h2>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-4 mb-6 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nome Completo</label>
                            <input
                                type="text"
                                name="name"
                                value={shippingAddress.name}
                                onChange={handleInputChange}
                                required
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#C5A572] bg-transparent transition-colors"
                                placeholder="Mario Rossi"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Indirizzo</label>
                            <input
                                type="text"
                                name="address"
                                value={shippingAddress.address}
                                onChange={handleInputChange}
                                required
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#C5A572] bg-transparent transition-colors"
                                placeholder="Via Roma 1"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Città</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={shippingAddress.city}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#C5A572] bg-transparent transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">CAP</label>
                                <input
                                    type="text"
                                    name="zip"
                                    value={shippingAddress.zip}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#C5A572] bg-transparent transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Paese</label>
                            <select
                                name="country"
                                value={shippingAddress.country}
                                onChange={handleInputChange}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#C5A572] bg-transparent transition-colors"
                            >
                                <option value="Italia">Italia</option>
                                <option value="Francia">Francia</option>
                                <option value="Germania">Germania</option>
                                <option value="Svizzera">Svizzera</option>
                            </select>
                        </div>

                        <div className="pt-8">
                            <h3 className="text-xl font-serif text-[#6D635B] mb-4 font-bold">Pagamento</h3>
                            <div className="p-4 border border-[#E5E5E5] rounded bg-gray-50 text-sm text-gray-600">
                                🔒 Pagamento sicuro simulato (Stripe/PayPal non attivi nella demo)
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            disabled={isSubmitting}
                            className="mt-8 py-4 text-base"
                        >
                            {isSubmitting ? 'Elaborazione...' : `NON PAGARE E ORDINA (${formatCurrency(total)})`}
                        </Button>
                    </form>
                </div>

                {/* Right Column: Summary */}
                <div className="bg-[#F9F8F6] p-8 rounded-sm h-fit">
                    <h3 className="text-xl font-serif text-[#6D635B] mb-6 font-bold">Riepilogo Ordine</h3>

                    <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
                        {cartItems.map((item) => (
                            <div key={item.uniqueId} className="flex gap-4 items-start">
                                <div className="w-16 h-16 bg-white shrink-0">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-sm font-bold text-[#6D635B] line-clamp-2">{item.name}</h4>
                                    <p className="text-xs text-gray-500">qtà: {item.quantity}</p>
                                    <p className="text-sm font-medium text-[#8C734B]">{formatCurrency(item.price * item.quantity)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 pt-6 border-t border-gray-200 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotale</span>
                            <span className="font-bold text-[#6D635B]">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Spedizione</span>
                            <span className="font-bold text-[#6D635B]">{formatCurrency(shippingCost)}</span>
                        </div>
                        {discountAmount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>Sconto</span>
                                <span>-{formatCurrency(discountAmount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-200 mt-4 text-[#8C734B]">
                            <span>Totale</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CheckoutPage;
