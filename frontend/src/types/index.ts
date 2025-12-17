export interface Product {
    id: number;
    category_id?: number | null;
    name: string;
    slug: string;
    description?: string | null;
    price: number;
    image_url?: string | null;
    created_at?: string;
    category?: string;
    images?: string[];
    img?: string;
    isWishlisted?: boolean;
    isBestSeller?: boolean;
    isSoldOut?: boolean;
    weight?: string;
    carat?: string;
    gender?: string;
    sizes?: string[];
    materials?: string[];
    gemColors?: string[];
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


