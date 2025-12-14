import React from 'react';

interface SectionTitleProps {
    title: React.ReactNode;
    subtitle?: string;
    center?: boolean;
    className?: string;
    color?: 'gold' | 'dark' | 'white';
}

const SectionTitle: React.FC<SectionTitleProps> = ({
    title,
    subtitle,
    center = false,
    className = '',
    color = 'gold'
}) => {
    const alignment = center ? 'text-center' : 'text-left';

    const colorClasses = {
        gold: 'text-[#A89160]',
        dark: 'text-[#5A5A5A]',
        white: 'text-white'
    };

    return (
        <div className={`mb-8 ${alignment} ${className}`}>
            <h2 className={`text-3xl md:text-4xl font-serif font-bold ${colorClasses[color]} leading-tight`}>
                {title}
            </h2>
            {subtitle && (
                <p className="mt-2 text-gray-500 text-sm md:text-base max-w-2xl mx-auto font-light tracking-wide">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionTitle;
