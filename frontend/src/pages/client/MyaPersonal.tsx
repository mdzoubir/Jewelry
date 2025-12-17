import React from 'react';
import { ChevronDown } from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import heroImage from '../../assets/images/hero/mya-personal-hero.jpg';
import ConfigurationSection from '../../components/personal/ConfigurationSection';
import PersonalizationSection from '../../components/personal/PersonalizationSection';

const MyaPersonal: React.FC = () => {
    usePageTitle("Mya Oro | Mya Personal");

    return (
        <div className="bg-white min-h-screen font-sans text-dark-gray-800">
            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={heroImage}
                        alt="Mya Personal Hero"
                        className="w-full h-full object-cover object-center"
                    />
                    {/* Dark Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 max-w-[1920px] mx-auto text-white">
                    <div className="max-w-2xl mt-16 md:mt-0">
                        <h1 className="text-5xl md:text-7xl font-serif italic font-bold mb-6 leading-tight">
                            Mya Personal
                        </h1>
                        <h2 className="text-xl md:text-2xl font-light mb-8 leading-relaxed">
                            Scopri come creare il tuo gioiello <br className="hidden md:block" />
                            unico e personalizzato!
                        </h2>
                        <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-lg mb-12">
                            Con questa pagina, puoi creare un gioiello su misura che rispecchi il tuo stile.
                            Compila il modulo e inizia il tuo viaggio per la creazione di un pezzo elegante e originale,
                            pensato solo per te!
                        </p>
                    </div>

                    {/* Animated Chevron */}

                    <div
                        onClick={() => document.getElementById('configuration-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="absolute bottom-28 md:bottom-32 left-1/2 transform -translate-x-1/2 md:left-12 md:translate-x-0 animate-bounce cursor-pointer opacity-80 hover:opacity-100 transition-opacity z-20"
                    >
                        <div className="flex flex-col items-center -space-y-4">
                            <ChevronDown size={48} className="text-white font-thin" strokeWidth={1} />
                            <ChevronDown size={48} className="text-white font-thin" strokeWidth={1} />
                        </div>
                    </div>
                </div>
            </section>

            <ConfigurationSection />
            <PersonalizationSection />
        </div>
    );
};

export default MyaPersonal;
