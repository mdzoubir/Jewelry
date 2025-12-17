import type { Product, Review } from '../types';


import p1 from '../assets/images/products/product_1.jpg';
import p2 from '../assets/images/products/product_2.png';
import p3 from '../assets/images/products/product_3.jpg';
import p4 from '../assets/images/products/product_4.png';
import p5 from '../assets/images/products/product_5.jpg';


import img12 from '../assets/images/products/12.jpg';

import i1 from '../assets/images/products/istockphoto-1415483167-612x612.jpg';

import px1 from '../assets/images/products/pexels-photo-1191531.jpeg';
import px2 from '../assets/images/products/pexels-photo-1395306.jpeg';
import px3 from '../assets/images/products/pexels-photo-1413420.jpeg';
import px4 from '../assets/images/products/pexels-photo-1458867.jpeg';
import px5 from '../assets/images/products/pexels-photo-266621.jpeg';
import px6 from '../assets/images/products/pexels-photo-2735970.jpeg';
import px7 from '../assets/images/products/pexels-photo-33154633.jpeg';
import px8 from '../assets/images/products/pexels-photo-33222148.jpeg';
import px9 from '../assets/images/products/pexels-photo-5475580.webp';
import px10 from '../assets/images/products/pexels-photo-6563393.jpeg';
import px11 from '../assets/images/products/pexels-photo-908184.jpeg';

import r1 from '../assets/images/reviews/review_1.jpg';
import r2 from '../assets/images/reviews/review_2.jpg';
import r3 from '../assets/images/reviews/review_3.jpg';

