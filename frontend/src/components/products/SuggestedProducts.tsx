import React, { useEffect, useState } from 'react';
import ProductSlider from '../ui/ProductSlider';
import client, { API_BASE_URL } from '../../api/client';
import type { Product } from '../../types';
import DiamondDivider from '../ui/DiamondDivider';

import diamonHand from '../../assets/images/ui/diamon-hand.png';
import Button from '../ui/Button';

const SuggestedProducts: React.FC = () => {
    const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchSuggested = async () => {
            try {
                const res = await client.get('/products');
                // Just take some products that are NOT best sellers, or just the first few 
                // Since backend doesn't filter by "not best seller" easily without params, we do it here or just take slice
                const all = res.data;
                const suggestions = all.slice(0, 8).map((p: any) => {
                    let imageUrl = 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2574&auto=format&fit=crop';
                    const dbImage = p.img || p.image_url;

                    if (dbImage) {
                        if (dbImage.startsWith('http')) {
                            imageUrl = dbImage;
                        } else {
                            let path = dbImage;
                            if (!path.startsWith('uploads/') && !path.startsWith('/uploads/')) {
                                path = `uploads/${path}`;
                            }
                            imageUrl = `${API_BASE_URL}/${path.replace(/^\//, '')}`;
                        }
                    }
                    return { ...p, img: imageUrl };
                });
                setSuggestedProducts(suggestions);
            } catch (err) {
                console.error("Failed to fetch suggested products", err);
            }
        };
        fetchSuggested();
    }, []);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">

                <div className="flex flex-col md:flex-row items-end md:items-center justify-between mb-12 relative">
                    <div className="hidden md:block absolute -left-10 -bottom-8 w-64 opacity-90 pointer-events-none z-0">
                        <img src={diamonHand} alt="Decoration" className="w-full h-auto" />
                    </div>

                    <div className="hidden md:block flex-1"></div>

                    <div className="flex-shrink-0 z-10 px-4">
                        <h2 className="text-3xl md:text-5xl font-serif font-normal text-[#A89160] mb-0 tracking-wide text-center">
                            I migliori articoli suggeriti per te!
                        </h2>
                    </div>

                    <div className="hidden md:flex items-center flex-1 ml-4 min-w-[100px]">
                        <DiamondDivider size={8} color="#C5A572" className="mr-2" />
                        <div className="h-[1px] bg-[#C5A572] flex-grow w-full"></div>
                        <DiamondDivider size={12} color="#C5A572" className="ml-2 mr-2" />
                        <div className="h-[1px] bg-[#C5A572] w-8"></div>
                        <div className="w-1.5 h-1.5 bg-[#C5A572] rounded-full ml-2"></div>
                    </div>
                </div>

                {/* Products Slider */}
                <div className="relative z-10 mb-16">
                    <ProductSlider products={suggestedProducts} />
                </div>

                {/* Bottom Section */}
                <div className="flex items-center justify-between mt-12">

                    {/* Left Line */}
                    <div className="flex items-center flex-grow mr-8">
                        <DiamondDivider size={16} color="#C5A572" className="mr-4" />
                        <div className="h-[1px] bg-[#C5A572] flex-grow"></div>
                        <DiamondDivider size={8} color="#C5A572" className="ml-2" />
                    </div>

                    {/* Right Button */}
                    <Button to="/products" variant="primary" className="px-10 py-3 text-sm font-bold tracking-widest uppercase bg-[#A89160] text-white hover:bg-[#8C734B]">
                        Scopri di più
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default SuggestedProducts;
