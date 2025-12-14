export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(value);
};

export const parsePrice = (priceStr: string): number => {
    // Legacy support for the old string format if needed during migration
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace('€', '').replace(',', '.').trim());
};
