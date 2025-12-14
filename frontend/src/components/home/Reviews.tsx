import React from 'react';
import hand1 from '../../assets/images/ui/hand-1.png';
import { reviews } from '../../data/mockData';

const Reviews: React.FC = () => {

    return (
        <section className="py-20 bg-[#FDFCFB] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">


                <div className="flex flex-col md:flex-row items-center gap-6 mb-16 relative px-4">
                    {/* Decorative Hand */}
                    <div className="relative w-24 md:w-32 flex-shrink-0">
                        <img src={hand1} alt="" className="w-full opacity-80" />
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl font-serif text-[#A89160] flex-shrink-0">Recensioni</h2>

                    {/* Separator Line */}
                    <div className="flex-grow h-[1px] bg-[#C5A572] relative flex items-center hidden md:flex">
                        {/* Start Dot */}
                        <div className="absolute left-0 w-1.5 h-1.5 bg-[#C5A572] rounded-full"></div>

                        {/* Middle Diamond (Use class for auto-centering) */}
                        <div className="diamond-icon"></div>

                        {/* End Diamond (Manual positioning) */}
                        <div className="absolute right-0 top-1/2 w-3 h-3 bg-[#C5A572] transform -translate-y-1/2 rotate-45 translate-x-1/2"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                    {reviews.map((rev) => (
                        <div key={rev.id} className="flex gap-4 items-start group">
                            <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden shadow-md">
                                <img src={rev.img} alt={rev.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <h4 className="font-serif text-lg text-[#5A5A5A] font-medium leading-none mb-2">{rev.name}</h4>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">/ ORO GIALLO 5GR</p>
                                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2">{rev.text}</p>
                                </div>
                                <div className="flex text-[#C5A572] gap-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Reviews;
