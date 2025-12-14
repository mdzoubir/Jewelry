import React, { useState } from 'react';
import { formatCurrency } from '../../utils/currency';
import SizeRangeSlider from '../ui/SizeRangeSlider';
import Button from '../ui/Button';
import type { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Heart, Info, Check } from 'lucide-react';

interface ProductInfoProps {
    product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const { addToCart } = useShop();
    const [isAdded, setIsAdded] = useState(false);

    // Default sizes if product has none
    const defaultSizes = product.sizes && product.sizes.length > 0
        ? product.sizes
        : ["0,5mm", "10mm", "20mm"]; // Fallback scale

    const [selectedSize, setSelectedSize] = useState<string | null>(defaultSizes[1]); // Default middle

    // Default mock materials if not present, to match design exactly
    const materials = product.materials && product.materials.length > 0
        ? product.materials
        : ["Oro giallo", "Oro bianco", "Oro rosa"];

    const [selectedMaterial, setSelectedMaterial] = useState<string | null>(materials[1]); // Default Oro giallo

    const gemColors = product.gemColors || ["#D40000", "#1C7F36", "#1C1C85", "#FFFFFF"];
    const [selectedGemColor, setSelectedGemColor] = useState<string | null>(gemColors[0]);

    const getMaterialColor = (mat: string) => {
        if (mat.toLowerCase().includes('bianco')) return '#F9F9F9';
        if (mat.toLowerCase().includes('giallo')) return '#D4AF37';
        if (mat.toLowerCase().includes('rosa')) return '#E6C6C2';
        return '#C0C0C0';
    };

    // Continuous Slider Logic
    // Maintain numeric state for smooth sliding
    // Parse "12mm" -> 12.0
    const parseSize = (s: string) => parseFloat(s.replace(',', '.').replace('mm', ''));

    const minSize = parseSize(defaultSizes[0]);
    const maxSize = parseSize(defaultSizes[defaultSizes.length - 1]);

    // Initialize carefully to avoid NaN if parse fails, fallback to 12.0
    const [sliderValue, setSliderValue] = useState<number>(() => {
        const val = parseSize(defaultSizes[1] || "12mm");
        return isNaN(val) ? 12 : val;
    });

    const handleSliderChange = (val: number) => {
        setSliderValue(val);
        // Format for display
        setSelectedSize(`${val.toFixed(1).replace('.', ',')}mm`);
    };



    const handleAddToCart = () => {
        if (product.isSoldOut) return;
        addToCart(product, {
            selectedSize: selectedSize || undefined,
            selectedMaterial: selectedMaterial || undefined
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="relative font-sans text-[#524B43] max-w-lg">

            <h1 className="text-4xl font-serif text-[#524B43] mb-4 font-bold tracking-tight">
                {product.name}
            </h1>


            <p className="text-[#9A9A9A] text-sm mb-8 leading-relaxed">
                {product.description || "Lorem ipsum dolor sit amet consectetur. Dolor nulla sit dictumst dictumst. Ipsum nec pellentesque ut vitae faucibus urna suspendisse nunc."}
            </p>


            <div className="space-y-2 mb-10 text-sm">
                <div className="flex items-center gap-1">
                    <span className="font-bold text-[#6B5E4F]">Peso:</span>
                    <span className="text-[#6B5E4F] font-serif">{product.weight || "5gr"}</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="font-bold text-[#6B5E4F]">{product.carat || "18k"}</span>
                    <span className="text-[#6B5E4F]">Carati</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="font-bold text-[#6B5E4F]">Genere</span>
                    <span className="text-[#6B5E4F]">{product.gender || "Femminile"}</span>
                </div>
            </div>


            <div className="mb-6">
                <div className="flex justify-between items-baseline mb-3">
                    <span className="text-[#5A5A5A] font-bold text-sm tracking-wide">SELEZIONA MISURA</span>
                    <a href="#" className="text-[#A89160] text-xs underline decoration-1 underline-offset-2 hover:text-[#8C734B] font-medium">
                        Guida alle taglie
                    </a>
                </div>

                <SizeRangeSlider
                    min={minSize}
                    max={maxSize}
                    value={sliderValue}
                    labelValue={selectedSize || "12mm"}
                    onChange={handleSliderChange}
                />
            </div>


            <div className="mb-10">
                <h3 className="font-bold text-[#6B5E4F] mb-4 text-sm">Seleziona materiale</h3>
                <div className="flex items-start gap-5">
                    {materials.map((mat) => (
                        <button
                            key={mat}
                            onClick={() => setSelectedMaterial(mat)}
                            className="flex flex-col items-center gap-2 group outline-none"
                        >
                            <div className={`
                                w-8 h-8 rounded-[4px] shadow-sm border transition-all duration-300
                        ${selectedMaterial === mat ? 'ring-2 ring-offset-1 ring-[#C5A572] border-transparent' : 'border-gray-200'}
                            `}
                                style={{ backgroundColor: getMaterialColor(mat) }}
                            />
                            <span className="text-[10px] text-center w-full text-[#6B5E4F] font-medium leading-tight max-w-[50px]">
                                {mat}
                            </span>
                        </button>
                    ))}
                </div>
            </div>


            <div className="mb-12">
                <h3 className="font-bold text-[#6B5E4F] mb-4 text-sm">Colore delle gemme</h3>
                <div className="flex items-center gap-4">
                    {gemColors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedGemColor(color)}
                            className={`
                                w-8 h-8 rounded-full shadow-sm border transition-all duration-300
                                ${selectedGemColor === color ? 'ring-2 ring-offset-1 ring-[#C5A572] border-transparent' : 'border-gray-200'}
                            `}
                            style={{ backgroundColor: color }}
                        />
                    ))}

