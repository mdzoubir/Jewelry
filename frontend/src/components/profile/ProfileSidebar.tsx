import React from 'react';
import { User, Lock, ShoppingBag, MapPin, CreditCard, Tag, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
    { name: 'Informazioni Personali', icon: User, path: '/profile' },
    { name: 'Accesso e sicurezza', icon: Lock, path: '/profile/security' },
    { name: 'I miei ordini', icon: ShoppingBag, path: '/profile/orders' },
    { name: 'I miei indirizzi', icon: MapPin, path: '/profile/addresses' },
    { name: 'I miei pagamenti', icon: CreditCard, path: '/profile/payments' },
    { name: 'Codici sconto', icon: Tag, path: '/profile/discounts' },
    { name: 'Contattaci', icon: MessageSquare, path: '/profile/contact' },
];

const ProfileSidebar: React.FC = () => {
    const location = useLocation();

    return (
        <div className="w-full md:w-72 flex-shrink-0">
            <h2 className="flex items-center gap-3 text-2xl font-serif text-[#A89160] mb-8">
                <User size={28} />
                Area Personale
            </h2>

            <nav className="space-y-4">
                {menuItems.map((item) => {
                    // Start simple: exact match for profile, or startsWith for others if we had sub-routes
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-sm transition-all duration-200 ${isActive
                                ? 'bg-[#A89160] text-white font-medium'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-transparent hover:border-[#E5E0D5]'
                                }`}
                        >
                            <item.icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                            <span className="text-sm tracking-wide">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default ProfileSidebar;
