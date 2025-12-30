import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, LogOut } from 'lucide-react';
import ProfileEditModal from './ProfileEditModal';
import SuccessModal from './SuccessModal';
import { useAuth } from '../../context/AuthContext';
import client from '../../api/client';
import { useNavigate } from 'react-router-dom';

const ProfileInfo: React.FC = () => {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        zip: '',
        province: '',
        address: '',
        houseNumber: ''
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            // Split name if possible
            const [firstName, ...lastNameParts] = user.name.split(' ');
            // eslint-disable-next-line 
            setFormData(prev => ({
                ...prev,
                firstName: firstName || '',
                lastName: lastNameParts.join(' ') || '',
                email: user.email,
                phone: user.phone || ''
            }));
        }
    }, [user]);

    interface ProfileFormData {
        firstName: string;
        lastName: string;
        phone: string;
    }

    const handleSave = async (newData: ProfileFormData) => {
        try {
            const fullName = `${newData.firstName} ${newData.lastName}`.trim();

            await client.put('/users/profile', {
                name: fullName,
                phone: newData.phone
            });

            // Update local user context if possible
            if (user && login) {
                const updatedUser = { ...user, name: fullName, phone: newData.phone };
                // We need the token to "re-login", or just update state. 
                // Since login() requires token, let's grab it from local storage or context if exposed (it's not directly exposed as arg here but we can fix that or just manually update storage)
                const token = localStorage.getItem('token');
                if (token) login(token, updatedUser);
            }

            setFormData(prev => ({ ...prev, ...newData }));
            setIsEditModalOpen(false);
            setShowSuccess(true);
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Errore durante l'aggiornamento del profilo");
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Sei sicuro di voler eliminare il tuo account? Questa azione è irreversibile.")) {
            try {
                await client.delete('/users/profile');
                logout();
                navigate('/');
            } catch (error) {
                console.error("Failed to delete account", error);
                alert("Impossibile eliminare l'account al momento");
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="w-full">
            {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}

            <ProfileEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                initialData={formData}
                onSave={handleSave}
            />

            {/* Personal Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E5E0D5] p-8 mb-12">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl text-gray-700 font-serif">Informazioni personali salvate</h3>
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="text-xs text-[#8A8A8A] hover:text-[#A89160] flex items-center gap-1 transition-colors"
                    >
                        Modifica <Edit2 size={12} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="space-y-1">
                        <label className="text-xs text-gray-400">Nome</label>
                        <input
                            type="text"
                            value={formData.firstName}
                            className="w-full px-4 py-3 rounded-md border border-[#E5E0D5] text-gray-600 focus:outline-none focus:border-[#A89160] bg-transparent"
                            readOnly
                        />
                    </div>
                    {/* Last Name */}
                    <div className="space-y-1">
                        <label className="text-xs text-gray-400">Cognome</label>
                        <input
                            type="text"
                            value={formData.lastName}
                            className="w-full px-4 py-3 rounded-md border border-[#E5E0D5] text-gray-600 focus:outline-none focus:border-[#A89160] bg-transparent"
                            readOnly
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-xs text-gray-400">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            className="w-full px-4 py-3 rounded-md border border-[#E5E0D5] text-gray-600 focus:outline-none focus:border-[#A89160] bg-transparent"
                            readOnly
                        />
                    </div>
                    {/* Phone */}
                    <div className="space-y-1">
                        <label className="text-xs text-gray-400">Telefono</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            className="w-full px-4 py-3 rounded-md border border-[#E5E0D5] text-gray-600 focus:outline-none focus:border-[#A89160] bg-transparent"
                            readOnly
                        />
                    </div>

                    <div className="col-span-2 text-xs text-gray-400 italic">
                        * L'indirizzo di residenza viene gestito nella scheda "Indirizzi"
                    </div>
                </div>
            </div>

            {/* Account Actions */}
            <div>
                <h3 className="text-xl text-gray-700 font-serif mb-4">Azioni account</h3>

                <div className="space-y-2 mb-8">
                    <p className="text-gray-500 font-medium mb-4">Elimina account</p>

                    <div className="flex items-center gap-3">
                        <input type="checkbox" id="reason1" className="rounded border-gray-300 text-[#A89160] focus:ring-[#A89160]" />
                        <label htmlFor="reason1" className="text-sm text-gray-500">Non sono soddisfatto del servizio</label>
                    </div>
                    <div className="flex items-center gap-3">
                        <input type="checkbox" id="reason2" defaultChecked className="rounded border-gray-300 text-[#A89160] focus:ring-[#A89160]" />
                        <label htmlFor="reason2" className="text-sm text-gray-500">Non sono più interessato ai prodotti</label>
                    </div>
                    <div className="flex items-center gap-3">
                        <input type="checkbox" id="reason3" className="rounded border-gray-300 text-[#A89160] focus:ring-[#A89160]" />
                        <label htmlFor="reason3" className="text-sm text-gray-500">Altro</label>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <button
                        onClick={handleDeleteAccount}
                        className="flex items-center gap-2 text-red-500 text-sm hover:text-red-700 transition-colors"
                    >
                        <Trash2 size={16} /> Elimina account
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-500 text-sm hover:text-[#A89160] transition-colors"
                    >
                        <LogOut size={16} /> Esci dall'account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
