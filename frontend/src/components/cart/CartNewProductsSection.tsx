import React from 'react';
import { products } from '../../data/mockData';
import ProductSlider from '../ui/ProductSlider';

const CartNewProductsSection: React.FC = () => {
    // Show products
    const newProducts = products;

    return (
        <div className="mt-12 mb-20 max-w-[1920px] mx-auto px-4">

            {/* Header Section */}
            <div className="mb-12">
                <h2 className="text-3xl md:text-3xl font-serif font-bold text-[#8C734B] text-left mb-6">
                    Scopri i nuovi prodotti e i Best seller
                </h2>

                {/* Decorative Separator Line */}
                <div className="flex items-center w-full relative h-4">
                    {/* Start Diamond (Small) */}
                    <div className="w-1.5 h-1.5 bg-[#C5A572] rotate-45 absolute left-0"></div>

                    {/* Line */}
                    <div className="h-[1px] bg-[#C5A572] w-full absolute top-1/2 transform -translate-y-1/2"></div>

                    {/* Middle Diamond (Medium) - positioned roughly 60% across or middle */}
                    <div className="w-3 h-3 bg-[#C5A572] rotate-45 absolute left-[60%] transform -translate-x-1/2"></div>

                    {/* End Diamond (Large) */}
                    <div className="w-5 h-5 bg-[#C5A572]/80 rotate-45 absolute right-0"></div>
                </div>
            </div>

            {/* Products Slider */}
            <ProductSlider products={newProducts} className="-mx-4" />

            {/* Footer Section */}
            <div className="relative mt-4">
                {/* Full width line with diamonds */}
                <div className="flex items-center w-full relative">
                    <div className="w-4 h-4 bg-[#D4C5A8] rotate-45 absolute left-0"></div>
                    <div className="w-3 h-3 bg-[#D4C5A8] rotate-45 absolute left-[50%]"></div>
                    <div className="h-[1px] bg-[#E5DCC5] w-full"></div>
                    <div className="w-2 h-2 bg-[#D4C5A8] rotate-45 absolute right-32 md:right-40"></div>
                </div>

                {/* Button positioned below the line on the right */}
                <div className="flex justify-end mt-6">
                    <button className="bg-[#A89160] hover:bg-[#8C734B] text-white px-8 py-3 rounded-sm shadow-sm transition-colors text-sm font-bold">
                        Scopri di più
                    </button>
                </div>
            </div>

        </div>
    );
};

export default CartNewProductsSection;
