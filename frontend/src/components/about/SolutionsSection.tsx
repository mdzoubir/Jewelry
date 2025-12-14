import React from 'react';
import categoryPersonal from '../../assets/images/categories/category_personal.jpg';
import categoryEvents from '../../assets/images/categories/category_events.jpg';
import categoryForYou from '../../assets/images/categories/category_foryou.jpg';
import hand1 from '../../assets/images/ui/hand-1.png';
import hand2 from '../../assets/images/ui/hand-2.png';

const SolutionsSection: React.FC = () => {
    return (
        <section className="py-24 px-4 md:px-8 bg-white-200 relative overflow-hidden">
            {/* Decorative Hands */}
            <div className="absolute top-10 left-0 md:left-20 w-32 md:w-56 opacity-80 pointer-events-none">
                <img src={hand1} alt="" className="w-full transform -rotate-12" />
            </div>
            <div className="absolute top-20 right-0 md:right-20 w-32 md:w-56 opacity-80 pointer-events-none">
                <img src={hand2} alt="" className="w-full transform rotate-12" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Title */}
                <h2 className="text-3xl md:text-5xl font-title text-gold-600 mb-8 md:mb-12 font-bold tracking-tight text-left">
                    Scopri le soluzioni che abbiamo in serbo per te!
                </h2>

                {/* Separator */}
                <div className="flex items-center w-full gap-4 mb-20 opacity-60">
                    <div className="w-1.5 h-1.5 bg-gold-400 rotate-45 flex-shrink-0"></div>
                    <div className="h-[1px] bg-gold-400 w-full relative">
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gold-500 rotate-45"></div>
                    </div>
                    <div className="w-1.5 h-1.5 bg-gold-400 rotate-45 flex-shrink-0"></div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {/* Card 1 */}
                    <div className="bg-[#F9F8F6] p-6 pb-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                        <div className="aspect-[4/4] rounded-xl overflow-hidden mb-8 shadow-sm">
                            <img src={categoryPersonal} alt="Mya Personal" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <h3 className="text-3xl font-title font-bold text-dark-gray-700 mb-3">Mya Personal</h3>
                        <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">Gioielli su misura</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#F9F8F6] p-6 pb-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                        <div className="aspect-[4/4] rounded-xl overflow-hidden mb-8 shadow-sm">
                            <img src={categoryEvents} alt="Gioielli per Eventi" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <h3 className="text-3xl font-title font-bold text-dark-gray-700 mb-3">Gioielli per Eventi</h3>
                        <p className="text-sm text-gray-500 font-medium">Gioielli selezionati per i tuoi eventi</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#F9F8F6] p-6 pb-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                        <div className="aspect-[4/4] rounded-xl overflow-hidden mb-8 shadow-sm">
                            <img src={categoryForYou} alt="Gioielli per te" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <h3 className="text-3xl font-title font-bold text-dark-gray-700 mb-3">Gioielli per te</h3>
                        <p className="text-sm text-gray-500 font-medium">La nostra selezione completa di gioielli</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolutionsSection;
