import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

import client from '../../api/client';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        privacy: false,
        marketing: false,
        profiling: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.privacy) {
            setError("Devi accettare la Privacy Policy per registrarti.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await client.post('/users/register', {
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                privacy: formData.privacy,
                marketing_consent: formData.marketing,
                profiling_consent: formData.profiling
            });

            navigate('/login');
        } catch (err: any) {
            console.error("Registration Error:", err);
            const errorMessage = err.response?.data?.message || "Si è verificato un errore durante la registrazione.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-bg-base">

            <div className="w-full max-w-6xl mx-auto grid grid-cols-[1fr_auto_1fr] gap-8 md:gap-20 items-stretch">

                <div className="hidden md:flex flex-col items-center justify-center">
                    <div className="h-full w-[1px] bg-gold relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-gold"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-gold"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-gold"></div>
                    </div>
                </div>

                <div className="w-full max-w-md mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-serif text-text-primary font-bold mb-3">Registrati</h1>
                        <p className="text-text-secondary text-sm">Usa le tue credenziali per creare il tuo account.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded mb-6 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Nome e Cognome"
                                required
                                className="w-full px-4 py-3 rounded border border-gold text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-gold pr-10"
                            />
                            <div className="absolute top-3 right-3 text-gold-dark">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                                </svg>
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="E-mail"
                                required
                                className="w-full px-4 py-3 rounded border border-gold text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-gold pr-10"
                            />
                            <div className="absolute top-3 right-3 text-gold-dark">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                                </svg>
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                                minLength={6}
                                className="w-full px-4 py-3 rounded border border-gold text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-gold pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-0 right-0 h-full px-3 text-gray-400 hover:text-gold-dark transition-colors flex items-center justify-center"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            <div className="absolute top-3 right-10 text-gold-dark">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                                </svg>
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Numero di telefono"
                                className="w-full px-4 py-3 rounded border border-gold text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-gold pr-10"
                            />
                            <div className="absolute top-3 right-3 text-gold-dark">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        name="privacy"
                                        checked={formData.privacy}
                                        onChange={handleChange}
                                        className="appearance-none w-5 h-5 border border-text-secondary rounded-sm checked:bg-gold-dark checked:border-gold-dark transition-colors"
                                    />
                                    {formData.privacy && (
                                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    )}
                                </div>
                                <span className="text-xs text-text-secondary leading-tight group-hover:text-text-primary transition-colors">Privacy and Cookie policy</span>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        name="marketing"
                                        checked={formData.marketing}
                                        onChange={handleChange}
                                        className="appearance-none w-5 h-5 border border-text-secondary rounded-sm checked:bg-gold-dark checked:border-gold-dark transition-colors"
                                    />
                                    {formData.marketing && (
                                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    )}
                                </div>
                                <span className="text-xs text-text-secondary leading-tight group-hover:text-text-primary transition-colors">
                                    Acconsento al trattamento dei miei dati per finalità promozionali e pubblicitarie con ogni mezzo di comunicazione***
                                </span>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        name="profiling"
                                        checked={formData.profiling}
                                        onChange={handleChange}
                                        className="appearance-none w-5 h-5 border border-text-secondary rounded-sm checked:bg-gold-dark checked:border-gold-dark transition-colors"
                                    />
                                    {formData.profiling && (
                                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    )}
                                </div>
                                <span className="text-xs text-text-secondary leading-tight group-hover:text-text-primary transition-colors">
                                    Acconsento al trattamento dei miei dati personali per attività di profilazione, ovvero per la creazione di contenuti e offerte personalizzate
                                </span>
                            </label>
                        </div>

                        <div className="text-[10px] text-text-secondary leading-relaxed text-left pt-2 pb-4">
                            Registrandoti dichiari di avere più di 18 anni e di accettare le condizioni di vendita e di aver letto e compreso quanto previsto in materia di trattamento dei Dati personali e Privacy Policy
                        </div>

                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                variant="outline"
                                disabled={isLoading}
                                className="px-12 py-3 text-base font-normal rounded border-text-secondary text-text-primary hover:border-gold-dark hover:text-gold-dark shadow-sm bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Caricamento...' : 'Registrati'}
                            </Button>
                        </div>
                    </form>

                    <div className="text-center mt-6">
                        <Link to="/login" className="text-xs text-gold-dark underline hover:text-[#8C734B]">
                            Hai già un account? Accedi
                        </Link>
                    </div>

                </div>

                <div className="hidden md:flex flex-col items-center justify-center">
                    <div className="h-full w-[1px] bg-gold relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-gold"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-gold"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-gold"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;
