import React, { useState } from 'react';
import { Truck, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CartSteps from '../components/cart/CartSteps';
import CartSummary from '../components/cart/CartSummary';
import { useShop } from '../context/ShopContext';
import AddressModal from '../components/profile/AddressModal';
import usePageTitle from '../hooks/usePageTitle';

// Mock Addresses (Ideally this comes from a user context or API)
const initialAddresses = [
    {
        id: 1,
        title: 'Indirizzo 1',
        name: 'Davide Murro',
        phone: '3460928601',
        street: 'Via Carlo Alberto, n.46',
        city: 'Torino (TO), 70056, Italia',
        isDefault: true,
        instructions: false
    },
    {
        id: 2,
        title: 'Indirizzo 2',
        name: 'Davide Murro',
        phone: '3460928601',
        street: 'Via Carlo Alberto, n.46',
        city: 'Torino (TO), 70056, Italia',
        isDefault: false,
        instructions: false
    }
];

const CheckoutAddressPage: React.FC = () => {
    usePageTitle("Mya Oro | Spedizione");
    const navigate = useNavigate();
    const { cartItems } = useShop();
    const [addresses, setAddresses] = useState(initialAddresses);
    const [selectedAddressId, setSelectedAddressId] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editingId, setEditingId] = useState<number | null>(null);

    // Redirect if cart is empty
    if (cartItems.length === 0) {
        navigate('/cart');
        return null; // Or render loading/empty state
    }

    const openAddModal = () => {
        setEditingId(null);
        setModalMode('add');
        setIsModalOpen(true);
    };

    const openEditModal = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setEditingId(id);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const handleRemove = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setAddresses(addresses.filter(a => a.id !== id));
        if (selectedAddressId === id) {
            // Select the first one leftover or none
            const remaining = addresses.filter(a => a.id !== id);
            if (remaining.length > 0) setSelectedAddressId(remaining[0].id);
            else setSelectedAddressId(0);
        }
    };

    return (
        <div className="pt-32 pb-20 px-4 md:px-8 max-w-[1920px] mx-auto min-h-screen">
            {/* Steps Indicator - Step 2 is 'Completa il pagamento' according to your steps */}
            <div className="mb-16">
                <CartSteps currentStep={2} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative">

                {/* Left Column: Address Selection */}
                <div className="lg:col-span-2">
                    <div className="bg-[#FDFBF7] rounded-3xl p-8">
                        <div className="flex items-center gap-3 mb-2">
                            <Truck size={24} className="text-[#6D635B]" />
                            <h2 className="text-2xl font-serif font-bold text-[#6D635B]">Dati di spedizione</h2>
                        </div>
                        <p className="text-gray-500 mb-8 ml-9">Dove vuoi ricevere l'ordine?</p>

                        <div className="space-y-6">
                            {addresses.map(addr => (
                                <div
                                    key={addr.id}
                                    onClick={() => setSelectedAddressId(addr.id)}
                                    className={`
                                        border rounded-xl p-6 relative cursor-pointer transition-all
                                        ${selectedAddressId === addr.id
                                            ? 'border-[#A89160] bg-white shadow-md'
                                            : 'border-[#E5E0D5] bg-transparent hover:border-[#C5A572]'}
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            {/* Custom Radio Button */}
                                            <div className={`
                                                w-5 h-5 rounded border flex items-center justify-center transition-colors
                                                ${selectedAddressId === addr.id ? 'border-[#A89160] bg-[#A89160]' : 'border-gray-300 bg-white'}
                                            `}>
                                                {selectedAddressId === addr.id && <div className="w-2 h-2 bg-white rounded-sm" />}
                                            </div>
                                            <span className="font-bold text-lg text-[#6D635B]">{addr.title}</span>
                                        </div>

                                        <button
                                            onClick={(e) => openEditModal(e, addr.id)}
                                            className="text-xs text-[#8A8A8A] hover:text-[#A89160] flex items-center gap-1 transition-colors"
                                        >
                                            Modifica <Edit2 size={12} />
                                        </button>
                                    </div>

                                    <div className="ml-8 space-y-1 text-sm text-[#8A8A8A]">
                                        <p><span className="font-bold text-[#6D635B]">Nome e Cognome:</span> {addr.name}</p>
                                        <p><span className="font-bold text-[#6D635B]">Via:</span> {addr.street}</p>
                                        <p><span className="font-bold text-[#6D635B]">Città:</span> {addr.city}</p>
                                    </div>

                                    {/* Additional Actions/Tags */}
                                    <div className="flex justify-between items-end mt-4 ml-8">
                                        <div className="flex flex-col gap-2">
                                            {addr.isDefault && (
                                                <span className="bg-[#A89160] text-white text-[10px] px-2 py-1 rounded w-fit">
                                                    Indirizzo di spedizione predefinito
                                                </span>
                                            )}
                                            <button className="text-xs text-[#8A8A8A] hover:text-[#A89160] underline w-fit text-left">
                                                Aggiungi istruzioni di consegna
                                            </button>
                                        </div>

                                        <button
                                            onClick={(e) => handleRemove(e, addr.id)}
                                            className="text-xs text-[#8A8A8A] hover:text-red-500 flex items-center gap-1 transition-colors"
                                        >
                                            <Trash2 size={12} /> Rimuovi
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Add New Address */}
                            <button
                                onClick={openAddModal}
                                className="w-full border border-[#E5E0D5] rounded-xl p-4 flex items-center gap-3 text-[#6D635B] hover:border-[#A89160] hover:text-[#A89160] transition-colors bg-white"
                            >
                                <div className="w-5 h-5 rounded border border-[#C5A572] flex items-center justify-center">
                                    {/* Empty box icon */}
                                </div>
                                <span className="font-bold">Aggiungi nuovo indirizzo</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32">
                        <CartSummary
                            onCheckout={() => navigate('/checkout/payment')}
                            buttonText="Procedi all'ordine"
                        />
                    </div>
                </div>
            </div>

            <AddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                initialData={editingId ? addresses.find(a => a.id === editingId) : undefined}
            />
        </div>
    );
};

export default CheckoutAddressPage;
