import React, { useState } from 'react';

interface ProductGalleryProps {
    images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    // Reset selected image when the images prop changes (e.g. navigating to a new product)
    React.useEffect(() => {
        if (images && images.length > 0) {
            setSelectedImage(images[0]);
        }
    }, [images]);

    return (
        <div className="flex flex-col gap-6">
            {/* Main Image */}
            <div className="w-full aspect-square bg-white rounded-xl border border-gray-200 overflow-hidden p-8 flex items-center justify-center relative">
                <img
                    src={selectedImage}
                    alt="Product"
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className={`
                            aspect-square rounded-lg border p-2 flex items-center justify-center cursor-pointer transition-all duration-300
                            ${selectedImage === img
                                ? 'border-[#A89160] ring-1 ring-[#A89160] shadow-md'
                                : 'border-gray-200 hover:border-[#A89160]/50'
                            }
                        `}
                    >
                        <img
                            src={img}
                            alt={`View ${index + 1}`}
                            className="w-full h-full object-contain"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;
