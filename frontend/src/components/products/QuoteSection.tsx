import React from 'react';
import handImage from '../../assets/images/ui/hand-2.png';
import { Sparkles } from 'lucide-react';

const QuoteSection: React.FC = () => {
    return (
        <div className="bg-[#F9F8F6] py-16 md:py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative z-10">

                {/* Left Decoration */}
                <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
                    <div className="h-[1px] bg-[#C5A572] w-full max-w-[100px] border-t border-dashed border-[#C5A572]"></div>
                    <div className="w-3 h-3 bg-[#C5A572] rotate-45"></div>
                    <img src={handImage} alt="Decorative Hand" className="h-32 md:h-40 object-contain opacity-80" style={{ transform: 'scaleX(-1)' }} />
                </div>

                {/* Quote Text */}
                <div className="max-w-2xl text-center relative">
                    <span className="text-6xl text-[#C5A572]/20 font-serif absolute -top-8 -left-4">“</span>
                    <h3 className="text-2xl md:text-4xl font-serif text-[#8C734B] leading-relaxed italic">
                        "L'eleganza non è un lusso, ma l'arte di saper scegliere il giusto gioiello."
                    </h3>
                    <span className="text-6xl text-[#C5A572]/20 font-serif absolute -bottom-12 -right-4">”</span>
                </div>

                {/* Right Decoration */}
                <div className="hidden md:flex items-center gap-4 flex-1 justify-start">
                    <img src={handImage} alt="Decorative Hand" className="h-32 md:h-40 object-contain opacity-80" />
                    <div className="w-3 h-3 bg-[#C5A572] rotate-45"></div>
                    <div className="h-[1px] bg-[#C5A572] w-full max-w-[100px] border-t border-dashed border-[#C5A572]"></div>
                </div>

            </div>

            {/* Mobile Decoration (simplified) */}
            <div className="flex md:hidden items-center justify-center gap-4 mt-8 opacity-50">
                <div className="h-[1px] bg-[#C5A572] w-16"></div>
                <Sparkles className="text-[#C5A572] w-4 h-4" />
                <div className="h-[1px] bg-[#C5A572] w-16"></div>
            </div>
        </div>
    );
};

export default QuoteSection;
