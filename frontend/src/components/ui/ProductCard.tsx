import React, { useState } from 'react';
import { Heart, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { formatCurrency } from '../../utils/currency';
import Button from '../ui/Button';

interface ProductCardProps {
    id: number;
    image: string;
    name: string;
    price: number;
    isBestSeller?: boolean;
    isSoldOut?: boolean;
    onAddToCart?: () => void;
    imgFit?: "cover" | "contain";
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, name, price, isBestSeller, imgFit = 'contain', isSoldOut }) => {
    const { addToCart, wishlist, toggleWishlist } = useShop();
    const [isAdded, setIsAdded] = useState(false);

    // Check if product is in wishlist
    const isWishlisted = wishlist.includes(id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isSoldOut) return;
        addToCart({
            id,
            name,
            price,
            img: image,
            isBestSeller: !!isBestSeller
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);

        // Optional: Trigger a vibration on mobile
        if (navigator.vibrate) navigator.vibrate(50);
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSoldOut) return;
        toggleWishlist(id);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border-none flex flex-col group relative overflow-hidden h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <Link to={`/product/${id}`} className="flex flex-col h-full">
                {isSoldOut && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-20 flex items-center justify-center pointer-events-none">
                        <span className="text-white font-serif font-bold text-2xl tracking-wider px-6 py-2 bg-[#A89160]/80 shadow-md transform -rotate-12">
                            SOLD OUT
                        </span>
                    </div>
                )}

                {isBestSeller && (
                    <div className="absolute top-0 left-0 z-10 overflow-hidden w-24 h-24 pointer-events-none">
                        <div className="absolute top-0 left-0 bg-[#A89160] text-white text-[9px] font-bold py-1 w-32 text-center transform -rotate-45 -translate-x-8 translate-y-4 shadow-sm">
                            BEST SELLER
                        </div>
                    </div>
                )}

                {/* Image Section - White Background, Full Width */}
                <div className="relative h-64 w-full flex items-center justify-center bg-white overflow-hidden shrink-0">
                    <img src={image} alt={name} className={`h-full w-full group-hover:scale-105 transition-transform duration-500 object-${imgFit} ${isSoldOut ? 'grayscale-[0.5]' : ''}`} />
                </div>

                {/* Content Section - Beige Background, Padding */}
                <div className="p-5 bg-[#F9F8F6] flex flex-col flex-grow relative">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-lg text-gray-700 font-serif mb-1 group-hover:text-[#A89160] transition-colors">{name}</h3>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Oro giallo 5gr</p>
                        </div>
                        <div onClick={handleToggleWishlist} className={isSoldOut ? "opacity-50 cursor-not-allowed" : ""}>
                            <Heart
                                className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-[#A89160] text-[#A89160]' : 'text-[#A89160] hover:fill-current'} ${isSoldOut ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xl font-bold text-gray-800">{formatCurrency(price)}</span>
                        <div className="border border-gray-300 p-1 rounded-sm text-[8px] font-bold text-gray-500 bg-white">
                            18KT
                        </div>
                    </div>

                    <div className="flex space-x-1 mt-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        <div className="w-3 h-3 rounded-full bg-gold"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-100 border border-gray-200"></div>
                    </div>
                    <Button
                        onClick={handleAddToCart}
                        disabled={isAdded || !!isSoldOut}
                        variant={isAdded ? "success" : "primary"}
                        fullWidth
                        className="py-2 text-sm mt-auto z-30"
                    >
                        {isAdded ? (
                            <span className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                                <Check size={16} /> Aggiunto!
                            </span>
                        ) : isSoldOut ? (
                            "Non disponibile"
                        ) : (
                            "Aggiungi al carrello"
                        )}
                    </Button>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
