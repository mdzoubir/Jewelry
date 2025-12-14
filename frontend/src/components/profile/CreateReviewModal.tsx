import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import Button from '../ui/Button';

interface CreateReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products?: any[]; // List of products to review
}

const StarIcon: React.FC<{ filled?: boolean, className?: string }> = ({ filled, className }) => (
    <svg
        viewBox="0 0 24 24"
        fill={filled ? "#C5A572" : "none"}
        stroke={filled ? "none" : "#C5A572"}
        strokeWidth="1.5"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
);

const CornerStar: React.FC<{ className?: string }> = ({ className }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#C5A572" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
);


const CreateReviewModal: React.FC<CreateReviewModalProps> = ({ isOpen, onClose, products = [] }) => {
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const [rating, setRating] = useState(0);

    // Mock products if none provided for preview
    const reviewProducts = products.length > 0 ? products : [
        { id: 1, image: 'https://images.pexels.com/photos/33222148/pexels-photo-33222148.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 2, image: 'https://images.pexels.com/photos/33154633/pexels-photo-33154633.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 3, image: 'https://images.pexels.com/photos/6563393/pexels-photo-6563393.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 4, image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 5, image: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 6, image: 'https://images.pexels.com/photos/266621/pexels-photo-266621.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-[#FDFBF7] rounded-xl w-full max-w-lg relative animate-in fade-in zoom-in duration-200 shadow-2xl p-8 max-h-[90vh] overflow-y-auto">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-serif text-[#6D635B] mb-2 font-bold">Scrivi una recensione</h2>
                <p className="text-[#8A8A8A] mb-6">Seleziona gli articoli che desideri recensire</p>

                {/* Product Selection List */}
                <div className="flex gap-4 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                    {reviewProducts.map((prod) => (
                        <div
                            key={prod.id}
                            onClick={() => setSelectedProduct(prod.id)}
                            className={`
                                w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg border-2 p-1 cursor-pointer transition-all
                                ${selectedProduct === prod.id ? 'border-[#A89160] scale-105 shadow-md' : 'border-[#E5E0D5] hover:border-[#C5A572]'}
                            `}
                        >
                            <img src={prod.image} alt="Product" className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                    ))}
                </div>

                <form className="space-y-6">
                    {/* Title */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Titolo recensione"
                            className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                        />
                        <CornerStar className="absolute -top-2 -right-2 text-[#C5A572] w-4 h-4 bg-[#FDFBF7]" />
                    </div>

                    {/* Review Text */}
                    <div className="relative">
                        <textarea
                            rows={3}
                            placeholder="Facci sapere cosa ne pensi dei nostri prodotti!&#10;La tua recensione è importante per noi."
                            className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572] resize-none leading-relaxed"
                        ></textarea>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-4 py-2 justify-start">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="w-6 h-6 focus:outline-none transform hover:scale-110 transition-transform"
                            >
                                <StarIcon
                                    filled={star <= rating}
                                    className="w-6 h-6"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Image Upload */}
                    <div className="pt-2">
                        <label className="flex items-center gap-2 text-[#6D635B] cursor-pointer hover:text-[#A89160] transition-colors w-fit">
                            <Upload size={20} />
                            <span className="text-lg font-medium">Carica la foto dell'articolo</span>
                            <input type="file" className="hidden" />
                        </label>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button
                            className="bg-[#A89160] text-white px-12 py-3 text-lg font-medium rounded hover:bg-[#8C734B] shadow-lg shadow-[#A89160]/20"
                        >
                            Pubblica
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateReviewModal;
