import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import type { CartItem as CartItemType } from '../../types';
import { formatCurrency } from '../../utils/currency';

interface CartItemProps {
    item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { removeFromCart, updateQuantity, toggleItemSelection } = useShop();

    return (
        <div className="flex flex-col md:flex-row items-center gap-6 py-6 border-b border-[#C5A572]/30 relative">

            {/* Remove Button (Mobile: Absolute Top Right, Desktop: Right side) */}
            <button
                onClick={() => removeFromCart(item.uniqueId)}
                className="absolute top-2 right-0 md:hidden text-gray-400 hover:text-red-500"
            >
                <X size={20} />
            </button>

            {/* Checkbox */}
            <div className="flex-shrink-0">
                <input
                    type="checkbox"
                    checked={item.isSelected}
                    onChange={() => toggleItemSelection(item.uniqueId)}
                    className="w-5 h-5 rounded border-gray-300 text-[#A89160] focus:ring-[#A89160] cursor-pointer"
                />
            </div>

            {/* Image */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl border border-gray-100 p-2 bg-white flex-shrink-0">
                <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                />
            </div>

            {/* Details */}
            <div className="flex-grow text-center md:text-left space-y-1">
                <h3 className="font-serif text-lg font-bold text-[#5A5A5A]">Nome prodotto: <span className="font-sans font-normal text-gray-600">{item.name}</span></h3>

                <div className="text-sm text-gray-500 space-y-1">
                    <p>Taglia: <span className="text-gray-700">{item.selectedSize}</span></p>
                    <p>Materiale: <span className="text-gray-700">{item.selectedMaterial}</span></p>
                    <p>Peso: <span className="text-gray-700">{item.weight}</span></p>
                    <p>Carati: <span className="text-gray-700">{item.carats}</span></p>
                    <p>Genere: <span className="text-gray-700">{item.gender}</span></p>
                </div>
            </div>

            {/* Price & Actions */}
            <div className="flex flex-col items-center md:items-end gap-4 min-w-[120px]">
                {/* Remove Button (Desktop) */}
                <button
                    onClick={() => removeFromCart(item.uniqueId)}
                    className="hidden md:block text-gray-400 hover:text-red-500 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Price */}
                <span className="text-2xl font-bold text-[#5A5A5A]">{formatCurrency(item.price)}</span>

                {/* Quantity Controls (Optional based on typical cart, mostly 1 for jewelry but added for completeness) */}
                <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                        onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 text-gray-500 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                    >
                        <Minus size={16} />
                    </button>
                    <span className="px-3 text-sm font-medium">{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 text-gray-500"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
