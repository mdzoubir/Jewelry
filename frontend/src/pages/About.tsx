import React from 'react';
import usePageTitle from '../hooks/usePageTitle';
import aboutHero from '../assets/images/hero/about-hero.jpg';
import { Sparkles } from 'lucide-react';
import MissionSection from '../components/about/MissionSection';
import SolutionsSection from '../components/about/SolutionsSection';
import NewProductsSection from '../components/about/NewProductsSection';

const About: React.FC = () => {
    usePageTitle("Mya Oro | Chi Siamo");
    return (
        <div className="bg-white-200 min-h-screen font-sans text-dark-gray-800">
            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={aboutHero}
                        alt="About Hero"
                        className="w-full h-full object-cover object-top"
                    />
                    {/* Overlay for text readability if needed */}
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 max-w-[1920px] mx-auto">
                    <h1 className="text-5xl md:text-7xl font-title font-bold text-white leading-tight drop-shadow-sm">
                        Siamo <span className="italic font-normal">luce</span>
                        <Sparkles className="inline-block w-8 h-8 md:w-12 md:h-12 text-gold-500 mb-8 ml-2" fill="currentColor" />
                        <br />
                        che illumina
                        <br />
                        la tua personalità.
                    </h1>
                </div>
            </section>

            {/* Modular Component Sections */}
            <MissionSection />
            <SolutionsSection />
            <NewProductsSection />
        </div>
    );
};

export default About;

