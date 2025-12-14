import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import PaymentMethodModal from './PaymentMethodModal';


const initialPayments = [
    {
        id: 1,
        title: 'Metodo di pagamento 1',
        type: 'Mastercard',
        last4: '3456',
        expiry: '05/27',
        holder: 'DAVIDE MURRO',
        isDefault: true,

        color: 'bg-gradient-to-br from-gray-800 to-gray-900'
    },
    {
        id: 2,
        title: 'Metodo di pagamento 2',
        type: 'Mastercard',
        last4: '3456',
        expiry: '05/27',
        holder: 'DAVIDE MURRO',
        isDefault: false,
        color: 'bg-gradient-to-br from-gray-800 to-gray-900'
    }
];

const ProfilePayments: React.FC = () => {
    const [payments, setPayments] = useState(initialPayments);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleSetDefault = (id: number) => {
        setPayments(payments.map(p => ({
            ...p,
            isDefault: p.id === id
        })));
    };

    const handleRemove = (id: number) => {
        setPayments(payments.filter(p => p.id !== id));
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
            <PaymentMethodModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                initialData={editingId ? {
                    cardName: payments.find(p => p.id === editingId)?.holder,
                    cardNumber: `**** **** **** ${payments.find(p => p.id === editingId)?.last4}`,
                    expiry: payments.find(p => p.id === editingId)?.expiry,
                    cvv: '***',
                    isDefault: payments.find(p => p.id === editingId)?.isDefault
                } : undefined}
            />

            <h2 className="text-xl text-[#6D635B] font-serif mb-8">Metodi di pagamento salvati</h2>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                {payments.map((payment) => (
                    <div
                        key={payment.id}
                        className="bg-white rounded-xl border border-[#E5E0D5] p-6 shadow-sm relative"
                    >

                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="font-bold text-[#6D635B] text-lg">{payment.title}</h3>
                            <button
                                onClick={() => openEditModal(payment.id)}
                                className="flex items-center gap-1 text-xs text-[#8A8A8A] hover:text-[#A89160] transition-colors"
                            >
                                Modifica <Edit2 size={12} />
                            </button>
                        </div>

                        {/* Card Visual & Details Row */}
                        <div className="flex flex-col sm:flex-row gap-6 mb-6">
                            {/* Card Visual Mockup */}
                            <div className={`w-40 h-24 ${payment.color} rounded-lg shadow-md p-3 relative text-white flex flex-col justify-between shrink-0`}>
                                <div className="text-[8px] uppercase tracking-wider">Debit</div>
                                {/* Chip Icon Mock */}
                                <div className="w-6 h-5 bg-yellow-400/80 rounded-sm ml-1"></div>
                                <div className="text-[10px] tracking-widest mt-1">1234 5678 9012 {payment.last4}</div>
                                <div className="flex justify-between items-end">
                                    <div className="text-[6px] uppercase">{payment.holder}<br />{payment.expiry}</div>
                                    <div className="flex gap-1">
                                        <div className="w-3 h-3 bg-red-500 rounded-full opacity-80"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-80 -ml-1.5"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Text Details */}
                            <div className="flex flex-col justify-center gap-1 text-[#6D635B]">
                                <p className="font-bold text-lg">{payment.type}</p>
                                <p className="text-sm text-[#8A8A8A]">Carta di debito che termina con:</p>
                                <p className="font-bold text-lg tracking-wider">**** **** **** {payment.last4}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-transparent">
                            {/* Wait, design shows actions in specific spots. 
                                Remove is small icon on right bottom of the content area.
                                Default button is wide on left. 
                            */}

                            <button
                                onClick={() => handleSetDefault(payment.id)}
                                className={`px-6 py-2 text-xs font-bold rounded transition-colors border shadow-sm w-full sm:w-auto
                                    ${payment.isDefault
                                        ? 'bg-[#A89160] text-white border-[#A89160] hover:bg-[#8C734B]'
                                        : 'bg-white text-[#6D635B] border-[#E5E0D5] hover:border-[#A89160] hover:text-[#A89160]'
                                    }`}
                            >
                                {payment.isDefault ? 'Impostato come predefinito' : 'Imposta come predefinito'}
                            </button>

                            <button
                                onClick={() => handleRemove(payment.id)}
                                className="flex items-center gap-1 text-xs text-[#8A8A8A] hover:text-red-500 transition-colors absolute bottom-6 right-6"
                            >
                                <Trash2 size={12} /> Rimuovi
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add New Payment Button */}
            <button
                onClick={openAddModal}
                className="w-full bg-white border border-[#E5E0D5] rounded-xl p-6 flex items-center gap-4 text-[#6D635B] hover:border-[#A89160] hover:text-[#A89160] transition-all shadow-sm group"
            >
                <div className="w-6 h-6 rounded border border-[#C5A572] flex items-center justify-center group-hover:bg-[#A89160]/10 transition-colors">
                    {/* Empty square */}
                </div>
                <span className="font-bold text-base">Aggiungi nuovo metodo di pagamento</span>
            </button>

        </div>
    );
};

export default ProfilePayments;
