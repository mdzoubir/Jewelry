export interface Product {
    id: number;
    img: string; // URL path to image
    name: string;
    price: number;
    isWishlisted?: boolean;
    isBestSeller?: boolean;
    isSoldOut?: boolean;
    category?: string;
    description?: string;
    weight?: string;
    carat?: string;
    gender?: string;
    sizes?: string[];
    materials?: string[];
    gemColors?: string[];
    images?: string[];
}

export interface CartItem extends Product {
    uniqueId: string;
    quantity: number;
    selectedSize: string;
    selectedMaterial: string;
    weight: string;
    carats: string;
    gender: string;
    isSelected: boolean;
}

export interface Review {
    id: number;
    img: string;
    name: string;
    text: string;
    rating: number; // 1-5
}

export interface Feature {
    id: number;
    img: string;
    title: string;
    description: string;
}

export interface Category {
    id: number;
    img: string;
    title: string;
    link: string;
}


