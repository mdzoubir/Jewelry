import React from 'react';

interface PageHeroProps {
    bgImage: string;
    title: string;
    subtitle?: string;
    description?: string;
    description2?: string;
    overlayGradient?: string;
}

const PageHero: React.FC<PageHeroProps> = ({
    bgImage,
    title,
    subtitle,
    description,
    description2,
    overlayGradient = "from-white/60 via-white/20 to-transparent"
}) => {
    return (
        <div className="relative w-full rounded-2xl md:rounded-[2rem] overflow-hidden mb-8 shadow-xl">
            {/* Background Image */}
            <div className="relative h-[300px] md:h-[400px]">
                <img src={bgImage} alt={title} className="w-full h-full object-cover object-center" />

                {/* Text Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${overlayGradient} flex items-center`}>
                    <div className="pl-6 md:pl-20 max-w-lg">
                        <h1 className="text-4xl md:text-6xl font-serif text-[#5A5A5A] italic mb-2">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-sm md:text-base font-medium text-[#5A5A5A]/80 uppercase tracking-widest mb-4">
                                {subtitle}
                            </p>
                        )}
                        {(description || description2) && (
                            <div className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-xs md:max-w-sm">
                                {description && <p>{description}</p>}
                                {description2 && <p>{description2}</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageHero;
