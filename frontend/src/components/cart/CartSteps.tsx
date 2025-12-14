import React from 'react';
import { Sparkles } from 'lucide-react';

interface CartStepsProps {
    currentStep?: number; // 0: Prodotti, 1: Carrello, 2: Checkout, 3: Complete
}

const CartSteps: React.FC<CartStepsProps> = ({ currentStep = 1 }) => {
    const steps = [
        { name: "Prodotti", step: 0 },
        { name: "Carrello", step: 1 },
        { name: "Completa il pagamento", step: 2 },
        { name: "Completa l'acquisto", step: 3 }
    ];

    return (
        <div className="flex items-center justify-center text-sm md:text-base text-[#8C734B] font-light py-8">
            {steps.map((step, index) => {
                // If currentStep is 4, everything is completed
                const isCompleted = currentStep >= 4 || step.step < currentStep;
                const isActive = step.step === currentStep;

                return (
                    <React.Fragment key={index}>
                        {/* Step Name */}
                        <span className={`${isActive ? 'font-bold text-[#A89160]' : 'text-gray-400'} ${isCompleted ? 'text-[#8C734B]' : ''}`}>
                            {step.name}
                        </span>

                        {/* Separator (not after the last item) */}
                        {index < steps.length - 1 && (
                            <div className="flex items-center mx-2 md:mx-4 text-[#A89160]">
                                <span className="hidden md:inline border-t border-[#C5A572] w-8 md:w-16 h-[1px] mx-2"></span>
                                <Sparkles size={12} className={`text-[#A89160] ${isCompleted || isActive ? 'opacity-100' : 'opacity-40'}`} />
                                <span className="hidden md:inline border-t border-[#C5A572] w-8 md:w-16 h-[1px] mx-2"></span>
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default CartSteps;
