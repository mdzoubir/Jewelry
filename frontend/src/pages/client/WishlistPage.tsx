import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ui/ProductCard';
import handIcon from '../../assets/images/ui/hand-2.png';
import { useShop } from '../../context/ShopContext';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import client, { API_BASE_URL } from '../../api/client';
import type { Product } from '../../types';

const WishlistPage: React.FC = () => {
    const { wishlist } = useShop(); // We observe this to trigger re-fetches if needed
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await client.get('/wishlist');
                const mappedProducts = res.data.map((item: { product: any }) => {
                    const p = item.product;
                    // Handle image logic
                    let imageUrl = 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2574&auto=format&fit=crop';
                    const dbImage = p.image_url || p.img;

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
                        id: p.id,
                        name: p.name,
                        price: Number(p.price),
                        img: imageUrl,
                        isBestSeller: !!p.isBestSeller,
                        isSoldOut: !!p.isSoldOut,
                        // Add other fields if needed
                    };
                });
                setProducts(mappedProducts);
            } catch (err) {
                console.error("Failed to fetch wishlist", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [wishlist]); // Re-fetch when wishlist IDs change (e.g. removed item via heart)

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <div className="min-h-screen pt-40 px-4 text-center">Caricamento desideri...</div>;

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-[#FEFEFD]">

            <div className="w-full max-w-7xl mx-auto grid grid-cols-[auto_1fr_auto] gap-4 md:gap-12 items-stretch">

                {/* Left Line Decoration */}
                <div className="hidden md:flex flex-col items-center justify-center pt-20">
                    <div className="w-24 md:w-32 opacity-80 mb-8 transform -rotate-[10deg]">
                        <img src={handIcon} alt="Hand" className="w-full h-auto object-contain" />
                    </div>
                    <div className="flex-grow w-[1px] bg-[#C5A572] relative min-h-[500px]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#C5A572]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-[#C5A572]"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#C5A572]"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-full">
                    <div className="text-center mb-16">
                        <h1 className="text-3xl md:text-5xl font-serif text-[#6D635B] font-bold mb-4 tracking-tight">I miei desideri</h1>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-10">
                            {products.map((product) => (
                                <div key={product.id} className="w-full max-w-[320px] mx-auto">
                                    <ProductCard
                                        id={product.id}
                                        image={product.img || ''}
                                        name={product.name}
                                        price={product.price}
                                        isBestSeller={product.isBestSeller}
                                        isSoldOut={product.isSoldOut}
                                        imgFit="cover"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-[#8A8A8A] text-lg mb-8">Non hai ancora aggiunto prodotti alla tua lista dei desideri.</p>
                            <Link to="/products">
                                <Button variant="primary">
                                    Inizia lo shopping
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Right Line Decoration */}
                <div className="hidden md:flex flex-col items-center justify-center pt-20 relative">
                    <div className="w-24 md:w-32 opacity-80 mb-8 transform rotate-[10deg] scale-x-[-1]">
                        <img src={handIcon} alt="Hand" className="w-full h-auto object-contain" />
                    </div>
                    <div className="flex-grow w-[1px] bg-[#C5A572] relative min-h-[500px]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#C5A572]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-[#C5A572]"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#C5A572]"></div>
                    </div>

                    {/* Scroll to Top Button (Aligned with right line interactively) */}
                    <button
                        onClick={scrollToTop}
                        className="absolute bottom-40 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#F9F8F6] rounded border border-[#E5E0D5] flex items-center justify-center text-[#A89160] hover:bg-[#A89160] hover:text-white transition-all shadow-md z-10"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 15l-6-6-6 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;
