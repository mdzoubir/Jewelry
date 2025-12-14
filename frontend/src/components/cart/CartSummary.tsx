import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ChevronUp } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';
import Button from '../ui/Button';
import DiamondDivider from '../ui/DiamondDivider';

interface CartSummaryProps {
    onCheckout?: () => void;
    buttonText?: string;
}

const CartSummary: React.FC<CartSummaryProps> = ({
    onCheckout,
    buttonText = "Procedi all'ordine"
}) => {
    const {
        shippingCost,
        taxAmount,
        total,
        discountCode,
        applyDiscount,
        discountAmount
    } = useShop();

    const [inputCode, setInputCode] = useState(discountCode);

    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 relative">
            {/* Decorative Diamond Corner */}
            <DiamondDivider
                size={16}
                className="absolute -right-2 top-8 transform translate-x-1/2"
            />

            <h2 className="text-2xl font-serif font-bold text-[#5A5A5A] mb-2">Totale provvisorio</h2>
            <p className="text-xs text-gray-400 mb-6">Costi calcolati sulla base della tua selezione prodotti</p>

            <div className="space-y-4 mb-8">
                {/* Shipping */}
                <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                    <span>Spese di spedizione:</span>
                    <span className="font-bold text-[#5A5A5A]">€{shippingCost.toFixed(2)}</span>
                </div>
                <div className="w-full h-[1px] bg-gray-200"></div>

                {/* VAT */}
                <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                    <span>IVA 10%</span>
                    <span className="font-bold text-[#5A5A5A]">€{taxAmount.toFixed(2)}</span>
                </div>
                <div className="w-full h-[1px] bg-gray-200"></div>

                {/* Other Taxes */}
                <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                    <span>Altre TASSE</span>
                    <span className="font-bold text-[#5A5A5A]">€20,00</span>
                </div>
                <div className="w-full h-[1px] bg-gray-200"></div>

                {/* Discount Section */}
                <div className="flex items-center justify-between gap-4 mt-4">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#A89160] focus:ring-[#A89160]" />
                        <span className="text-sm font-bold text-gray-600">CODICE SCONTO</span>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="w-24 border border-gray-300 rounded px-2 py-1 text-sm text-gray-600"
                            placeholder="#123456"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                        />
                        <button
                            onClick={() => applyDiscount(inputCode)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-2 rounded text-xs"
                        >
                            APPLY
                        </button>
                    </div>
                </div>
                {discountAmount > 0 && (
                    <div className="flex justify-between items-center text-sm font-medium text-green-600">
                        <span>Hai risparmiato</span>
                        <span>- €{discountAmount.toFixed(2)}</span>
                    </div>
                )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-bold text-gray-600">TOTALE ORDINE:</span>
                <span className="text-3xl font-serif font-bold text-[#5A5A5A]">{formatCurrency(total)}</span>
            </div>

            {/* Action Button */}
            <div className="flex justify-end">
                <Button
                    className="pl-8 pr-12 py-3 rounded shadow-md relative group"
                    onClick={onCheckout}
                >
                    {buttonText}
                    <div className="absolute right-0 top-0 h-full w-10 bg-[#BC9F67] rounded-r flex items-center justify-center group-hover:bg-[#9E8355] transition-colors">
                        <ChevronUp size={20} className="text-white" />
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default CartSummary;
