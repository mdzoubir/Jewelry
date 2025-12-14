import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from '../ui/ScrollToTopButton';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="bg-white min-h-screen font-sans text-dark-gray-800 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <ScrollToTopButton />
            <Footer />
        </div>
    );
};

export default MainLayout;
