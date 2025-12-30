import React, { useState, useEffect } from 'react';
import { Search, ChevronUp } from 'lucide-react';
import Button from '../ui/Button';
import client from '../../api/client';
import { API_BASE_URL } from '../../api/client';
import { formatCurrency } from '../../utils/currency';

// Order Type Definition
interface Order {
    id: number;
    total: number;
    status: string;
    created_at: string;
    items: { id: number; quantity: number; product_name: string; product_img: string; }[];
}

import ReturnRequestModal from './ReturnRequestModal';
import CreateReviewModal from './CreateReviewModal';

const ProfileOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await client.get('/orders');
                setOrders(res.data);
            } catch (err) {
                console.error("Failed to fetch orders", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <div>Caricamento ordini...</div>;

    if (orders.length === 0) {
        return (
            <div className="text-center py-20">
                <h3 className="text-xl text-[#6D635B] font-serif mb-4">Non hai ancora effettuato ordini.</h3>
                <Button onClick={() => window.location.href = '/products'}>Inizia lo shopping</Button>
            </div>
        );
    }

    const filteredOrders = orders.filter(order =>
        order.id.toString().includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            placeholder="Cerca ordine..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-4 pr-10 py-2 rounded-md border border-[#E5E0D5] bg-[#F9F9F9] text-sm focus:outline-none focus:border-[#A89160] placeholder:text-[#8A8A8A]"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A8A]" size={16} />
                    </div>
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
                {filteredOrders.map((order) => {
                    const firstItem = order.items && order.items.length > 0 ? order.items[0] : null;
                    const imageUrl = firstItem?.product_img
                        ? (firstItem.product_img.startsWith('http') ? firstItem.product_img : `${API_BASE_URL}/${firstItem.product_img}`)
                        : 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2574&auto=format&fit=crop';

                    return (
                        <div key={order.id} className="bg-white rounded-xl p-6 md:p-8 border border-[#E5E0D5] shadow-sm">
                            <div className="flex flex-col md:flex-row gap-8 items-start">

                                {/* Product Image (First item) */}
                                <div className="w-full md:w-48 h-48 bg-[#F9F9F9] rounded-lg p-4 flex-shrink-0 flex items-center justify-center">
                                    <img
                                        src={imageUrl}
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
                                                <p className="text-[#8A8A8A] font-medium">#{order.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-[#6D635B] font-bold text-sm mb-1">Data ordine:</p>
                                                <p className="text-[#8A8A8A] font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-[#6D635B] font-bold text-sm mb-1">Costo totale:</p>
                                                <p className="text-[#8A8A8A] font-medium">{formatCurrency(order.total)}</p>
                                            </div>
                                        </div>

                                        <div className="pt-6 space-y-3">
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
                                            <p className="text-[#6D635B] font-bold text-sm mb-2">Stato</p>
                                            <div className="flex items-center gap-2 text-[#6D635B] font-medium">
                                                <div className="w-2 h-2 bg-[#6D635B] rotate-45 transform"></div>
                                                <span className="capitalize">{order.status}</span>
                                            </div>
                                        </div>

                                        <div className="pt-6">
                                            <div className="text-xs text-gray-500">
                                                {order.items?.length || 0} Articoli
                                            </div>
                                            {order.items?.map((item) => (
                                                <div key={item.id} className="text-xs text-[#8A8A8A] mt-1">
                                                    {item.quantity}x {item.product_name}
                                                </div>
                                            ))}
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
                    );
                })}
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
