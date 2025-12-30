import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { CheckCircle } from 'lucide-react';

const OrderSuccessPage: React.FC = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-[#FEFEFD] flex items-center justify-center">
            <div className="max-w-md w-full text-center">
                <div className="mb-6 flex justify-center">
                    <CheckCircle className="w-20 h-20 text-[#A89160]" strokeWidth={1.5} />
                </div>

                <h1 className="text-3xl font-serif text-[#6D635B] font-bold mb-4">Grazie per il tuo ordine!</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Il tuo ordine è stato ricevuto con successo. Ti abbiamo inviato una email di conferma con i dettagli.
                </p>

                <div className="space-y-4">
                    <Link to="/profile/orders">
                        <Button variant="primary" fullWidth className="py-3">
                            Visualizza i miei ordini
                        </Button>
                    </Link>

                    <Link to="/products">
                        <Button variant="outline" fullWidth className="py-3">
                            Continua lo shopping
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
