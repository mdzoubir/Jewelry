import React from 'react';
import imgSpecial from '../../assets/images/categories/feature_special_events.jpg';
import imgEventsOnly from '../../assets/images/categories/feature_events_only.jpg';
import imgPersonal from '../../assets/images/categories/feature_personal.jpg';

const Features: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8 bg-[#FDFCFB] rounded-2xl shadow-xl p-6 md:p-16 space-y-20">

                {/* Top Separator */}
                <div className="w-full max-w-4xl mx-auto flex items-center px-4">
                    <div className="w-1.5 h-1.5 bg-[#C5A572] transform rotate-45"></div>
                    <div className="h-[1px] bg-[#C5A572] flex-grow relative"></div>
                    <div className="h-[1px] bg-[#C5A572] flex-grow relative"></div>
                    <div className="w-1.5 h-1.5 bg-[#C5A572] transform rotate-45"></div>
                </div>

                {/* Section 1 */}
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/5] md:aspect-square">
                            <img src={imgSpecial} alt="Eventi speciali" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-8">
                        <h2 className="text-3xl font-serif text-[#4A4A4A]">Cerchi un regalo per i tuoi <span className="italic font-bold">Eventi speciali?</span></h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            <span className="font-bold italic">Con Mya Oro, puoi finalmente scoprire il gioiello perfetto per le tue occasioni speciali</span> con amici e familiari.
                            Questo è esattamente ciò che stavi cercando! Se avevi dei dubbi, basta dare un'occhiata alla nostra selezione
                            di gioielli per battesimi, matrimoni, anniversari ed altri eventi significativi per te e i tuoi cari.
                        </p>
                        <button className="bg-[#A89160] text-white px-8 py-3 font-semibold hover:bg-[#8C734B] transition-colors shadow-md rounded-sm text-sm">
                            Scopri tutte le collezioni
                        </button>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/5] md:aspect-square">
                            <img src={imgEventsOnly} alt="Gioielli per eventi" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-8 text-left">
                        <h2 className="text-3xl font-serif text-[#4A4A4A]">Ma quindi ci sono solo gioielli <br /> per gli <span className="italic font-bold">Eventi?</span></h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Ovviamente no! <span className="font-bold italic">Per noi è molto importante anche festeggiare se stessi</span>,
                            la propria personalità ed i propri traguardi. Per questo abbiamo creato gioielli che possano riflettere
                            la tua luce e illuminarti con carattere.
                        </p>
                        <button className="bg-[#A89160] text-white px-8 py-3 font-semibold hover:bg-[#8C734B] transition-colors shadow-md rounded-sm text-sm">
                            Trova il tuo gioiello
                        </button>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/5] md:aspect-square">
                            <img src={imgPersonal} alt="Mya Personal" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-8">
                        <h2 className="text-3xl font-serif text-[#4A4A4A]">Con <span className="italic font-bold">Mya Personal</span> potrai...</h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            <span className="font-bold italic">Con Mya Personal puoi creare un gioiello su misura che rispecchi il tuo stile, il tuo carattere e la tua personalità;</span>
                            che ti dia luce e che ti valorizzi come meriti. Compila il modulo e inizia il tuo viaggio per la creazione di un pezzo elegante e originale <span className="italic">pensato solo per te!</span>
                        </p>
                        <button className="bg-[#A89160] text-white px-8 py-3 font-semibold hover:bg-[#8C734B] transition-colors shadow-md rounded-sm text-sm">
                            Crea il tuo gioiello
                        </button>
                    </div>
                </div>

                {/* Bottom Separator */}
                <div className="w-full max-w-4xl mx-auto flex items-center px-4">
                    <div className="w-1.5 h-1.5 bg-[#C5A572] transform rotate-45"></div>
                    <div className="h-[1px] bg-[#C5A572] flex-grow relative"></div>
                    <div className="h-[1px] bg-[#C5A572] flex-grow relative"></div>
                    <div className="w-1.5 h-1.5 bg-[#C5A572] transform rotate-45"></div>
                </div>

            </div>
        </section>
    );
};

export default Features;
