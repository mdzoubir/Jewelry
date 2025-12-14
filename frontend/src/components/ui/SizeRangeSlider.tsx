import React from 'react';

interface SizeRangeSliderProps {
    min: number;
    max: number;
    value: number;
    labelValue: string; // The display string e.g. "12,0mm"
    onChange: (newValue: number) => void;
    className?: string;
}

const SizeRangeSlider: React.FC<SizeRangeSliderProps> = ({
    min,
    max,
    value,
    labelValue,
    onChange,
    className = ''
}) => {
    const range = max - min;
    const percentage = range > 0 ? ((value - min) / range) * 100 : 50;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(parseFloat(e.target.value));
    };

    return (
        <div className={`relative w-full pt-8 pb-4 ${className}`}>
            {/* Custom Range Input */}
            <input
                type="range"
                min={min}
                max={max}
                step={0.1}
                value={value}
                onChange={handleChange}
                className="w-full h-[4px] bg-[#E5E5E5] rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-0 accent-[#C5A572] relative z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #C5A572 0%, #C5A572 ${percentage}%, #E5E5E5 ${percentage}%, #E5E5E5 100%)`
                }}
            />

            {/* Floating Value Label */}
            <div
                className="absolute top-0 transform -translate-x-1/2 transition-all duration-100 ease-out pointer-events-none"
                style={{ left: `${percentage}%` }}
            >
                <div className="bg-[#5A5A5A] text-white text-xs font-bold py-1 px-3 rounded shadow-lg whitespace-nowrap relative">
                    {labelValue}
                    {/* Tiny arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#5A5A5A]"></div>
                </div>
            </div>

            {/* Min/Max Labels */}
            <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                <span>{min.toFixed(1).replace('.', ',')}mm</span>
                <span>{max.toFixed(1).replace('.', ',')}mm</span>
            </div>

            {/* Inline Styles specifically for the slider thumb customization */}
            {/* 
                Note: While usually discouraged, this is necessary for cross-browser styling of the range thumb 
                which Tailwind doesn't fully cover with standard utility classes yet. 
                Moved here to encapsulate it within the component.
            */}
            <style>{`
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 24px;
                    width: 24px;
                    border-radius: 50%;
                    background: #C5A572;
                    border: 4px solid #FFFFFF;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.15);
                    cursor: grab;
                    margin-top: -10px; /* Center thumb on track */
                }
                input[type=range]::-moz-range-thumb {
                    height: 24px;
                    width: 24px;
                    border-radius: 50%;
                    background: #C5A572;
                    border: 4px solid #FFFFFF;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.15);
                    cursor: grab;
                }
                input[type=range]::-webkit-slider-runnable-track {
                    height: 4px;
                    border-radius: 2px;
                }
            `}</style>
        </div>
    );
};

export default SizeRangeSlider;
