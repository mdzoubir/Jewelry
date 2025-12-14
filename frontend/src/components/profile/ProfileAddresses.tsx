import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
// import Button from '../ui/Button';

// Mock Data
const initialAddresses = [
    {
        id: 1,
        title: 'Indirizzo 1',
        name: 'Davide Murro',
        phone: '3460928601',
        street: 'Via Carlo Alberto, n.46',
        city: 'Torino (TO), 70056, Italia',
        isDefault: true,
        instructions: false
    },
    {
        id: 2,
        title: 'Indirizzo 2',
        name: 'Davide Murro',
        phone: '3460928601',
        street: 'Via Carlo Alberto, n.46',
        city: 'Torino (TO), 70056, Italia',
        isDefault: false,
        instructions: false
    },
    {
        id: 3,
        title: 'Indirizzo 3',
        name: 'Davide Murro',
        phone: '3460928601',
        street: 'Via Carlo Alberto, n.46',
        city: 'Torino (TO), 70056, Italia',
        isDefault: false,
        instructions: false
    }
];

import AddressModal from './AddressModal';

// ... (Mock Data remains the same)

const ProfileAddresses: React.FC = () => {
    const [addresses, setAddresses] = useState(initialAddresses);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleSetDefault = (id: number) => {
        setAddresses(addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    const handleRemove = (id: number) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
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

    return (
        <div className="w-full pb-20">
            <AddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                initialData={editingId ? addresses.find(a => a.id === editingId) : undefined}
            />

            <h2 className="text-xl text-[#6D635B] font-serif mb-8">Indirizzi di spedizione</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {addresses.map((addr) => (
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
                                <span className="text-[#8A8A8A]">{addr.city}</span>
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4">
                            {/* Instructions Checkbox */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <div className={`w-4 h-4 border border-[#C5A572] rounded-sm flex items-center justify-center ${addr.instructions ? 'bg-[#A89160]' : ''}`}>
                                    {addr.instructions && <div className="w-2 h-2 bg-white rounded-sm" />}
                                </div>
                                <span className="text-xs text-[#8A8A8A]">Aggiungi istruzioni di consegna</span>
                            </label>

                            {/* Default Button - Using standard button for full control */}
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

                </div>
                <span className="font-bold text-base">Aggiungi nuovo indirizzo</span>
            </button>

        </div>
    );
};

export default ProfileAddresses;
