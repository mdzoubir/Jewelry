import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#A89160]"></div>
        </div>
    );
};

export default LoadingSpinner;
