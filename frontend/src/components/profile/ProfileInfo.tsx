import React, { useState } from 'react';
import { Trash2, Edit2, LogOut } from 'lucide-react';
import ProfileEditModal from './ProfileEditModal';
import SuccessModal from './SuccessModal';

const ProfileInfo: React.FC = () => {
    // Mock data
    const [formData, setFormData] = useState({
        firstName: 'Davide',
        lastName: 'Murro',
        email: 'davidemurro_65@gmail.com',
        phone: '3460928601',
        city: 'Torino',
        zip: '70056',
        province: 'TO',
        address: 'Via Carlo Alberto',
        houseNumber: '46'
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSave = (newData: any) => {
        setFormData(newData);
        setIsEditModalOpen(false);
        setShowSuccess(true);
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
                        <input
                            type="text"
                            value={formData.firstName}
                            className="w-full px-4 py-3 rounded-md border border-[#E5E0D5] text-gray-600 focus:outline-none focus:border-[#A89160] bg-transparent"
                            readOnly
                        />
                    </div>
                    {/* Last Name */}
                    <div className="space-y-1">
                        <input
                            type="text"
                            value={formData.lastName}
                            className="w-full px-4 py-3 rounded-md border border-[#E5E0D5] text-gray-600 focus:outline-none focus:border-[#A89160] bg-transparent"
                            readOnly
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <input
                            type="email"
                            value={formData.email}
                            className="w-full px-4 py-3 rounded-md border border-[#E5E0D5] text-gray-600 focus:outline-none focus:border-[#A89160] bg-transparent"
                            readOnly
                        />
                    </div>
                    {/* Phone */}
                    <div className="space-y-1">
                        <input
                            type="tel"
                            value={formData.phone}
                            className="w-full px-4 py-3 rounded-md border border-[#E5E0D5] text-gray-600 focus:outline-none focus:border-[#A89160] bg-transparent"
                            readOnly
                        />
                    </div>

                    {/* City */}
                    <div className="space-y-1">
                        <input
                            type="text"
                            value={formData.city}
                            className="w-full px-4 py-3 rounded-md border border-[#E5E0D5] text-gray-600 focus:outline-none focus:border-[#A89160] bg-transparent"
                            readOnly
                        />
                    </div>

                    {/* Zip & Province Container on Mobile? Or just grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={formData.zip}
                            className="w-full px-4 py-3 rounded-md border border-[#E5E0D5] text-gray-600 focus:outline-none focus:border-[#A89160] bg-transparent"
                            readOnly
                        />
                        <input
                            type="text"
                            value={formData.province}
                            className="w-full px-4 py-3 rounded-md border border-[#E5E0D5] text-gray-600 focus:outline-none focus:border-[#A89160] bg-transparent"
                            readOnly
                        />
                    </div>

                    {/* Address */}
                    <div className="space-y-1">
                        <input
                            type="text"
                            value={formData.address}
                            className="w-full px-4 py-3 rounded-md border border-[#E5E0D5] text-gray-600 focus:outline-none focus:border-[#A89160] bg-transparent"
                            readOnly
                        />
                    </div>

                    {/* House Number */}
                    <div className="space-y-1">
                        <input
                            type="text"
                            value={formData.houseNumber}
                            className="w-full px-4 py-3 rounded-md border border-[#E5E0D5] text-gray-600 focus:outline-none focus:border-[#A89160] bg-transparent"
                            readOnly
                        />
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
                    <button className="flex items-center gap-2 text-red-500 text-sm hover:text-red-700 transition-colors">
                        <Trash2 size={16} /> Elimina account
                    </button>

                    <button className="flex items-center gap-2 text-gray-500 text-sm hover:text-[#A89160] transition-colors">
                        <LogOut size={16} /> Esci dall'account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
