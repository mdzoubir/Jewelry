import React from 'react';
import ProductCard from '../ui/ProductCard';
import Pagination from '../ui/Pagination';
import type { Product } from '../../types';
import SectionTitle from '../ui/SectionTitle';

interface ProductGridProps {
    products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    // Pagination State
    const [currentPage, setCurrentPage] = React.useState(1);
    const productsPerPage = 16;

    // Reset pagination when products array changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [products]);

    // Calculate indices
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Scroll to Top Handler
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const changePage = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            // Optional: scroll to grid top
            const gridTop = document.getElementById('product-grid-top');
            if (gridTop) gridTop.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full relative" id="product-grid-top">

            {/* Header Title */}
            <SectionTitle
                title="Scegli il prodotto perfetto per te!"
                center
                className="mb-12"
            />

            {/* Grid Layout - Matching the image: 4 columns on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 min-h-[400px]">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <div key={product.id} className="w-full">
                            <ProductCard
                                id={product.id}
                                image={product.img}
                                name={product.name}
                                price={product.price}
                                isBestSeller={product.isBestSeller}
                                isSoldOut={product.isSoldOut}
                                imgFit="cover"
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-gray-500 text-lg">
                        Nessun prodotto trovato in questa categoria.
                    </div>
                )}
            </div>

            {/* Pagination & Scroll Top Container */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={changePage}
                onScrollTop={scrollToTop}
            />

        </div>
    );
};

export default ProductGrid;
