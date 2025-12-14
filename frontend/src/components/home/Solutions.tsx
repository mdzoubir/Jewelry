import hand1 from '../../assets/images/ui/hand-1.png';
import hand2 from '../../assets/images/ui/hand-2.png';
import imgPersonal from '../../assets/images/categories/category_personal.jpg';
import imgEvents from '../../assets/images/categories/category_events.jpg';
import imgForYou from '../../assets/images/categories/category_foryou.jpg';
import { Link } from 'react-router-dom';

const Solutions: React.FC = () => {
    const cards = [
        {
            title: "Mya Personal",
            subtitle: "Gioielli su misura",
            img: imgPersonal,
            desc: "Crea il tuo gioiello unico",
            link: "/mya-personal"
        },
        {
            title: "Gioielli per Eventi",
            subtitle: "Gioielli selezionati per i tuoi eventi",
            img: imgEvents,
            desc: "Splendi nelle occasioni speciali",
            link: "/products"
        },
        {
            title: "Gioielli per te",
            subtitle: "La nostra selezione completa di gioielli",
            img: imgForYou,
            desc: "Trattati come una regina",
            link: "/products"
        },
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Hands */}
            <div className="absolute top-10 left-4 md:left-20 w-32 md:w-48 opacity-80 pointer-events-none">
                <img src={hand1} alt="" className="w-full h-auto" />
            </div>
            <div className="absolute top-20 right-4 md:right-20 w-32 md:w-48 opacity-80 pointer-events-none">
                <img src={hand2} alt="" className="w-full h-auto" />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 z-10 relative">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#A89160] mb-6 max-w-2xl leading-tight">Scopri le soluzioni che abbiamo in serbo per te!</h2>

                    <div className="w-full max-w-4xl flex items-center">
                        <div className="h-[1px] bg-[#C5A572] flex-grow relative">
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#C5A572] rounded-full"></div>
                        </div>
                        <div className="diamond-icon relative mx-4 bg-[#C5A572] w-3 h-3 rotate-45 transform"></div>
                        <div className="h-[1px] bg-[#C5A572] flex-grow relative">
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#C5A572] rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {cards.map((card, idx) => (
                        <Link to={card.link} key={idx} className="bg-[#F9F7F4] p-6 shadow-md rounded-sm border border-gray-100 hover:shadow-lg transition-all block group">
                            <div className="h-64 overflow-hidden mb-6">
                                <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                            <h3 className="text-2xl font-serif text-[#8C734B] mb-2 text-center">{card.title}</h3>
                            <p className="text-center text-gray-500 text-sm">{card.subtitle}</p>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 w-full max-w-6xl mx-auto flex items-center">
                    <div className="h-[1px] bg-[#C5A572] flex-grow relative">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#C5A572] rounded-full"></div>
                    </div>
                    <div className="diamond-icon relative mx-4 bg-[#C5A572] w-3 h-3 rotate-45 transform"></div>
                    <div className="h-[1px] bg-[#C5A572] flex-grow relative">
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#C5A572] rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Solutions;
