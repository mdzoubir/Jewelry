import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../../types';

interface ProductSliderProps {
    products: Product[];
    className?: string;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products, className = '' }) => {
    return (
        <div className={`flex overflow-x-auto space-x-6 pb-8 mb-8 scrollbar-hide snap-x snap-mandatory px-4 ${className}`}>
            {products.map(product => (
                <div key={product.id} className="min-w-[260px] md:min-w-[280px] snap-start">
                    <ProductCard
                        id={product.id}
                        image={product.img}
                        name={product.name}
                        price={product.price}
                        isBestSeller={product.isBestSeller}
                        imgFit="contain"
                    />
                </div>
            ))}
        </div>
    );
};

export default ProductSlider;
