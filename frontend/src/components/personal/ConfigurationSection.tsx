import React, { useState } from 'react';
import { User, Diamond, Crown, Sparkles } from 'lucide-react';
import p2 from '../../assets/images/products/product_2.png';
import p4 from '../../assets/images/products/product_4.png';
import handLine from '../../assets/images/ui/hand-2.png';

const ConfigurationSection: React.FC = () => {
    // Selection States
    const [selectedTarget, setSelectedTarget] = useState<number | null>(null);
    const [selectedType, setSelectedType] = useState<number | null>(null);
    const [ringSize, setRingSize] = useState<string>("14.9mm");
    const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
    const [selectedGem, setSelectedGem] = useState<string | null>(null);
    const [selectedJewel, setSelectedJewel] = useState<number | null>(null);

    // Mock Data
    const targets = [1, 2, 3, 4];
    const types = [1, 2, 3, 4, 5];
    const materials = [
        { id: 'white', name: 'Oro bianco', class: 'bg-gray-100' },
        { id: 'yellow', name: 'Oro giallo', class: 'bg-[#E5C990]' },
        { id: 'rose', name: 'Oro rosa', class: 'bg-[#F2D0D0]' },
        { id: 'silver', name: 'Argento', class: 'bg-gray-300' }
    ];
    const gems = [
        { id: 'red', class: 'bg-red-500' },
        { id: 'green', class: 'bg-green-600' },
        { id: 'blue', class: 'bg-blue-800' },
        { id: 'white', class: 'bg-white border' }
    ];

    const gridItems = [
        { id: 1, img: p2 }, { id: 2, img: p4 }, { id: 3, img: p2 },
        { id: 4, img: p4 }, { id: 5, img: p2 }, { id: 6, img: p4 },
    ];

    return (
        <section id="configuration-section" className="relative z-20 -mt-20 pb-4 px-4 md:px-8">
            <div className="max-w-6xl mx-auto bg-[#FDFCFB] rounded-3xl shadow-lg p-8 md:p-12 relative overflow-hidden">

                {/* Header */}
                <div className="mb-12 relative z-10">
                    <h2 className="text-3xl font-serif text-[#5A5A5A] font-bold mb-2">Scegli le caratteristiche</h2>
                    <p className="text-gray-500">Per cominciare scegli le seguenti caratteristiche ed il gioiello base.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">

                    {/* Left Column - Filters */}
                    <div className="lg:col-span-5 relative pl-8">
                        {/* Timeline Vertical Line */}
                        <div className="absolute left-2.5 top-2 bottom-0 w-0.5 bg-[#C5A572]"></div>

                        {/* Step 1: Target & Type */}
                        <div className="relative mb-10">
                            <div className="absolute -left-[29px] top-1.5 w-4 h-4 bg-[#C5A572] rotate-45"></div>
                            <h3 className="text-[#A89160] font-bold mb-4 text-lg">Scegli le caratteristiche</h3>

                            {/* Targets */}
                            <div className="flex gap-3 mb-6">
                                {targets.map(i => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedTarget(i)}
                                        className={`w-12 h-12 border rounded-md flex items-center justify-center transition-all ${selectedTarget === i
                                            ? 'bg-[#C5A572] text-white border-[#C5A572]'
                                            : 'border-[#C5A572] text-[#C5A572] hover:bg-[#C5A572] hover:text-white'
                                            }`}
                                    >
                                        <User size={24} />
                                    </button>
                                ))}
                            </div>

                            {/* Jewel Types */}
                            <div className="flex gap-3 flex-wrap">
                                {types.map(i => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedType(i)}
                                        className={`w-12 h-12 border rounded-md flex items-center justify-center transition-all ${selectedType === i
                                            ? 'bg-[#C5A572] text-white border-[#C5A572]'
                                            : 'border-[#C5A572] text-[#C5A572] hover:bg-[#C5A572] hover:text-white'
                                            }`}
                                    >
                                        {i % 2 === 0 ? <Diamond size={22} /> : <Crown size={22} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Step 2: Slider */}
                        <div className="relative mb-10">
                            <div className="absolute -left-[29px] top-1.5 w-4 h-4 bg-[#C5A572] rotate-45"></div>
                            <h3 className="text-[#A89160] font-bold mb-4 text-lg">Misure anelli per diametro</h3>
                            <div className="px-2">
                                <input
                                    type="range"
                                    min="14.9" max="23.3" step="0.1"
                                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C5A572]"
                                    onChange={(e) => setRingSize(`${e.target.value}mm`)}
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                                    <span>14.9mm</span>
                                    <span className="text-[#A89160] font-bold">{ringSize}</span>
                                    <span>23.3mm</span>
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Materials */}
                        <div className="relative mb-10">
                            <div className="absolute -left-[29px] top-1.5 w-4 h-4 bg-[#C5A572] rotate-45"></div>
                            <h3 className="text-[#A89160] font-bold mb-4 text-lg">Materiali</h3>
                            <div className="flex gap-6">
                                {materials.map((mat) => (
                                    <div key={mat.id} className="text-center group cursor-pointer" onClick={() => setSelectedMaterial(mat.id)}>
                                        <div className={`w-10 h-10 rounded-md shadow-sm mb-2 border-2 transition-all ${mat.class} ${selectedMaterial === mat.id ? 'border-[#A89160] scale-110' : 'border-gray-200 group-hover:border-[#C5A572]'}`}></div>
                                        <span className={`text-[10px] block font-medium ${selectedMaterial === mat.id ? 'text-[#A89160]' : 'text-gray-400'}`}>{mat.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Step 4: Gems */}
                        <div className="relative">
                            <div className="absolute -left-[29px] top-1.5 w-4 h-4 bg-[#C5A572] rotate-45"></div>
                            <h3 className="text-[#A89160] font-bold mb-4 text-lg">Colore delle gemme</h3>
                            <div className="flex gap-4">
                                {gems.map((gem) => (
                                    <div
                                        key={gem.id}
                                        onClick={() => setSelectedGem(gem.id)}
                                        className={`w-8 h-8 rounded-full cursor-pointer shadow-sm transition-transform ${gem.class} ${selectedGem === gem.id ? 'ring-2 ring-offset-2 ring-[#A89160] scale-110' : 'hover:scale-105'}`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Grid */}
                    <div className="lg:col-span-7 relative pl-0 lg:pl-12">
                        <h3 className="text-[#A89160] font-bold mb-6 text-lg">Scegli il gioiello base tra i disponibili</h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {gridItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`bg-white p-4 rounded-xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg aspect-square flex items-center justify-center relative ${selectedJewel === item.id ? 'border-[#A89160]' : 'border-transparent'}`}
                                    onClick={() => setSelectedJewel(item.id)}
                                >
                                    <img src={item.img} alt="Jewel Base" className="w-full h-auto object-contain max-h-[140px]" />
                                    {selectedJewel === item.id && (
                                        <div className="absolute top-2 right-2 text-[#A89160]">
                                            <Sparkles size={16} fill="currentColor" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex justify-end">
                            <button className="bg-[#A89160] hover:bg-[#8C734B] text-white px-10 py-3 rounded shadow-lg shadow-[#A89160]/20 font-semibold transition-all transform hover:scale-105 active:scale-95">
                                Conferma
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative Background Hand */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none w-[500px]">
                    <img src={handLine} alt="" className="w-full" />
                </div>
            </div>
        </section>
    );
};

export default ConfigurationSection;
