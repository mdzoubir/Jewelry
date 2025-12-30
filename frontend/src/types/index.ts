export interface Product {
    id: number;
    category_id?: number | null;
    name: string;
    slug?: string;
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
    dbId?: number; // Database ID for backend sync
    quantity: number;
    selectedSize?: string;
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


export interface User {
    id: number;
    name: string;
    email: string;
    role: 'customer' | 'admin';
    phone?: string;
}

export interface FilterState {
    gender?: string | null;
    type?: string | null;
    ringSize?: [number, number];
    carats?: [number, number];
    price?: [number, number];
    material?: string | null;
    gemColor?: string | null;
}

export interface FilterProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}
