import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem } from '../types';
import { useAuth } from './AuthContext';
import client from '../api/client';

interface ShopContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, options?: Partial<CartItem>) => void;
    removeFromCart: (uniqueId: string) => void;
    updateQuantity: (uniqueId: string, quantity: number) => void;
    toggleItemSelection: (uniqueId: string) => void;
    shippingCost: number;
    taxRate: number;
    subtotal: number;
    taxAmount: number;
    total: number;
    discountCode: string;
    applyDiscount: (code: string) => void;
    discountAmount: number;
    wishlist: number[];
    toggleWishlist: (productId: number) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error("useShop must be used within a ShopProvider");
    }
    return context;
};

interface ShopProviderProps {
    children: ReactNode;
}

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const saved = localStorage.getItem('mya_shop_cart');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to parse cart", e);
            return [];
        }
    });

    const [wishlist, setWishlist] = useState<number[]>(() => {
        try {
            const saved = localStorage.getItem('mya_shop_wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to parse wishlist", e);
            return [];
        }
    });

    const [discountCode, setDiscountCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);


    const shippingCost = 15.00;
    const taxRate = 0.10;
    const otherTax = 20.00;


    useEffect(() => {
        const syncCart = async () => {
            if (isAuthenticated) {
                try {
                    const response = await client.get('/cart');
                    const serverCart = response.data;

                    const mappedCart: CartItem[] = serverCart.map((item: any) => ({
                        id: item.product_id,
                        dbId: item.id,
                        name: item.name,
                        price: Number(item.price),
                        img: item.image_url,
                        slug: item.slug,
                        uniqueId: `${item.product_id}-${item.id}`,
                        quantity: item.quantity,
                        ...item.options,
                        isSelected: true
                    }));

                    setCartItems(mappedCart);

                } catch (error) {
                    console.error("Failed to sync cart", error);
                }
            }
        };
        syncCart();
    }, [isAuthenticated]);

    useEffect(() => {
        localStorage.setItem('mya_shop_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('mya_shop_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToCart = async (product: Product, options?: Partial<CartItem>) => {
        const newItem: CartItem = {
            ...product,
            uniqueId: `${product.id}-${Date.now()}`,
            quantity: 1,
            selectedSize: options?.selectedSize || "5,6mm",
            selectedMaterial: options?.selectedMaterial || "Oro bianco",
            weight: options?.weight || "4 gr",
            carats: options?.carats || "16k",
            gender: options?.gender || "F",
            isSelected: true,
            ...options
        };

        setCartItems(prev => [...prev, newItem]);

        if (isAuthenticated) {
            try {
                const backendOptions = {
                    selectedSize: newItem.selectedSize,
                    selectedMaterial: newItem.selectedMaterial,
                };
                await client.post('/cart', {
                    product_id: product.id,
                    quantity: 1,
                    options: backendOptions
                });
            } catch (error) {
                console.error("Failed to add to backend cart", error);
            }
        }
    };

    const removeFromCart = async (uniqueId: string) => {
        const itemToRemove = cartItems.find(item => item.uniqueId === uniqueId);
        setCartItems(prev => prev.filter(item => item.uniqueId !== uniqueId));

        if (isAuthenticated && itemToRemove) {
            try {
                await client.delete(`/cart/${itemToRemove.id}`);
            } catch (error) {
                console.error("Failed to remove from backend cart", error);
            }
        }
    };

    const updateQuantity = (uniqueId: string, quantity: number) => {
        if (quantity < 1) return;
        setCartItems(prev => prev.map(item =>
            item.uniqueId === uniqueId ? { ...item, quantity } : item
        ));
    };

    const toggleItemSelection = (uniqueId: string) => {
        setCartItems(prev => prev.map(item =>
            item.uniqueId === uniqueId ? { ...item, isSelected: !item.isSelected } : item
        ));
    };

    const toggleWishlist = (productId: number) => {
        setWishlist(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };

    const applyDiscount = (code: string) => {

        if (code === "DISCOUNT10") {
            setDiscountCode(code);
            setDiscountAmount(10.00);
        } else {
            setDiscountCode("");
            setDiscountAmount(0);
        }
    };

    const selectedItems = cartItems.filter(item => item.isSelected);

    const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = subtotal * taxRate;

    const total = subtotal > 0
        ? (subtotal + shippingCost + taxAmount + otherTax) - discountAmount
        : 0;

    return (
        <ShopContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            toggleItemSelection,
            shippingCost,
            taxRate,
            subtotal,
            taxAmount,
            total,
            discountCode,
            applyDiscount,
            discountAmount,
            wishlist,
            toggleWishlist
        }}>
            {children}
        </ShopContext.Provider>
    );
};
