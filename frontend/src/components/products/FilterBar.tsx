import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
    categories: string[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="flex flex-wrap justify-center items-center gap-4 mb-12 py-4">
            {/* Filter Button (Reset) */}
            <button
                onClick={() => onSelectCategory(null)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border border-[#D4C5A8]/30 font-bold text-sm whitespace-nowrap transition-colors shrink-0 ${!selectedCategory
                    ? 'bg-[#A89160] text-white shadow-md'
                    : 'bg-[#F9F8F6] text-[#A89160] hover:bg-[#F0EBE0]'
                    }`}
            >
                <SlidersHorizontal size={18} />
                Tutti
            </button>

            {/* Vertical Divider */}
            <div className="hidden md:block relative h-8 w-[1px] bg-[#C5A572] mx-4 shrink-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[3px] w-1.5 h-1.5 bg-[#C5A572] rotate-45"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[3px] w-1.5 h-1.5 bg-[#C5A572] rotate-45"></div>
            </div>

            {/* Categories */}
            {categories.map((cat, index) => (
                <button
                    key={index}
                    onClick={() => onSelectCategory(cat)}
                    className={`px-6 py-3 rounded-xl border font-medium text-xs md:text-sm whitespace-nowrap transition-colors shrink-0 ${selectedCategory === cat
                        ? 'bg-[#A89160] text-white border-[#A89160] shadow-md'
                        : 'bg-white border-[#D4C5A8]/50 text-gray-500 hover:border-[#A89160] hover:text-[#A89160]'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
