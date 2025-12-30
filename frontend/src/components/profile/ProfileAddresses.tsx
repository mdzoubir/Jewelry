import React, { useState, useEffect } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import AddressModal from './AddressModal';
import client from '../../api/client';

export interface Address {
    id: number;
    title: string;
    name: string;
    phone: string;
    street: string;
    city: string;
    zip: string;
    province: string;
    country: string;
    isDefault: boolean;
    instructions: boolean;
}

const ProfileAddresses: React.FC = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchAddresses = async () => {
        try {
            const res = await client.get('/addresses');
            // Map backend snake_case to frontend camelCase if needed, or update backend to send camel.
            // Backend sends: is_default. Frontend interface: is_default
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setAddresses(res.data.map((a: any) => ({
                ...a,
                isDefault: Boolean(a.is_default), // Map for frontend convenience if we want, but let's stick to consistent props
                title: a.title, // Backend sends title
                street: a.street,
                instructions: false // Not in DB yet? Assuming false.
            })));
        } catch (err) {
            console.error("Failed to fetch addresses", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleSetDefault = async (id: number) => {
        try {
            await client.put(`/addresses/${id}`, { is_default: true });
            fetchAddresses(); // Refresh to ensure server side exclusivity is reflected
        } catch (err) {
            console.error("Failed to set default", err);
        }
    };

    const handleRemove = async (id: number) => {
        if (!window.confirm("Sei sicuro di voler rimuovere questo indirizzo?")) return;
        try {
            await client.delete(`/addresses/${id}`);
            setAddresses(addresses.filter(addr => addr.id !== id));
        } catch (err) {
            console.error("Failed to delete address", err);
        }
    };

    const handleSaveAddress = async (data: any) => {
        try {
            if (modalMode === 'add') {
                await client.post('/addresses', data);
            } else if (editingId) {
                await client.put(`/addresses/${editingId}`, data);
            }
            setIsModalOpen(false);
            fetchAddresses();
        } catch (err) {
            console.error("Failed to save address", err);
            alert("Errore durante il salvataggio");
        }
    };

    const openEditModal = (id: number) => {
        setEditingId(id);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setEditingId(null);
        setModalMode('add');
        setIsModalOpen(true);
    };

    if (loading) return <div>Caricamento indirizzi...</div>;

    return (
        <div className="w-full pb-20">
            <AddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                initialData={editingId ? addresses.find(a => a.id === editingId) : undefined}
                // @ts-ignore - AddressModal prop types might need adjustment, passing custom handler wrapper
                onSave={handleSaveAddress}
            />

            <h2 className="text-xl text-[#6D635B] font-serif mb-8">Indirizzi di spedizione</h2>

            {addresses.length === 0 && (
                <div className="text-gray-500 mb-8 italic">Nessun indirizzo salvato.</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {addresses.map((addr: Address) => (
                    <div
                        key={addr.id}
                        className="bg-white rounded-xl border border-[#E5E0D5] p-6 flex flex-col justify-between h-full min-h-[320px] shadow-sm relative"
                    >

                        {/* Header */}
                        <div className="flex justify-between items-center mb-6 border-b border-[#E5E0D5] pb-4">
                            <h3 className="font-bold text-[#6D635B] text-lg">{addr.title}</h3>
                            <button
                                className="flex items-center gap-1 text-xs text-[#8A8A8A] hover:text-[#A89160] transition-colors"
                                onClick={() => openEditModal(addr.id)}
                            >
                                Modifica <Edit2 size={12} />
                            </button>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 mb-6 flex-grow">
                            <p className="text-sm">
                                <span className="font-bold text-[#6D635B]">Nome e Cognome: </span>
                                <span className="text-[#8A8A8A]">{addr.name}</span>
                            </p>
                            <p className="text-sm">
                                <span className="font-bold text-[#6D635B]">Numero di telefono: </span>
                                <span className="text-[#8A8A8A]">{addr.phone}</span>
                            </p>
                            <p className="text-sm">
                                <span className="font-bold text-[#6D635B]">Via: </span>
                                <span className="text-[#8A8A8A]">{addr.street}</span>
                            </p>
                            <p className="text-sm">
                                <span className="font-bold text-[#6D635B]">Città: </span>
                                <span className="text-[#8A8A8A]">{addr.city} ({addr.province}), {addr.zip}</span>
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4">
                            {/* Default Button */}
                            <button
                                onClick={() => handleSetDefault(addr.id)}
                                className={`w-full py-3 text-xs font-bold rounded transition-colors border shadow-sm
                                    ${addr.isDefault
                                        ? 'bg-[#A89160] text-white border-[#A89160] hover:bg-[#8C734B]'
                                        : 'bg-white text-[#6D635B] border-[#E5E0D5] hover:border-[#A89160] hover:text-[#A89160]'
                                    }`}
                            >
                                {addr.isDefault ? 'Impostato come predefinito' : 'Imposta come predefinito'}
                            </button>

                            {/* Remove */}
                            <button
                                onClick={() => handleRemove(addr.id)}
                                className="flex items-center gap-2 text-xs text-[#8A8A8A] hover:text-red-500 transition-colors mt-2 pl-1"
                            >
                                <Trash2 size={12} /> Rimuovi
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            {/* Add New Address Button */}
            <button
                onClick={openAddModal}
                className="w-full bg-white border border-[#E5E0D5] rounded-xl p-6 flex items-center gap-4 text-[#6D635B] hover:border-[#A89160] hover:text-[#A89160] transition-all shadow-sm group"
            >
                <div className="w-6 h-6 rounded border border-[#C5A572] flex items-center justify-center group-hover:bg-[#A89160]/10 transition-colors">
                    <span className="text-lg font-bold">+</span>
                </div>
                <span className="font-bold text-base">Aggiungi nuovo indirizzo</span>
            </button>

        </div>
    );
};

export default ProfileAddresses;
