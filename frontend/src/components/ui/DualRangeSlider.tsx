import React, { useState, useEffect, useRef } from 'react';

interface DualRangeSliderProps {
    min: number;
    max: number;
    step?: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
    formatLabel?: (value: number) => string;
    thumbShape?: 'diamond' | 'square';
}

const DualRangeSlider: React.FC<DualRangeSliderProps> = ({
    min,
    max,
    step = 1,
    value,
    onChange,
    formatLabel,
    thumbShape = 'diamond'
}) => {
    const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Calculate percentage for position
    const getPercent = (v: number) => ((v - min) / (max - min)) * 100;

    const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(type);
        e.preventDefault();
    };

    useEffect(() => {
        const handleMove = (clientX: number) => {
            if (!sliderRef.current || !isDragging) return;

            const rect = sliderRef.current.getBoundingClientRect();
            const percent = Math.min(Math.max(0, (clientX - rect.left) / rect.width), 1);
            const rawValue = percent * (max - min) + min;
            const newValue = Math.round(rawValue / step) * step;

            if (isDragging === 'min') {
                const clamped = Math.min(newValue, value[1] - step);
                if (clamped >= min) onChange([clamped, value[1]]);
            } else {
                const clamped = Math.max(newValue, value[0] + step);
                if (clamped <= max) onChange([value[0], clamped]);
            }
        };

        const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
        const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

        const handleUp = () => setIsDragging(null);

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleUp);
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleUp);
        };
    }, [isDragging, min, max, step, value, onChange]);

    return (
        <div className="relative w-full pt-6 pb-2 select-none touch-none">
            <div ref={sliderRef} className="relative h-1 bg-[#D4C5A8]/30 rounded-full mx-2 cursor-pointer">
                {/* Active Track */}
                <div
                    className="absolute top-0 bottom-0 bg-[#C5A572] rounded-full"
                    style={{
                        left: `${getPercent(value[0])}%`,
                        right: `${100 - getPercent(value[1])}%`
                    }}
                ></div>

                {/* Min Thumb */}
                <div
                    className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#A89160] cursor-grab active:cursor-grabbing shadow-sm z-10 
                        ${thumbShape === 'diamond' ? 'rotate-45' : 'rounded-sm'}
                        ${isDragging === 'min' ? 'scale-125' : 'hover:scale-110'} transition-transform`}
                    style={{ left: `${getPercent(value[0])}%`, transform: `translate(-50%, -50%) ${thumbShape === 'diamond' ? 'rotate(45deg)' : ''}` }}
                    onMouseDown={handleMouseDown('min')}
                    onTouchStart={handleMouseDown('min')}
                ></div>

                {/* Max Thumb */}
                <div
                    className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#A89160] cursor-grab active:cursor-grabbing shadow-sm z-10 
                        ${thumbShape === 'diamond' ? 'rotate-45' : 'rounded-sm'}
                        ${isDragging === 'max' ? 'scale-125' : 'hover:scale-110'} transition-transform`}
                    style={{ left: `${getPercent(value[1])}%`, transform: `translate(-50%, -50%) ${thumbShape === 'diamond' ? 'rotate(45deg)' : ''}` }}
                    onMouseDown={handleMouseDown('max')}
                    onTouchStart={handleMouseDown('max')}
                ></div>
            </div>

            {/* Labels */}
            <div className="flex justify-between mt-3 text-xs text-gray-500 font-bold px-1">
                <span className="bg-[#A89160] text-white px-2 py-0.5 rounded shadow-sm">
                    {formatLabel ? formatLabel(value[0]) : value[0]}
                </span>
                <span className="bg-[#A89160] text-white px-2 py-0.5 rounded shadow-sm">
                    {formatLabel ? formatLabel(value[1]) : value[1]}
                </span>
            </div>
        </div>
    );
};

export default DualRangeSlider;
