import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../ui/Button';

// Mock Order Data
const orders = [
    {
        id: '#4365377549',
        date: '06/07/2025',
        total: 600,
        status: 'Consegnato',
        deliveryDate: '07/07/25',
        image: 'https://images.pexels.com/photos/33222148/pexels-photo-33222148.jpeg?auto=compress&cs=tinysrgb&w=800', // Using existing placeholder logic/url
        isDelivered: true
    },
    {
        id: '#4365377549',
        date: '06/07/2025',
        total: 600,
        status: 'Consegnato',
        deliveryDate: '07/07/25',
        image: 'https://images.pexels.com/photos/33154633/pexels-photo-33154633.jpeg?auto=compress&cs=tinysrgb&w=800',
        isDelivered: true
    },
    {
        id: '#4365377549',
        date: '06/07/2025',
        total: 600,
        status: 'Consegnato',
        deliveryDate: '07/07/25',
        image: 'https://images.pexels.com/photos/6563393/pexels-photo-6563393.jpeg?auto=compress&cs=tinysrgb&w=800',
        isDelivered: true
    }
];

import ReturnRequestModal from './ReturnRequestModal';
import CreateReviewModal from './CreateReviewModal';

const ProfileOrders: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full relative pb-20">
            <ReturnRequestModal
                isOpen={isReturnModalOpen}
                onClose={() => setIsReturnModalOpen(false)}
            />

            <CreateReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
            />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
                <h2 className="text-3xl font-serif text-[#6D635B]">Cronologia degli ordini</h2>

                <div className="flex gap-4 w-full md:w-auto">
                    {/* Search Bar */}
                    <div className="relative flex-grow md:flex-grow-0 md:w-72">
                        <input
                            type="text"
                            placeholder="Quale ordine o articolo stai cercando?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-4 pr-10 py-2 rounded-md border border-[#E5E0D5] bg-[#F9F9F9] text-sm focus:outline-none focus:border-[#A89160] placeholder:text-[#8A8A8A]"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A8A]" size={16} />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#F9F9F9] border border-[#E5E0D5] rounded-md text-sm text-[#6D635B] hover:border-[#A89160] transition-colors">
                            Ordina per <ChevronDown size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
                {orders.map((order, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 md:p-8 border border-[#E5E0D5] shadow-sm">
                        <div className="flex flex-col md:flex-row gap-8 items-start">

                            {/* Product Image */}
                            <div className="w-full md:w-48 h-48 bg-[#F9F9F9] rounded-lg p-4 flex-shrink-0 flex items-center justify-center">
                                <img
                                    src={order.image}
                                    alt="Product"
                                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                                />
                            </div>

                            {/* Grid Layout for Details */}
                            <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-6 w-full">

                                {/* Info Column (Order #, Date, Total) */}
                                <div className="md:col-span-4 flex flex-col justify-between h-full">
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-[#6D635B] font-bold uppercase text-xs tracking-wider mb-1">N.Ordine:</p>
                                            <p className="text-[#8A8A8A] font-medium">{order.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-[#6D635B] font-bold text-sm mb-1">Data ordine:</p>
                                            <p className="text-[#8A8A8A] font-medium">{order.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-[#6D635B] font-bold text-sm mb-1">Costo totale:</p>
                                            <p className="text-[#8A8A8A] font-medium">€{order.total}</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 space-y-3">
                                        <button
                                            className="text-xs text-[#8A8A8A] underline hover:text-[#A89160] transition-colors"
                                            onClick={() => setIsReturnModalOpen(true)}
                                        >
                                            Fai un reso
                                        </button>

                                        <Button
                                            className="w-full md:w-auto bg-[#A89160] hover:bg-[#8C734B] text-white text-xs px-6 py-3 rounded font-medium"
                                            onClick={() => setIsReviewModalOpen(true)}
                                        >
                                            Scrivi una recensione
                                        </Button>
                                    </div>
                                </div>

                                {/* Status Column */}
                                <div className="md:col-span-5 flex flex-col justify-between h-full pl-0 md:pl-8">
                                    <div className="space-y-2">
                                        <p className="text-[#6D635B] font-bold text-sm mb-2">Stato di spedizione</p>

                                        <div className="flex items-center gap-2 text-[#6D635B] font-medium">
                                            <div className="w-2 h-2 bg-[#6D635B] rotate-45 transform"></div>
                                            <span>{order.status}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-[#8A8A8A] text-xs mt-1 pl-4">
                                            📅 {order.deliveryDate}
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <button className="px-6 py-2 border border-[#E5E0D5] text-[#8A8A8A] text-xs rounded hover:border-[#A89160] hover:text-[#A89160] transition-colors w-full md:w-auto">
                                            Visualizza tutti gli articoli
                                        </button>
                                    </div>
                                </div>

                                {/* Receipt Column (Right Aligned) */}
                                <div className="md:col-span-3 flex justify-start md:justify-end items-center md:items-start pt-4 md:pt-0">
                                    <button className="px-6 py-3 bg-[#A89160] text-white text-xs rounded hover:bg-[#8C734B] transition-colors shadow-sm font-medium w-full md:w-auto whitespace-nowrap">
                                        Stampa la ricevuta
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={handleScrollTop}
                className="fixed bottom-8 right-8 w-12 h-12 bg-[#FDFBF7] border border-[#E5E0D5] rounded-full flex items-center justify-center text-[#6D635B] shadow-md hover:bg-white hover:shadow-lg transition-all z-40"
            >
                <ChevronUp size={24} strokeWidth={1.5} />
            </button>
        </div>
    );
};

export default ProfileOrders;
