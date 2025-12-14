import React from 'react';
import aboutMission from '../../assets/images/about/about_mission.jpg';
import aboutValues from '../../assets/images/about/about_values.jpg';

const MissionSection: React.FC = () => {
    return (
        <section className="relative z-20 -mt-24 md:-mt-32 pb-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto bg-[#F9F8F6] rounded-t-[3rem] shadow-2xl relative overflow-hidden">

                {/* Decorative Side Lines & Diamonds */}
                <div className="absolute top-12 bottom-12 left-6 md:left-10 w-[1px] bg-gold-400 opacity-50 flex flex-col justify-between items-center">
                    <div className="w-2.5 h-2.5 bg-gold-500 rotate-45 transform -translate-x-[0.5px]"></div> {/* Top */}
                    <div className="w-3 h-3 bg-gold-500 rotate-45 transform -translate-x-[0.5px]"></div>   {/* Middle */}
                    <div className="w-2.5 h-2.5 bg-gold-500 rotate-45 transform -translate-x-[0.5px]"></div> {/* Bottom */}
                </div>

                <div className="absolute top-12 bottom-12 right-6 md:right-10 w-[1px] bg-gold-400 opacity-50 flex flex-col justify-between items-center">
                    <div className="w-2.5 h-2.5 bg-gold-500 rotate-45 transform -translate-x-[0.5px]"></div> {/* Top */}
                    <div className="w-3 h-3 bg-gold-500 rotate-45 transform -translate-x-[0.5px]"></div>   {/* Middle */}
                    <div className="w-2.5 h-2.5 bg-gold-500 rotate-45 transform -translate-x-[0.5px]"></div> {/* Bottom */}
                </div>

                <div className="px-12 md:px-24 py-16 md:py-24 space-y-20">

                    {/* 1. Mission */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                                <img src={aboutMission} alt="La nostra Mission" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 space-y-4">
                            <h2 className="text-3xl font-bold font-title text-dark-gray-700">La nostra Mission</h2>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                Lorem ipsum dolor sit amet consectetur. Dolor nulla sit dictumst dictumst.
                                Ipsum nec pellentesque ut vitae faucibus urna suspendisse nunc. Aenean leo
                                in arcu mauris pellentesque purus fermentum elit sapien. Faucibus id quis
                                consequat tempor malesuada in pulvinar nibh diam. Enim ullamcorper diam
                                adipiscing lectus ultrices sit vehicula.
                            </p>
                        </div>
                    </div>

                    {/* 2. Storia */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold font-title text-dark-gray-700">La nostra Storia</h2>
                        <p className="text-gray-500 leading-relaxed text-sm">
                            Lorem ipsum dolor sit amet consectetur. Dolor nulla sit dictumst dictumst. Ipsum nec pellentesque ut vitae faucibus urna suspendisse
                            nunc. Aenean leo in arcu mauris pellentesque purus fermentum elit sapien. Faucibus id quis consequat tempor malesuada in pulvinar
                            nibh diam. Enim ullamcorper diam adipiscing lectus ultrices sit vehicula. Mauris nunc et integer aliquam facilisi tincidunt dolor.
                            Interdum aliquet quam gravida eu. Enim in justo maecenas porta suspendisse aliquam aliquet ipsum. Montes mauris ultricies non
                            tellus nunc sem urna quisque.
                        </p>
                    </div>

                    {/* 3. Valori */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-gray-100 flex items-center justify-center">
                                <img src={aboutValues} alt="I nostri valori" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 space-y-4">
                            <h2 className="text-3xl font-bold font-title text-dark-gray-700">I nostri valori</h2>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                Lorem ipsum dolor sit amet consectetur. Dolor nulla sit dictumst dictumst.
                                Ipsum nec pellentesque ut vitae faucibus urna suspendisse nunc. Aenean
                                leo in arcu mauris pellentesque purus fermentum elit sapien. Faucibus id
                                quis consequat tempor malesuada in pulvinar nibh diam. Enim ullamcorper
                                diam adipiscing lectus ultrices sit vehicula.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MissionSection;