                    <button
                        onClick={() => setSelectedGemColor('white')}
                        className={`
                            w-8 h-8 rounded-full shadow-sm border transition-all duration-300
                            ${selectedGemColor === 'white' ? 'ring-2 ring-offset-1 ring-[#C5A572] border-transparent' : 'border-gray-200'}
                        `}
                        style={{ backgroundColor: '#fff' }}
                    />
                </div>
            </div>


            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8 pt-6 border-t border-[#E5E5E5]/50">


                <div className="relative border border-[#C5A572] pl-6 pr-12 py-5 rounded-sm min-w-[170px] bg-white shadow-[2px_2px_0px_#f9f8f6]">
                    <span className="block text-[#9A9A9A] text-sm mb-1 font-light">Prezzo</span>
                    <span className="block text-4xl font-bold text-[#9C8B74] tracking-tight">{formatCurrency(product.price)}</span>


                    <div className="absolute -top-5 -right-5 text-[#C5A572]">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
                            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                        </svg>
                    </div>
                </div>


                <div className="flex-grow">
                    <Button
                        onClick={handleAddToCart}
                        disabled={isAdded || !!product.isSoldOut}
                        fullWidth
                        className="h-full py-5 text-base tracking-widest shadow-lg shadow-[#A89160]/20"
                    >
                        {isAdded ? (
                            <span className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                                <Check size={20} /> AGGIUNTO!
                            </span>
                        ) : product.isSoldOut ? (
                            "NON DISPONIBILE"
                        ) : (
                            "AGGIUNGI AL CARRELLO"
                        )}
                    </Button>
                </div>
            </div>


            <div className="grid grid-cols-2 gap-4 mt-4">

                <button className="flex items-center justify-center gap-2 py-3 border border-[#E5E5E5] text-[#9A9A9A] text-xs font-bold tracking-widest hover:border-[#C5A572] hover:text-[#C5A572] transition-colors uppercase rounded-sm group">
                    <Heart size={16} className="group-hover:scale-110 transition-transform" />
                    Aggiungi alla Wishlist
                </button>

                <button className="flex items-center justify-center gap-2 py-3 border border-[#E5E5E5] text-[#9A9A9A] text-xs font-bold tracking-widest hover:border-[#5A5A5A] hover:text-[#5A5A5A] transition-colors uppercase rounded-sm">
                    <Info size={16} />
                    Richiedi Informazioni
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;
