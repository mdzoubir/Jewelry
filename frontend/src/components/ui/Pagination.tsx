import React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onScrollTop?: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    onScrollTop
}) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center relative mt-12 mb-20">
            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
                {/* Prev */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-8 h-8 flex items-center justify-center transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#D4C5A8] hover:text-[#A89160]'}`}
                >
                    <ChevronLeft size={24} strokeWidth={1.5} />
                    <ChevronLeft size={24} strokeWidth={1.5} className="-ml-3" />
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                        key={number}
                        onClick={() => onPageChange(number)}
                        className={`w-10 h-10 rounded-lg border font-medium flex items-center justify-center text-sm transition-colors ${currentPage === number
                            ? 'bg-[#A89160] text-white border-[#A89160]'
                            : 'border-[#E5E0D5] text-gray-400 hover:border-[#A89160] hover:text-[#A89160]'
                            }`}
                    >
                        {number}
                    </button>
                ))}

                {/* Next */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`w-8 h-8 flex items-center justify-center transition-colors ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-[#D4C5A8] hover:text-[#A89160]'}`}
                >
                    <ChevronRight size={24} strokeWidth={1.5} />
                    <ChevronRight size={24} strokeWidth={1.5} className="-ml-3" />
                </button>
            </div>

            {/* Floating Scroll Top Button (Right Aligned absolute) */}
            {onScrollTop && (
                <button
                    onClick={onScrollTop}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 border border-[#E5E0D5] rounded-lg flex items-center justify-center text-[#D4C5A8] hover:text-[#A89160] hover:border-[#A89160] transition-all hidden md:flex"
                >
                    <ChevronUp size={24} />
                </button>
            )}
        </div>
    );
};

export default Pagination;
