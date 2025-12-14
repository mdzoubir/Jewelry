import React from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <button
                className="bg-white p-2 rounded-full cursor-pointer border border-gold-600 shadow-md animate-bounce hover:shadow-lg transition-shadow"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
            >
                <ChevronUp className="w-6 h-6 text-gold-600" />
            </button>
        </div>
    );
};

export default ScrollToTopButton;
