import React from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../../assets/images/hero/hero_bg.jpg';

const Hero: React.FC = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden">

            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroBg})` }}
            >

                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            <div className="relative z-0 h-full flex flex-col justify-center px-6 md:px-20 max-w-[1920px] mx-auto text-center md:text-left items-center md:items-start">
                <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-md leading-tight">
                    Splendi <br />
                    con Mya Oro
                </h1>

                <Link to="/products" className="bg-[#A89160] hover:bg-[#8C734B] text-white px-8 py-3 w-fit text-sm font-semibold tracking-wider transition-colors shadow-lg">
                    Scopri di più
                </Link>
            </div>

        </div>
    );
};

export default Hero;
