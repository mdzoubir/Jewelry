import React, { useEffect, useState } from 'react';
import ProductCard from '../ui/ProductCard';
import Button from '../ui/Button';
import client, { API_BASE_URL } from '../../api/client';
import type { Product } from '../../types';

const BestSellers: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                const res = await client.get('/products');
                const allProducts = res.data;
                const bestSellers = allProducts.filter((p: any) => p.is_best_seller).slice(0, 10);

                const displayProducts = bestSellers.length > 0 ? bestSellers : allProducts.slice(0, 10);

                const mappedProducts = displayProducts.map((p: any) => {
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
                    return {
                        ...p,
                        img: imageUrl,
                        isBestSeller: Boolean(p.is_best_seller)
                    };
                });

                setProducts(mappedProducts);
            } catch (error) {
                console.error("Failed to fetch best sellers", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBestSellers();
    }, []);

    if (loading) return <div className="py-20 text-center">Caricamento...</div>;
    if (products.length === 0) return null;

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
                    {products.map((p) => (
                        <div key={p.id} className="min-w-[280px] md:min-w-[320px] flex-shrink-0 snap-start">
                            <ProductCard
                                id={p.id}
                                image={p.img || ''}
                                name={p.name}
                                price={Number(p.price)}
                                isBestSeller={Boolean(p.isBestSeller)}
                                imgFit="cover"
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
