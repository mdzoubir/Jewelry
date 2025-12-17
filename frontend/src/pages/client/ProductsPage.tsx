import React, { useState } from 'react';
import usePageTitle from '../../hooks/usePageTitle';
import heroBg from '../../assets/images/about/about_mission.jpg';
import ProductGrid from '../../components/products/ProductGrid';
import CartNewProductsSection from '../../components/cart/CartNewProductsSection';
import QuoteSection from '../../components/products/QuoteSection';
import PageHero from '../../components/ui/PageHero';
import FilterBar from '../../components/products/FilterBar';
import Pagination from '../../components/ui/Pagination';
import { products } from '../../data/mockData';

const filterCategories = [
    "Anniversario", "Fidanzamento", "Battesimo", "Cresima", "Comunione", "Laurea", "Natale", "San Valentino"
];

const ITEMS_PER_PAGE = 16;

const ProductsPage: React.FC = () => {
    usePageTitle("Mya Oro | Gioielli per eventi");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);


    const filteredProducts = selectedCategory
        ? products.filter(p => p.category === selectedCategory)
        : products;




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
