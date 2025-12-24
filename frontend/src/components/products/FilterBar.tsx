import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
    categories: string[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
    onToggleSidebar: () => void;
    isSidebarOpen: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({ categories, selectedCategory, onSelectCategory, onToggleSidebar, isSidebarOpen }) => {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-12 py-4">

            {/* Filter Toggle Button */}
            <button
                onClick={onToggleSidebar}
                className={`flex items-center gap-3 px-8 py-3 rounded-xl border font-serif text-[#A89160] tracking-wide transition-all shrink-0 ${isSidebarOpen
                    ? 'bg-[#A89160] text-white border-[#A89160] shadow-md'
                    : 'bg-[#F9F8F6] border-[#D4C5A8]/50 hover:bg-[#F0EBE0]'
                    }`}
            >
                <SlidersHorizontal size={18} />
                <span>Filtri</span>
            </button>

            {/* Vertical Divider */}
            <div className="hidden md:block relative h-8 w-[1px] bg-[#C5A572] mx-2 shrink-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[3px] w-1.5 h-1.5 bg-[#C5A572] rotate-45"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[3px] w-1.5 h-1.5 bg-[#C5A572] rotate-45"></div>
            </div>

            {/* Categories Scrollable Area */}
            <div className="flex-grow w-full overflow-x-auto pb-2 -mb-2 scrollbar-hide">
                <div className="flex gap-3">
                    {/* Reset/All option mixed in or separate? Design shows just categories. Let's keep specific categories. */}

                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => onSelectCategory(selectedCategory === cat ? null : cat)}
                            className={`px-6 py-3 rounded-xl border font-medium text-sm whitespace-nowrap transition-colors flex-shrink-0 ${selectedCategory === cat
                                ? 'bg-[#F9F8F6] text-[#A89160] border-[#A89160] shadow-sm'
                                : 'bg-transparent border-[#D4C5A8]/50 text-gray-500 hover:border-[#A89160] hover:text-[#A89160]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
