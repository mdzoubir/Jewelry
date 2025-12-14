import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Music, Phone, Mail, MapPin } from 'lucide-react';

import logo from '../../assets/images/ui/logo.png';

const Footer: React.FC = () => {
    return (
        <footer className="w-full">


            {/* Links Section - White Background */}
            <div className="bg-white pt-16 pb-16">
                <div className="max-w-[1920px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-gray-600 text-sm">
                    {/* Column 1: Logo & Contacts */}
                    <div className="space-y-8">
                        <div>
                            <img src={logo} alt="Mya Oro" className="w-48 h-auto" />
                        </div>

                        <div>
                            <h4 className="font-serif text-xl text-gray-500 mb-6 font-medium">Info e contatti</h4>
                            <div className="space-y-4 text-gray-500">
                                <p className="text-xs">P.IVA 235672309589</p>
                                <div className="flex items-center gap-3">
                                    <Phone size={16} className="text-[#A89160]" />
                                    <span>+39 3469872796</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail size={16} className="text-[#A89160]" />
                                    <span>e-mail@gmail.com</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin size={16} className="text-[#A89160] flex-shrink-0 mt-0.5" />
                                    <span>Via Napoli n.64, Napoli (NA), 70056</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Menu */}
                    <div className="md:px-12">
                        <h4 className="font-serif text-xl text-gray-500 mb-6 font-medium">Menù</h4>
                        <ul className="space-y-3 text-gray-500">
                            <li><Link to="/about" className="hover:text-[#A89160] transition-colors">Chi siamo</Link></li>
                            <li><Link to="/mya-personal" className="hover:text-[#A89160] transition-colors">Mya Personal</Link></li>
                            <li><Link to="/products" className="hover:text-[#A89160] transition-colors">Gioielli per eventi</Link></li>
                            <li><a href="#" className="hover:text-[#A89160] transition-colors">Area personale</a></li>
                            <li><a href="#" className="hover:text-[#A89160] transition-colors">I miei ordini</a></li>
                            <li><a href="#" className="hover:text-[#A89160] transition-colors">Wishlist</a></li>
                            <li><Link to="/cart" className="hover:text-[#A89160] transition-colors">Carrello</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Social & Newsletter */}
                    <div className="space-y-10">
                        <div>
                            <h4 className="font-serif text-xl text-gray-500 mb-6 font-medium">Seguici sui social</h4>
                            <div className="flex space-x-6 text-gray-400">
                                <Facebook className="hover:text-[#A89160] cursor-pointer" size={20} />
                                <Instagram className="hover:text-[#A89160] cursor-pointer" size={20} />
                                <Music className="hover:text-[#A89160] cursor-pointer" size={20} />
                            </div>
                        </div>

                        <div>
                            <h4 className="font-serif text-xl text-gray-500 mb-6 font-medium">Iscriviti alla newsletter</h4>
                            <form className="flex flex-col space-y-4">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Someone'smail@gmail.com"
                                        className="w-full border border-gray-300 rounded-sm px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-[#A89160] placeholder-gray-300"
                                    />
                                    <span className="absolute right-3 top-3 text-gray-400">*</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="privacy" className="accent-[#A89160] w-4 h-4 rounded-sm border-gray-300" />
                                    <label htmlFor="privacy" className="text-xs text-gray-400">Privacy and Cookie policy</label>
                                </div>
                                <div className="flex justify-end">
                                    <button className="bg-[#A89160] hover:bg-[#8C734B] text-white py-2 px-8 text-sm font-semibold transition-colors rounded-sm shadow-sm opacity-90">
                                        Iscriviti
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
