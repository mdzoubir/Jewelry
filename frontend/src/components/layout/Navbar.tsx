import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/ui/logo.png';
import mobileLogo from '../../assets/images/ui/mobile-logo.png';

import { useShop } from '../../context/ShopContext';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { cartItems, wishlist } = useShop();

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const isActive = (path: string) => location.pathname === path ? "text-gold-600 font-bold" : "text-gray-500 font-medium hover:text-gold-600 transition-colors";

    return (
        <>
            <div className="fixed top-4 md:top-6 w-full z-50 pointer-events-none px-4">
                <nav className="pointer-events-auto w-full max-w-[1920px] mx-auto bg-[#F9F8F6] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] h-16 md:h-20 px-6 md:px-12 flex items-center justify-between transition-all duration-300">

                    {/* Left: Logo */}
                    <div className="flex items-center gap-3">
                        <Link to="/" className="block">
                            <img src={mobileLogo} alt="Mya Oro" className="h-8 md:hidden object-contain" />
                            <img src={logo} alt="Mya Oro" className="h-10 hidden md:block object-contain" />
                        </Link>
                    </div>

                    {/* Center: Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8 font-sans text-sm tracking-wide">
                        <Link to="/about" className={isActive('/about')}>Chi siamo</Link>
                        <Link to="/mya-personal" className={isActive('/mya-personal')}>Mya Personal</Link>
                        <Link to="/products" className={isActive('/products')}>Gioielli per eventi</Link>
                    </div>

                    {/* Right: Icons */}
                    <div className="hidden md:flex items-center space-x-6 text-gray-400">
                        <Search className="w-5 h-5 cursor-pointer hover:text-gold-600 transition-colors" />
                        <Link to="/profile">
                            <User className="w-5 h-5 cursor-pointer hover:text-gold-600 transition-colors" />
                        </Link>
                        <Link to="/wishlist" className="relative group">
                            <Heart className="w-5 h-5 cursor-pointer text-[#6D635B] hover:text-[#A89160] transition-colors" />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#A89160] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>
                        <Link to="/cart" className="relative group">
                            <ShoppingBag className={`w-5 h-5 transition-colors ${location.pathname === '/cart' ? 'text-[#A89160]' : 'text-gray-600 group-hover:text-[#A89160]'}`} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#A89160] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden text-gray-400 cursor-pointer z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-gray-600" />
                        ) : (
                            <div className="space-y-1.5">
                                <span className="block w-6 h-0.5 bg-gray-400"></span>
                                <span className="block w-6 h-0.5 bg-gray-400"></span>
                                <span className="block w-6 h-0.5 bg-gray-400"></span>
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 transform transition-transform duration-500 ease-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Backdrop / Menu Background */}
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm h-full w-full"></div>

                {/* Menu Content */}
                <div className="relative flex flex-col h-full pt-32 px-8 space-y-6 text-center text-gray-800 font-serif text-2xl z-50">
                    <Link to="/about" onClick={() => setIsMenuOpen(false)} className={`py-4 block hover:text-gold-600 transition-colors ${location.pathname === '/about' ? "text-gold-600" : ""}`}>
                        Chi siamo
                    </Link>
                    <Link to="/mya-personal" onClick={() => setIsMenuOpen(false)} className={`py-4 block hover:text-gold-600 transition-colors ${location.pathname === '/mya-personal' ? "text-gold-600" : ""}`}>
                        Mya Personal
                    </Link>
                    <Link to="/products" onClick={() => setIsMenuOpen(false)} className={`py-4 block hover:text-gold-600 transition-colors ${location.pathname === '/products' ? "text-gold-600" : ""}`}>
                        Gioielli per eventi
                    </Link>

                    <div className="w-24 h-[1px] bg-gray-200 mx-auto my-6"></div>

                    <div className="flex justify-center space-x-10 text-gray-400">
                        <Link to="/profile">
                            <User className="w-8 h-8 hover:text-gold-600 transition-colors cursor-pointer" />
                        </Link>
                        <Heart className="w-8 h-8 hover:text-gold-600 transition-colors cursor-pointer" />
                        <ShoppingBag className="w-8 h-8 hover:text-gold-600 transition-colors cursor-pointer" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
