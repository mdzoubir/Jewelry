import React from 'react';
import ProductSlider from '../ui/ProductSlider';
import { products } from '../../data/mockData';
import DiamondDivider from '../ui/DiamondDivider';

// Placeholder or similar hand asset - likely hand-3.png based on name
import handDecoration from '../../assets/images/ui/hand-3.png';
import Button from '../ui/Button';

const WishlistSection: React.FC = () => {
    // Just grab some products for now
    const wishlistProducts = products.slice(2, 10);

    return (
        <section className="py-12 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 ">

                {/* Card Container */}
                <div className="bg-[#FDFBF7] rounded-[3rem] px-6 py-16 md:px-12 md:py-20 shadow-sm relative">

                    <div className="flex flex-col items-center justify-center mb-16 relative">
                        <div className="flex items-center justify-center w-full max-w-[90%] md:max-w-6xl opacity-90 mb-6">
                            <div className="flex items-center flex-grow">
                                <DiamondDivider size={8} color="#C5A572" />
                                <div className="h-[1px] bg-[#C5A572] flex-grow ml-4 mr-6"></div>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-serif font-normal text-[#A89160] tracking-wide whitespace-nowrap px-4">
                                I miei desideri
                            </h2>

                            <div className="flex items-center flex-grow">
                                <div className="h-[1px] bg-[#C5A572] flex-grow ml-6 mr-4"></div>
                                <DiamondDivider size={8} color="#C5A572" />
                            </div>
                        </div>

                        <div className="w-32 md:w-40 mx-auto opacity-90 relative z-10">
                            <img src={handDecoration} alt="Decoration" className="w-full h-auto" />
                        </div>
                    </div>

                    <div className="relative z-10 mb-16">
                        <ProductSlider products={wishlistProducts} />
                    </div>

                    <div className="flex items-center justify-between mt-12 w-full mx-auto px-4">
                        <div className="flex items-center flex-grow mr-6">
                            <DiamondDivider size={16} color="#C5A572" className="mr-0" />
                            <div className="h-[1px] bg-[#C5A572] flex-grow"></div>
                            <DiamondDivider size={8} color="#C5A572" className="ml-0" />
                        </div>

                        <div className="pl-4 border-l-0 border-[#C5A572]">
                            <Button to="/products" variant="primary" className="px-8 py-3 text-sm font-bold tracking-widest uppercase bg-[#A89160] text-white hover:bg-[#8C734B] shadow-sm">
                                Scopri di più
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WishlistSection;
