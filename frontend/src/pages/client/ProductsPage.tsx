import React, { useState } from 'react';
import usePageTitle from '../../hooks/usePageTitle';
import heroBg from '../../assets/images/about/about_mission.jpg';
import ProductGrid from '../../components/products/ProductGrid';
import CartNewProductsSection from '../../components/cart/CartNewProductsSection';
import QuoteSection from '../../components/products/QuoteSection';
import PageHero from '../../components/ui/PageHero';
import FilterBar from '../../components/products/FilterBar';
import Pagination from '../../components/ui/Pagination';

const filterCategories = [
    "Anniversario", "Fidanzamento", "Battesimo", "Cresima", "Comunione", "Laurea", "Natale", "San Valentino"
];

const ProductsPage: React.FC = () => {
    usePageTitle("Mya Oro | Gioielli per eventi");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);


    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Use the relative path if proxy is set up or absolute URL from client config
                // Assuming client.ts is configured with baseURL
                const response = await import('../../api/client').then(m => m.default.get('/products'));

                // Map backend data to UI format
                const mappedProducts = response.data.map((p: any) => {
                    let imageUrl = 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2574&auto=format&fit=crop'; // Default fallback

                    if (p.image_url) {
                        if (p.image_url.startsWith('http')) {
                            imageUrl = p.image_url;
                        } else {
                            const baseUrl = 'http://localhost:3000';
                            let path = p.image_url;

                            if (!path.startsWith('uploads/') && !path.startsWith('/uploads/')) {
                                path = `uploads/${path}`;
                            }

                            imageUrl = `${baseUrl}/${path.replace(/^\//, '')}`;
                        }
                    }

                    return {
                        ...p,
                        img: imageUrl,
                        category: p.category_id ? 'Gioielli' : 'Altro',
                        price: Number(p.price),
                        isWishlisted: false,
                        isBestSeller: false,
                        isSoldOut: false
                    };
                });

                setProducts(mappedProducts);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("Impossibile caricare i prodotti al momento.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = selectedCategory
        ? products.filter(p => p.category === selectedCategory)
        : products;

    // Pagination Logic
    const ITEMS_PER_PAGE = 16;
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <div className="min-h-screen pt-32 text-center text-[#6D635B]">Caricamento prodotti...</div>;
    if (error) return <div className="min-h-screen pt-32 text-center text-red-500">{error}</div>;

    return (
        <div className="pt-24 md:pt-32 pb-20 px-4 md:px-8 max-w-[1920px] mx-auto min-h-screen">

            <PageHero
                bgImage={heroBg}
                title="Christmas Sale"
                subtitle="USE THIS COUPON NUMBER: #235467"
                description="Lorem ipsum dolor sit amet consectetur."
                description2="Sagittis ipsum non vel commodo arcu."
            />

            <FilterBar
                categories={filterCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={(category) => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                }}
            />

            {/* Product Grid with Paginated Items */}
            <ProductGrid products={currentProducts} />

            {/* Pagination Control */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onScrollTop={handleScrollTop}
            />

            <div className="my-24">
                <CartNewProductsSection />
            </div>

            <QuoteSection />
        </div>
    );
};

export default ProductsPage;