const baseProducts: Product[] = [
    {
        id: 1,
        img: p1,
        name: "Anello Solitario",
        price: 200,
        isBestSeller: false,
        category: "Fidanzamento",
        description: "Lorem ipsum dolor sit amet consectetur. Dolor nulla sit dictumst dictumst. Ipsum nec pellentesque ut vitae faucibus urna suspendisse nunc.",
        weight: "5gr",
        carat: "18k",
        gender: "Femminile",
        sizes: ["0,8mm", "12mm", "25mm"],
        materials: ["Oro bianco", "Oro giallo", "Oro rosa", "Argento"],
        gemColors: ["#D40000", "#1C7F36", "#1C1C85", "#FFFFFF"],
        images: [p1, i1, img12]
    },
    {
        id: 2,
        img: p2,
        name: "Collana Oro",
        price: 250,
        isBestSeller: true,
        category: "Collane",
        description: "Elegant gold necklace perfect for special occasions.",
        weight: "8gr",
        carat: "18k",
        gender: "Femminile"
    },
    {
        id: 3,
        img: p3,
        name: "Orecchini Perla",
        price: 180,
        isBestSeller: false,
        isSoldOut: true,
        category: "Orecchini",
        description: "Classic pearl earrings that add a touch of sophistication.",
        weight: "3gr",
        carat: "14k",
        gender: "Femminile"
    },
    {
        id: 4,
        img: p4,
        name: "Bracciale Rigido",
        price: 300,
        isBestSeller: true,
        category: "Bracciali",
        description: "Rigid bracelet with detailed craftsmanship.",
        weight: "10gr",
        carat: "18k",
        gender: "Unisex"
    },
    {
        id: 5,
        img: p5,
        name: "Pendente Cuore",
        price: 150,
        isBestSeller: false,
        category: "Pendente",
        description: "Beautiful heart pendant with intricate design.",
        weight: "4gr",
        carat: "18k",
        gender: "Femminile"
    },
    {
        id: 6,
        img: px1,
        name: "Anello Diamante",
        price: 400,
        isBestSeller: true,
        category: "Fidanzamento",
        description: "Stunning diamond ring for your special moment.",
        weight: "6gr",
        carat: "24k",
        gender: "Femminile"
    },
    {
        id: 7,
        img: px2,
        name: "Collana Argento",
        price: 165,
        isBestSeller: false,
        isSoldOut: true,
        category: "Collane",
        description: "Simple yet elegant silver necklace.",
        weight: "7gr",
        carat: "925",
        gender: "Unisex"
    },
    {
        id: 8,
        img: px3,
        name: "Orecchini Pendenti",
        price: 320,
        isBestSeller: true,
        category: "Orecchini",
        description: "Long hanging earrings that sparkle in the light.",
        weight: "5gr",
        carat: "18k",
        gender: "Femminile"
    },
    {
        id: 9,
        img: px4,
        name: "Bracciale Catena",
        price: 280,
        isBestSeller: false,
        category: "Bracciali",
        description: "Robust chain bracelet for everyday wear.",
        weight: "12gr",
        carat: "18k",
        gender: "Maschile"
    },
    {
        id: 10,
        img: px5,
        name: "Anello Zaffiro",
        price: 350,
        isBestSeller: false,
        category: "Anelli",
        description: "Gorgeous sapphire ring with gold band.",
        weight: "5gr",
        carat: "18k",
        gender: "Femminile"
    },
    {
        id: 11,
        img: px6,
        name: "Collana Perle",
        price: 210,
        isBestSeller: false,
        category: "Collane",
        description: "Traditional pearl necklace string.",
        weight: "15gr",
        carat: "N/A",
        gender: "Femminile"
    },
    {
        id: 12,
        img: px7,
        name: "Orecchini Cerchio",
        price: 120,
        isBestSeller: false,
        category: "Orecchini",
        description: "Simple gold hoop earrings.",
        weight: "3gr",
        carat: "14k",
        gender: "Femminile"
    },
    {
        id: 13,
        img: px8,
        name: "Bracciale Tennis",
        price: 550,
        isBestSeller: true,
        category: "Bracciali",
        description: "Luxury tennis bracelet with diamonds.",
        weight: "8gr",
        carat: "18k",
        gender: "Femminile"
    },
    {
        id: 14,
        img: px9,
        name: "Pendente Croce",
        price: 135,
        isBestSeller: false,
        category: "Pendente",
        description: "Gold cross pendant with detailed engraving.",
        weight: "4gr",
        carat: "18k",
        gender: "Unisex"
    },
    {
        id: 15,
        img: px10,
        name: "Anello Rubino",
        price: 420,
        isBestSeller: false,
        category: "Anelli",
        description: "Deep red ruby ring.",
        weight: "5gr",
        carat: "18k",
        gender: "Femminile"
    },
    {
        id: 16,
        img: px11,
        name: "Collana Multipla",
        price: 190,
        isBestSeller: false,
        category: "Collane",
        description: "Layered gold necklace style.",
        weight: "9gr",
        carat: "14k",
        gender: "Femminile"
    }
];

export const products: Product[] = [
    ...baseProducts,
    ...baseProducts.map(p => ({ ...p, id: p.id + 16, name: p.name + " (Copy)", isSoldOut: Math.random() > 0.8 })),
    ...baseProducts.map(p => ({ ...p, id: p.id + 32, name: p.name + " (V2)", isSoldOut: Math.random() > 0.9 })),
    ...baseProducts.map(p => ({ ...p, id: p.id + 48, name: p.name + " (V3)", price: p.price + 50 }))
];

export const reviews: Review[] = [
    {
        id: 1,
        img: r1,
        name: "Giulia Rossi",
        text: "Ho acquistato un anello per il mio anniversario e sono rimasta incantata. La qualità dell'oro è eccellente e il design è unico.",
        rating: 5
    },
    {
        id: 2,
        img: r2,
        name: "Marco Bianchi",
        text: "Servizio clienti impeccabile e spedizione velocissima. Il bracciale è arrivato in una confezione bellissima. Consigliato!",
        rating: 5
    },
    {
        id: 3,
        img: r3,
        name: "Sofia Verdi",
        text: "Gioielli che trasmettono luce ed eleganza. È diventata la mia gioielleria di fiducia per ogni regalo importante.",
        rating: 5
    },
];





