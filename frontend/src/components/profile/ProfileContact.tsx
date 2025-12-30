import React, { useState } from 'react';
import { Phone, MapPin } from 'lucide-react';
import Button from '../ui/Button';
import client from '../../api/client';

const ProfileContact: React.FC = () => {
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        email: '',
        telefono: '',
        messaggio: '',
        privacy: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await client.post('/contact', formData);
            alert("Messaggio inviato con successo!");
            setFormData({
                nome: '',
                cognome: '',
                email: '',
                telefono: '',
                messaggio: '',
                privacy: false
            });
        } catch (error) {
            console.error(error);
            alert("Errore durante l'invio del messaggio.");
        }
    };

    return (
        <div className="w-full pb-20">

            {/* Contact Form Card */}
            <div className="bg-white rounded-xl border border-[#E5E0D5] p-8 shadow-sm mb-6">
                <h2 className="text-xl text-[#6D635B] font-serif mb-6">Contattaci</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Nome"
                            className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                        />
                        <input
                            type="text"
                            name="cognome"
                            value={formData.cognome}
                            onChange={handleChange}
                            placeholder="Cognome"
                            className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="E-mail"
                            className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                        />
                        <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="Numero di telefono"
                            className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572]"
                        />
                    </div>

                    <textarea
                        rows={5}
                        name="messaggio"
                        value={formData.messaggio}
                        onChange={handleChange}
                        placeholder="Scrivi qui..."
                        className="w-full px-4 py-3 rounded border border-[#C5A572] bg-transparent text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572] resize-none"
                    ></textarea>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="privacy"
                                name="privacy"
                                checked={formData.privacy}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-gray-300 text-[#A89160] focus:ring-[#A89160]"
                            />
                            <label htmlFor="privacy" className="text-sm text-gray-500">Privacy and Cookie policy</label>
                        </div>

                        <Button
                            className="bg-[#A89160] text-white px-12 py-3 text-lg font-medium rounded hover:bg-[#8C734B]"
                        >
                            Invia
                        </Button>
                    </div>
                </form>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-[#E5E0D5] p-8 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-[#C5A572] flex items-center justify-center text-[#A89160] shrink-0">
                        <Phone size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#6D635B] text-lg">Chiamaci</h3>
                        <p className="text-[#8A8A8A] text-sm mt-1">+39 3469872796</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E5E0D5] p-8 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-[#C5A572] flex items-center justify-center text-[#A89160] shrink-0">
                        <MapPin size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#6D635B] text-lg">Vieni a trovarci</h3>
                        <p className="text-[#8A8A8A] text-sm mt-1">Via Napoli n.64, Napoli (NA), 70056</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProfileContact;
