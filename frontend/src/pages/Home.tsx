import React from 'react';
import usePageTitle from '../hooks/usePageTitle';
import Hero from '../components/home/Hero';
import BestSellers from '../components/home/BestSellers';
import Solutions from '../components/home/Solutions';
import Features from '../components/home/Features';
import Reviews from '../components/home/Reviews';

const Home: React.FC = () => {
    usePageTitle("Mya Oro | Gioielleria Esclusiva");
    return (
        <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-[#C5A572] selection:text-white">
            <Hero />
            <BestSellers />
            <Solutions />
            <Features />
            <Reviews />
        </div>
    );
};

export default Home;
