import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement login logic
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-[#FEFEFD]">

            <div className="w-full max-w-6xl mx-auto grid grid-cols-[1fr_auto_1fr] gap-8 md:gap-20 items-stretch">

                <div className="hidden md:flex flex-col items-center justify-center">
                    <div className="h-full w-[1px] bg-[#C5A572] relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#C5A572]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-[#C5A572]"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#C5A572]"></div>
                    </div>
                </div>

                <div className="w-full max-w-md mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-serif text-[#6D635B] font-bold mb-3">Accedi o registrati</h1>
                        <p className="text-[#8A8A8A] text-sm">Usa le tue credenziali per accedere o creare il tuo account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="E-mail o nome utente"
                                className="w-full px-4 py-3 rounded border border-[#C5A572] text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572] pr-10"
                            />
                            <div className="absolute top-3 right-3 text-[#A89160]">
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
                                className="w-full px-4 py-3 rounded border border-[#C5A572] text-gray-700 placeholder:text-[#C5C5C5] focus:outline-none focus:ring-1 focus:ring-[#C5A572] pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-0 right-0 h-full px-3 text-gray-400 hover:text-[#A89160] transition-colors flex items-center justify-center"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            <div className="absolute top-3 right-10 text-[#A89160]">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                                </svg>
                            </div>
                        </div>

                        <div className="text-center">
                            <Link to="/forgot-password" className="text-sm text-[#8A8A8A] underline decoration-1 underline-offset-2 hover:text-[#A89160] transition-colors">
                                Password dimenticata?
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <Link to="/register">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full py-3 text-base font-normal rounded border-[#8A8A8A] text-[#6D635B] hover:border-[#A89160] hover:text-[#A89160]"
                                >
                                    Registrati
                                </Button>
                            </Link>

                            <Button
                                type="submit"
                                className="py-3 text-base font-normal rounded bg-[#A18A58] text-white hover:bg-[#8C734B] shadow-md"
                            >
                                Accedi
                            </Button>
                        </div>

                        <div className="text-center pt-6 pb-2">
                            <span className="text-sm text-[#8A8A8A]">Oppure accedi con</span>
                        </div>

                        <div className="space-y-3">
                            <button type="button" className="w-full flex items-center justify-center gap-3 py-3 border border-[#C5C5C5] rounded text-sm text-[#8A8A8A] hover:border-[#A89160] hover:text-[#A89160] transition-all bg-white">
                                <span className="font-bold text-lg">G</span> Accedi con Google
                            </button>
                            <button type="button" className="w-full flex items-center justify-center gap-3 py-3 border border-[#C5C5C5] rounded text-sm text-[#8A8A8A] hover:border-[#A89160] hover:text-[#A89160] transition-all bg-white">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.56-2.09-.48-3.08.35-1.06.86-2.16.89-3.26-.52-3.2-4.14-2.8-8.5.87-9.87.89-.35 1.94-.07 2.75.56 1.05.74 2.14.7 3.12-.11.89-.71 2.22-.88 3.52-.28 1.48.65 2.5 1.99 3.09 2.24-2.6.22-3.83-1.63-4-2.73.18-1.57 2.22-3.14 4.07-2.61.1.25.18.52.18.8 0 2.24-1.87 5.75-3.66 7.9z" />
                                </svg>
                                Accedi con Apple
                            </button>
                        </div>

                    </form>
                </div>

                <div className="hidden md:flex flex-col items-center justify-center">
                    <div className="h-full w-[1px] bg-[#C5A572] relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#C5A572]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-[#C5A572]"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#C5A572]"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
