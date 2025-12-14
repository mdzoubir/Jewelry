import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';
import Button from '../ui/Button';
import PasswordResetModal from './PasswordResetModal';
import TwoFactorModal from './TwoFactorModal';
import SuccessModal from './SuccessModal';

const ProfileSecurity: React.FC = () => {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);

    // Success Modal States
    const [successState, setSuccessState] = useState<{ show: boolean, title?: string, message?: string }>({ show: false });

    // Mock consents
    const [consents, setConsents] = useState({
        promo: true,
        profiling: true
    });

    const handlePasswordReset = () => {
        setIsPasswordModalOpen(false);
        setSuccessState({
            show: true,
            title: "Email inviata",
            message: "Controlla la tua posta per il link di reset."
        });
    };

    const handle2FAConfirm = () => {
        setIs2FAModalOpen(false);
        // Maybe show success or just close? Screenshot only showed password success.
        // Let's show a generic success for feedback
        setSuccessState({
            show: true,
            title: "Impostazioni aggiornate",
            message: "Autenticazione a due fattori configurata."
        });
    };

    return (
        <div className="w-full">
            {/* Modals */}
            {successState.show && (
                <SuccessModal
                    title={successState.title}
                    message={successState.message}
                    onClose={() => setSuccessState({ ...successState, show: false })}
                />
            )}

            <PasswordResetModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onSend={handlePasswordReset}
                initialEmail="davidemurro_65@gmail.com"
            />

            <TwoFactorModal
                isOpen={is2FAModalOpen}
                onClose={() => setIs2FAModalOpen(false)}
                onConfirm={handle2FAConfirm}
            />

            <div className="flex flex-col xl:flex-row gap-12">

                {/* Left Column: Access & Security */}
                <div className="flex-1 space-y-8">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl text-gray-700 font-serif">Accesso e sicurezza</h3>
                        <button
                            className="text-xs text-[#8A8A8A] hover:text-[#A89160] flex items-center gap-1 transition-colors"
                        // No action specified for this top edit button, maybe it focuses email?
                        >
                            Modifica <Edit2 size={12} />
                        </button>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1">
                        <input
                            type="text"
                            value="d************@gmail.com"
                            readOnly
                            className="w-full px-4 py-3 rounded border border-[#E5E0D5] text-gray-500 bg-transparent focus:outline-none"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1">
                        <input
                            type="password"
                            value="********" // Fake value
                            readOnly
                            className="w-full px-4 py-3 rounded border border-[#E5E0D5] text-gray-500 bg-transparent focus:outline-none tracking-widest"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            className="bg-[#A89160] text-white px-6 py-2 text-sm rounded hover:bg-[#8C734B]"
                            onClick={() => setIsPasswordModalOpen(true)}
                        >
                            Modifica la password
                        </Button>
                    </div>

                    {/* 2FA Section */}
                    <div className="pt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Toggle Switch Visual */}
                            <div className="w-12 h-6 bg-[#E5E5E5] rounded-full relative cursor-pointer" onClick={() => setIs2FAModalOpen(true)}>
                                <div className="absolute left-1 top-1 w-4 h-4 bg-[#A89160] rounded-full shadow-sm"></div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="text-gray-600 font-medium">Autenticazione a due fattori</h4>
                                    <button onClick={() => setIs2FAModalOpen(true)} className="text-[#8A8A8A] hover:text-[#A89160]">
                                        <Edit2 size={14} />
                                    </button>
                                </div>
                                <p className="text-xs text-[#8A8A8A] mt-1">Attiva come SMS sul numero: *******601</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vertical Divider (Desktop) */}
                <div className="hidden xl:block w-[1px] bg-[#E5E0D5] self-stretch relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#A89160] rotate-45 transform"></div>
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#E5E0D5] to-transparent"></div>
                </div>


                {/* Right Column: Consents */}
                <div className="flex-1 space-y-8">
                    <h3 className="text-xl text-gray-700 font-serif">I miei consensi</h3>
                    <p className="text-sm text-[#8A8A8A]">
                        Modifica le iscrizioni per restare informato sulle novità <br />
                        e le offerte esclusive del mondo MYA ORO
                    </p>

                    <div className="space-y-6">
                        {/* Promo Content */}
                        <div className="flex items-start gap-4">
                            <div
                                className={`w-12 h-6 rounded-full relative cursor-pointer flex-shrink-0 transition-colors ${consents.promo ? 'bg-[#E5E5E5]' : 'bg-gray-200'}`}
                                onClick={() => setConsents(prev => ({ ...prev, promo: !prev.promo }))}
                            >
                                <div className={`absolute top-1 w-4 h-4 rounded-full shadow-sm transition-all duration-200 ${consents.promo ? 'left-7 bg-[#A89160]' : 'left-1 bg-gray-400'}`}></div>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Acconsento al trattamento dei miei dati per finalità promozionali e pubblicitarie con ogni mezzo di comunicazione
                            </p>
                        </div>

                        {/* Profiling Content */}
                        <div className="flex items-start gap-4">
                            <div
                                className={`w-12 h-6 rounded-full relative cursor-pointer flex-shrink-0 transition-colors ${consents.profiling ? 'bg-[#E5E5E5]' : 'bg-gray-200'}`}
                                onClick={() => setConsents(prev => ({ ...prev, profiling: !prev.profiling }))}
                            >
                                <div className={`absolute top-1 w-4 h-4 rounded-full shadow-sm transition-all duration-200 ${consents.profiling ? 'left-7 bg-[#A89160]' : 'left-1 bg-gray-400'}`}></div>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Acconsento al trattamento dei miei dati per attività di profilazione, ovvero per la creazione di contenuti e offerte personalizzate
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfileSecurity;
