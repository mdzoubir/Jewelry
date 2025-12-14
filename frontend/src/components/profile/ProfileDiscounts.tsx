import React, { useState } from 'react';


const discounts = [
    {
        id: 1,
        title: 'Codice sconto di Natale',
        code: '#43605478',
        bg: 'bg-red-800',
        textColor: 'text-white',
        bannerText: 'CHRISTMAS DISCOUNT 50% OFF',
        type: 'christmas'
    },
    {
        id: 2,
        title: 'Codice sconto di Black Friday',
        code: '#43605478',
        bg: 'bg-black',
        textColor: 'text-white',
        bannerText: 'BLACK FRIDAY DISCOUNT CODE: BLKFRI2024',
        type: 'blackfriday'
    },
    {
        id: 3,
        title: 'Codice sconto di Pasqua',
        code: '#43605478',
        bg: 'bg-[#FDF6E9]',
        textColor: 'text-[#A89160]',
        bannerText: 'EASTER SALE USE CODE EASTER20',
        type: 'easter'
    }
];

const ProfileDiscounts: React.FC = () => {

    const [copiedId, setCopiedId] = useState<number | null>(null);

    const handleCopy = (id: number) => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000); // Reset after 2s
    };

    return (
        <div className="w-full pb-20">
            <h2 className="text-xl text-[#6D635B] font-serif mb-8">Codici sconto disponibili</h2>

            <div className="space-y-6">
                {discounts.map((discount) => (
                    <div
                        key={discount.id}
                        className="bg-white rounded-xl border border-[#E5E0D5] p-6 flex flex-col md:flex-row gap-6 items-center shadow-sm hover:shadow-md transition-shadow"
                    >
                        {/* Visual Banner */}
                        <div className={`w-full md:w-32 h-24 rounded-lg flex items-center justify-center p-2 text-center text-xs font-bold shrink-0 ${discount.bg} ${discount.textColor}`}>
                            {discount.type === 'christmas' && (
                                <div className="leading-tight">
                                    <span className="block text-yellow-400">CHRISTMAS</span>
                                    <span className="block">DISCOUNT</span>
                                    <span className="block text-3xl my-1">50%</span>
                                    <span className="block text-[0.6rem] uppercase tracking-wider">OFF SHOP NOW</span>
                                </div>
                            )}
                            {discount.type === 'blackfriday' && (
                                <div className="leading-tight border p-1">
                                    <span className="block text-red-500">BLACK FRIDAY</span>
                                    <span className="block text-xl">DISCOUNT</span>
                                    <span className="block text-[0.5rem] mt-1 border-t pt-1">CODE: BLKFRI2024</span>
                                </div>
                            )}
                            {discount.type === 'easter' && (
                                <div className="leading-tight">
                                    <span className="block text-pink-400">EASTER</span>
                                    <span className="block text-xl text-green-500">* SALE *</span>
                                    <span className="block text-[0.6rem] text-blue-400 border border-blue-200 mt-1 px-1 rounded bg-white">EASTER20</span>
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="flex-grow text-center md:text-left">
                            <h3 className="font-bold text-[#6D635B] text-lg mb-1">{discount.title}</h3>
                            <p className="text-[#8A8A8A] text-sm">{discount.code}</p>
                        </div>

                        {/* Action */}
                        <button
                            onClick={() => handleCopy(discount.id)}
                            className="bg-[#A89160] text-white px-8 py-3 rounded text-sm font-medium hover:bg-[#8C734B] transition-colors whitespace-nowrap min-w-[140px]"
                        >
                            {copiedId === discount.id ? 'Copiato!' : 'Usa il codice'}
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileDiscounts;
