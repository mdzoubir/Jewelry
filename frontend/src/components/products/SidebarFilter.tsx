import React from 'react';
import { User, UserCheck, Baby, Gem, CircleDot, SlidersHorizontal } from 'lucide-react';
import DualRangeSlider from '../ui/DualRangeSlider';

interface SidebarFilterProps {
    isOpen: boolean;
    onClose: () => void;
    filters: any;
    setFilters: (filters: any) => void;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({ isOpen, onClose, filters, setFilters }) => {
    // Helper to update a specific filter field
    const updateFilter = (key: string, value: any) => {
        setFilters((prev: any) => ({ ...prev, [key]: value }));
    };

    if (!isOpen) return null;

    return (
        <aside className="w-full md:w-80 bg-[#F DFCFB] border border-[#D4C5A8]/30 rounded-3xl p-6 shadow-xl flex-shrink-0 h-fit mb-8 md:mb-0">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-[#6D635B]">
                    <SlidersHorizontal size={24} />
                    <span className="font-bold text-lg font-serif">Filtri</span>
                </div>
                {/* Mobile close button could go here */}
            </div>

            {/* Genere */}
            <div className="mb-8">
                <h3 className="text-[#A89160] font-bold mb-4">Genere</h3>
                <div className="flex gap-4">
                    {['woman', 'man', 'girl', 'boy'].map((gender) => (
                        <button
                            key={gender}
                            onClick={() => updateFilter('gender', filters.gender === gender ? null : gender)}
                            className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all ${filters.gender === gender
                                ? 'bg-[#A89160] border-[#A89160] text-white'
                                : 'border-[#D4C5A8] text-[#D4C5A8] hover:border-[#A89160] hover:text-[#A89160]'
                                }`}
                        >
                            <GenderIcon type={gender} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Tipo di prodotto */}
            <div className="mb-8">
                <h3 className="text-[#A89160] font-bold mb-4">Tipo di prodotto</h3>
                <div className="flex flex-wrap gap-3">
                    {['ring', 'necklace', 'bracelet', 'earring', 'pendant'].map((type) => (
                        <button
                            key={type}
                            onClick={() => updateFilter('type', filters.type === type ? null : type)}
                            className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all ${filters.type === type
                                ? 'bg-[#A89160] border-[#A89160] text-white'
                                : 'border-[#D4C5A8] text-[#D4C5A8] hover:border-[#A89160] hover:text-[#A89160]'
                                }`}
                        >
                            <TypeIcon type={type} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Misure anelli (Range Slider) */}
            <div className="mb-8">
                <h3 className="text-[#A89160] font-bold mb-4">Misure anelli per diametro</h3>
                <DualRangeSlider
                    min={14.9}
                    max={23.3}
                    step={0.1}
                    value={filters.ringSize || [14.9, 23.3]}
                    onChange={(val) => updateFilter('ringSize', val)}
                    formatLabel={(val) => `${val.toFixed(1)}mm`}
                    thumbShape="diamond"
                />
            </div>

            {/* Carati (Points Slider - Simplified as toggle for now or slider) */}
            <div className="mb-8">
                <h3 className="text-[#A89160] font-bold mb-4">Carati</h3>
                <DualRangeSlider
                    min={9}
                    max={18}
                    step={1} // Ideally snap to 9, 16, 18 but linear 9-18 is ok for MVP
                    value={filters.carats || [9, 18]}
                    onChange={(val) => updateFilter('carats', val)}
                    formatLabel={(val) => `${val}k`}
                    thumbShape="square"
                />
            </div>

            {/* Prezzo */}
            <div className="mb-8">
                <h3 className="text-[#A89160] font-bold mb-4">Prezzo</h3>
                <DualRangeSlider
                    min={100}
                    max={600}
                    step={10}
                    value={filters.price || [100, 600]}
                    onChange={(val) => updateFilter('price', val)}
                    formatLabel={(val) => `€ ${val}`}
                    thumbShape="diamond"
                />
            </div>

            {/* Materiali */}
            <div className="mb-8">
                <h3 className="text-[#A89160] font-bold mb-4">Materiali</h3>
                <div className="flex gap-3">
                    {[
                        { name: 'white_gold', color: '#F0F0F0', label: 'Oro bianco' },
                        { name: 'yellow_gold', color: '#D4AF37', label: 'Oro giallo' },
                        { name: 'rose_gold', color: '#B76E79', label: 'Oro rosa' },
                        { name: 'silver', color: '#C0C0C0', label: 'Argento' }
                    ].map((mat) => (
                        <div key={mat.name} className="flex flex-col items-center gap-1 group cursor-pointer" onClick={() => updateFilter('material', mat.name)}>
                            <div className={`w-8 h-8 rounded-full shadow-sm border-2 ${filters.material === mat.name ? 'border-[#A89160]' : 'border-transparent'
                                }`} style={{ backgroundColor: mat.color }}></div>
                            <span className="text-[10px] text-gray-400 group-hover:text-[#A89160] text-center leading-tight max-w-[50px]">{mat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Colori delle gemme */}
            <div className="mb-8">
                <h3 className="text-[#A89160] font-bold mb-4">Colori delle gemme</h3>
                <div className="flex gap-2 flex-wrap">
                    {['#CCCCCC', '#A0522D', '#D4AF37', '#FFC0CB', '#ADD8E6'].map((color, idx) => (
                        <div
                            key={idx}
                            onClick={() => updateFilter('gemColor', filters.gemColor === color ? null : color)}
                            className={`w-8 h-8 rounded-full shadow-sm border cursor-pointer transition-all ${filters.gemColor === color ? 'ring-2 ring-[#A89160] scale-110' : 'border-gray-100 hover:scale-105'
                                }`}
                            style={{ backgroundColor: color }}
                        ></div>
                    ))}
                </div>
            </div>

        </aside>
    );
};

// Icons
const GenderIcon = ({ type }: { type: string }) => {
    // Simplified icon logic
    if (type === 'woman') return <UserCheck size={20} />;
    if (type === 'man') return <User size={20} />;
    if (type === 'girl') return <Baby size={20} />;
    if (type === 'boy') return <Baby size={20} />;
    return <User size={20} />;
};

const TypeIcon = ({ type }: { type: string }) => {
    if (type === 'ring') return <div className="w-5 h-5 rounded-full border-2 border-current"></div>; // Ring
    if (type === 'necklace') return <div className="w-5 h-5 rounded-b-full border-b-2 border-l-2 border-r-2 border-current"></div>; // Necklace
    if (type === 'bracelet') return <CircleDot size={20} />;
    if (type === 'earring') return <div className="w-1 h-4 bg-current rounded-full"></div>;
    return <Gem size={20} />;
};

export default SidebarFilter;
