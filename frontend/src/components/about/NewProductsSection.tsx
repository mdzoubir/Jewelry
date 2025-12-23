import React from 'react';

import ProductCard from '../ui/ProductCard';
import { products } from '../../data/mockData';

const NewProductsSection: React.FC = () => {
    return (
        <section className="py-24 px-4 md:px-8 bg-white relative">


            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <h2 className="text-3xl md:text-4xl font-title font-bold text-[#A89160] mb-8 text-left">
                    Scopri i nuovi prodotti e i Best seller
                </h2>

                {/* Top Separator */}
                <div className="flex items-center w-full mb-16 opacity-70">
                    <div className="w-1.5 h-1.5 bg-[#C5A572] rotate-45 flex-shrink-0"></div>
                    <div className="h-[1px] bg-[#C5A572] flex-grow relative mx-0">
                        <div className="absolute right-[20%] top-1/2 transform -translate-y-1/2 w-3 h-3 bg-[#A89160] rotate-45"></div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#A89160] rotate-45"></div>
                    </div>
                </div>

                {/* Product Slider */}
                <div className="flex overflow-x-auto space-x-6 pb-12 scrollbar-hide snap-x snap-mandatory">
                    {products.map((p) => (
                        <div key={p.id} className="min-w-[260px] md:min-w-[300px] snap-start">
                            <ProductCard id={p.id} image={p.img || ''} name={p.name} price={p.price} isBestSeller={p.isBestSeller} imgFit="cover" />
                        </div>
                    ))}
                </div>

                {/* Bottom Separator & Button */}
                <div className="flex items-center justify-between mt-4 gap-6">
                    <div className="flex items-center flex-grow opacity-70 relative">
                        <div className="w-4 h-4 bg-[#A89160] rotate-45 flex-shrink-0"></div>
                        <div className="h-[1px] bg-[#C5A572] flex-grow mx-0 relative">
                            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#C5A572] rotate-45"></div>
                        </div>
                    </div>
                    <button className="bg-[#A89160] hover:bg-[#8C734B] text-white px-10 py-3 font-semibold transition-colors shadow-md rounded-sm text-sm whitespace-nowrap cursor-pointer">
                        Scopri di più
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewProductsSection;
