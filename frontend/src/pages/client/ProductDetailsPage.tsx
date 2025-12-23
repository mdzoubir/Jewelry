import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../data/mockData';
import ProductGallery from '../../components/product-details/ProductGallery';
import ProductInfo from '../../components/product-details/ProductInfo';
import Reviews from '../../components/home/Reviews';
import SuggestedProducts from '../../components/products/SuggestedProducts';
import WishlistSection from '../../components/products/WishlistSection';




const ProductDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = products.find(p => p.id === Number(id)) || null;

    if (!product) {
        return <div className="min-h-screen pt-40 text-center">Prodotto non trovato loading...</div>;
    }


    const images = product.images && product.images.length > 0
        ? product.images
        : [product.img || '', products[0]?.img || '', products[1]?.img || ''].filter(Boolean);

    return (
        <div className="pt-36 pb-24 min-h-screen bg-white relative overflow-hidden font-sans">

            {/* Background Hand Illustration - Visual Flourish */}
            {/* Positioned absolutely to match the design template (right side, behind text) */}
            <div className="absolute top-[15%] -right-[5%] w-[45%] h-auto opacity-40 pointer-events-none z-0 hidden xl:block select-none mix-blend-multiply">
                <svg viewBox="0 0 800 600" className="w-full h-full text-[#E5DBCB]" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {/* Artistic hand-like curves matching the reference abstractly */}
                    <path d="M400,600 C450,550 500,400 550,350 C600,300 700,280 750,300" strokeOpacity="0.6" />
                    <path d="M550,350 C580,250 650,150 720,100" strokeOpacity="0.6" />
                    <path d="M520,380 C500,300 480,200 500,100" strokeOpacity="0.6" />
                    <path d="M480,420 C400,450 350,550 300,600" strokeOpacity="0.6" />
                    {/* Ring/String line */}
                    <path d="M500,100 L500,250 L530,280" strokeDasharray="4 4" strokeWidth="1" />
                </svg>
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">

                {/* Custom Breadcrumbs from Design */}
                <div className="flex items-center justify-center gap-4 text-sm text-[#8A8A8A] font-medium mb-16 tracking-wide">
                    <span className="text-[#8A8A8A] font-semibold flex items-center gap-2 hover:text-[#C5A572] transition-colors cursor-pointer">
                        Prodotti
                        <span className="text-[#C5A572] text-xl leading-none">✦</span>
                    </span>

                    <span className="h-[1px] w-12 bg-[#E0E0E0]"></span>

                    <span className="text-[#524B43] font-bold flex items-center gap-2">
                        Carrello
                        <span className="text-[#C5A572] text-lg leading-none">♦</span>
                    </span>

                    <span className="h-[1px] w-12 bg-[#E0E0E0]"></span>

                    <span className="text-[#8A8A8A] whitespace-nowrap">
                        Completa il pagamento
                    </span>

                    <span className="h-[1px] w-12 bg-[#E0E0E0]"></span>

                    <span className="text-[#8A8A8A] whitespace-nowrap">
                        Completa l'acquisto
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    {/* Left Column: Gallery (Spans 6 cols) */}
                    <div className="lg:col-span-6 w-full max-w-[600px] mx-auto lg:mx-0 lg:max-w-none">
                        <ProductGallery images={images} />
                    </div>

                    {/* Right Column: Info (Spans 5 cols + 1 offset) */}
                    <div className="lg:col-span-5 lg:col-start-8">
                        <ProductInfo product={product} />
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-24">
                <Reviews />
            </div>

            {/* Suggested Products Section */}
            <div className="mt-24 pb-24 max-w-[1600px] mx-auto px-6 md:px-12">
                <SuggestedProducts />
            </div>

            {/* Wishlist Section (I miei desideri) */}
            <div className="mt-0 pb-24 max-w-[1600px] mx-auto px-6 md:px-12">
                <WishlistSection />
            </div>
        </div>
    );
};

export default ProductDetailsPage;
