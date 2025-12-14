import React from 'react';
import { products } from '../../data/mockData';
import ProductSlider from '../ui/ProductSlider';
import handIcon from '../../assets/images/ui/hand-2.png';

const CartWishlistSection: React.FC = () => {

    const wishlistProducts = products;

    return (
        <div className="mt-12 mb-20">

            <div className="bg-[#FDFCFB] rounded-[3rem] shadow-xl p-8 md:p-12 relative border border-gray-100">


                <div className="flex flex-col items-center justify-center mb-10 relative">


                    <div className="flex items-center w-full max-w-4xl gap-4 mb-4">

                        <div className="h-[1px] bg-[#C5A572] flex-grow relative flex items-center justify-start">
                            <div className="w-2 h-2 bg-[#A89160] rotate-45 absolute left-0"></div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8C734B] text-center px-4 relative z-10 whitespace-nowrap">
                            I miei desideri
                        </h2>


                        <div className="h-[1px] bg-[#C5A572] flex-grow relative flex items-center justify-end">
                            <div className="w-2 h-2 bg-[#A89160] rotate-45 absolute right-0"></div>
                        </div>
                    </div>


                    <div className="w-24 md:w-32 opacity-80 transform -rotate-[25deg] translate-y-2">
                        <img src={handIcon} alt="Hand illustration" className="w-full h-auto object-contain" />
                    </div>
                </div>


                <ProductSlider products={wishlistProducts} />


                <div className="relative mt-4">

                    <div className="flex items-center w-full relative">
                        <div className="w-4 h-4 bg-[#D4C5A8] rotate-45 absolute left-0"></div>
                        <div className="h-[1px] bg-[#E5DCC5] w-full"></div>

                    </div>


                    <div className="flex justify-end mt-6">
                        <button className="bg-[#A89160] hover:bg-[#8C734B] text-white px-8 py-3 rounded-sm shadow-sm transition-colors text-sm font-bold">
                            Scopri di più
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartWishlistSection;
