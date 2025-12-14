import React from 'react';

interface DiamondDividerProps {
    size?: number; // Size in px
    color?: string;
    className?: string;
}

const DiamondDivider: React.FC<DiamondDividerProps> = ({
    size = 12,
    color = '#A89160',
    className = ''
}) => {
    return (
        <div
            className={`rotate-45 flex-shrink-0 ${className}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color
            }}
        />
    );
};

export default DiamondDivider;
