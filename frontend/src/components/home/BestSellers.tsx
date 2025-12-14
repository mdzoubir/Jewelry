import React from 'react';
import ProductCard from '../ui/ProductCard';
import { products } from '../../data/mockData';
import Button from '../ui/Button';

const BestSellers: React.FC = () => {


    return (
        <section className="relative z-20 -mt-24 md:-mt-32">
            <div className="max-w-7xl mx-auto px-4 md:px-8 bg-[#FDFCFB] rounded-t-[3rem] shadow-2xl pt-12 pb-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-serif text-[#A89160] mr-4 leading-tight">Scopri i nuovi prodotti e i Best seller</h2>
                    <div className="flex-grow h-[1px] bg-[#C5A572] relative">
                        <div className="diamond-icon right-0 bg-[#C5A572]"></div>
                    </div>
                </div>

                <div className="flex overflow-x-auto space-x-4 md:space-x-6 pb-4 scrollbar-hide snap-x snap-mandatory">
                    {products.slice(0, 4).map((p) => (
                        <div key={p.id} className="min-w-[160px] md:min-w-[250px] flex-shrink-0 snap-start">
                            <ProductCard
                                id={p.id}
                                image={p.img}
                                name={p.name}
                                price={p.price}
                                isBestSeller={p.isBestSeller}
                            />
                        </div>
                    ))}
                </div>


                <div className="mt-12 flex items-center justify-between">
                    <div className="h-[1px] bg-[#C5A572] flex-grow mx-4"></div>
                    <Button to="/products" variant="primary" className="px-6 py-2 text-sm font-semibold">
                        Scopri di più
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default BestSellers;
