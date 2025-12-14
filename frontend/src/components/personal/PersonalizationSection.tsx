import React, { useState } from 'react';
import p3 from '../../assets/images/products/product_3.jpg'; // Using product_3 as placeholder for bracelet

const PersonalizationSection: React.FC = () => {
    const [engravingText, setEngravingText] = useState("");
    const [selectedPreview, setSelectedPreview] = useState<'before' | 'after' | null>(null);

    return (
        <section className="pt-4 pb-20 px-4 md:px-8 bg-white relative z-10">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Two Columns: Personalize & Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Card 1: Personalize */}
                    <div className="bg-[#FDFCFB] rounded-3xl shadow-lg p-8 border border-gray-100 flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-2xl font-serif text-[#5A5A5A] font-bold mb-6">Personalizza il tuo gioiello</h3>
                            <textarea
                                className="w-full h-64 bg-transparent border border-[#C5A572] rounded-lg p-4 text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#A89160] resize-none placeholder:text-gray-300 placeholder:font-light"
                                placeholder="Scrivi qui il tuo nome o la frase da incidere sul tuo gioiello"
                                value={engravingText}
                                onChange={(e) => setEngravingText(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button className="bg-[#A89160] hover:bg-[#8C734B] text-white px-8 py-2 rounded shadow-md transition-colors text-sm font-semibold">
                                Conferma
                            </button>
                        </div>
                    </div>

                    {/* Card 2: Preview */}
                    <div className="bg-[#FDFCFB] rounded-3xl shadow-lg p-8 border border-gray-100 flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-2xl font-serif text-[#5A5A5A] font-bold mb-6">Preview del gioiello</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Before */}
                                <div className="space-y-2" onClick={() => setSelectedPreview('before')}>
                                    <span className={`text-sm block transition-colors ${selectedPreview === 'before' ? 'text-[#A89160] font-bold' : 'text-gray-500'}`}>Prima</span>
                                    <div className={`border rounded-xl overflow-hidden aspect-square flex items-center justify-center bg-white p-2 cursor-pointer transition-all duration-300 ${selectedPreview === 'before' ? 'border-[#A89160] shadow-lg scale-[1.02]' : 'border-gray-200 hover:border-[#C5A572]'}`}>
                                        <img src={p3} alt="Prima" className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                </div>
                                {/* After */}
                                <div className="space-y-2" onClick={() => setSelectedPreview('after')}>
                                    <span className={`text-sm block transition-colors ${selectedPreview === 'after' ? 'text-[#A89160] font-bold' : 'text-gray-500'}`}>Dopo</span>
                                    <div className={`border rounded-xl overflow-hidden aspect-square flex items-center justify-center bg-white p-2 relative cursor-pointer transition-all duration-300 ${selectedPreview === 'after' ? 'border-[#A89160] shadow-lg scale-[1.02]' : 'border-gray-200 hover:border-[#C5A572]'}`}>
                                        <img src={p3} alt="Dopo" className="w-full h-full object-contain mix-blend-multiply" />
                                        {/* Overlay text simulation */}
                                        {engravingText && (
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <span className="font-script text-xs sm:text-sm text-[#A89160] rotate-[-5deg] bg-white/50 px-1 backdrop-blur-[1px]">
                                                    {engravingText}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button className="bg-[#A89160] hover:bg-[#8C734B] text-white px-8 py-2 rounded shadow-md transition-colors text-sm font-semibold">
                                Conferma
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Banner */}
                <div className="bg-[#FDFCFB] rounded-3xl shadow-lg p-8 md:px-12 md:py-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100">
                    <h3 className="text-2xl font-serif text-[#5A5A5A] font-bold whitespace-nowrap">Scopri il tuo gioiello unico!</h3>

                    {/* Decorative Line */}
                    <div className="hidden md:flex flex-grow mx-12 items-center relative h-full min-h-[40px]">
                        <div className="w-full h-[1px] bg-[#C5A572] relative">
                            {/* Left Diamond */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#A89160] rotate-45"></div>
                            {/* Center Diamond */}
                            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#A89160] rotate-45"></div>
                            {/* Right Diamond */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#A89160] rotate-45"></div>
                        </div>
                    </div>

                    <button className="bg-[#A89160] hover:bg-[#8C734B] text-white px-8 py-3 rounded shadow-md transition-colors text-sm font-bold whitespace-nowrap">
                        Visualizza il tuo ordine
                    </button>
                </div>

            </div>
        </section>
    );
};

export default PersonalizationSection;
