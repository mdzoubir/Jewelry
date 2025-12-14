import React from 'react';
import usePageTitle from '../hooks/usePageTitle';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const NotFound: React.FC = () => {
    usePageTitle("Mya Oro | Pagina Non Trovata");
    return (
        <div className="bg-white min-h-screen flex flex-col font-sans text-dark-gray-800">
            <div className="flex-grow flex items-center justify-center relative overflow-hidden bg-[#F9F8F6] py-32">
                {/* Decorative Elements */}
                <div className="absolute top-1/4 left-10 text-gold-200 opacity-50 transform -rotate-12 pointer-events-none">
                    <Sparkles size={64} />
                </div>
                <div className="absolute bottom-1/4 right-10 text-gold-200 opacity-50 transform rotate-12 pointer-events-none">
                    <Sparkles size={48} />
                </div>

                <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
                    <div className="mb-6">
                        <span className="text-9xl font-title font-bold text-gold-500 opacity-20 select-none block leading-none">
                            404
                        </span>
                        <h1 className="text-4xl md:text-5xl font-title font-bold text-dark-gray-800 -mt-12 mb-6">
                            Pagina non trovata
                        </h1>
                    </div>

                    <p className="text-gray-500 mb-10 text-lg leading-relaxed max-w-lg mx-auto">
                        Ops! Sembra che la pagina che stavi cercando non esista o sia stata spostata.
                        Torna alla home per continuare a scoprire i nostri gioielli.
                    </p>

                    <Link to="/" className="inline-block bg-[#A89160] hover:bg-[#8C734B] text-white px-8 py-3 rounded-sm font-semibold transition-colors shadow-md">
                        Torna alla Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
