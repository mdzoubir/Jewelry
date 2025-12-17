import { Euro, Package, Users, Truck } from "lucide-react";
import type { Order, Product } from "../types/adminTypes";

export const stats = [
  {
    title: "Entrate Totali",
    value: "€54.980",
    change: "24,5%",
    isPositive: true,
    icon: <Euro className="w-5 h-5" />,
    dateRange: "Dal 01 Gen - 30 Gen 2025",
  },
  {
    title: "Ordini Oggi",
    value: "453",
    change: "21,5%",
    isPositive: true,
    icon: <Package className="w-5 h-5" />,
    dateRange: "Dal 01 Gen - 30 Gen 2025",
  },
  {
    title: "Cliente Attivo",
    value: "1.978",
    change: "21,5%",
    isPositive: true,
    icon: <Users className="w-5 h-5" />,
    dateRange: "Dal 01 Gen - 30 Gen 2025",
  },
  {
    title: "Spedizione in Attesa",
    value: "32",
    change: "9,5%",
    isPositive: false,
    icon: <Truck className="w-5 h-5" />,
    dateRange: "Dal 01 Gen - 30 Gen 2025",
  },
];

export const recentOrders: Order[] = [
  {
    id: "#1234",
    items: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=50&h=50&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=50&h=50&fit=crop",
    ],
    amount: "€500.00",
    date: "8 Ott 2025",
    status: "Completato",
  },
  {
    id: "#1234",
    items: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=50&h=50&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=50&h=50&fit=crop",
    ],
    amount: "€500.00",
    date: "8 Ott 2025",
    status: "Annulla",
  },
  {
    id: "#1234",
    items: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=50&h=50&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=50&h=50&fit=crop",
    ],
    amount: "€500.00",
    date: "8 Ott 2025",
    status: "In corso",
  },
  {
    id: "#1234",
    items: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=50&h=50&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=50&h=50&fit=crop",
    ],
    amount: "€500.00",
    date: "8 Ott 2025",
    status: "Annulla",
  },
  {
    id: "#1234",
    items: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=50&h=50&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=50&h=50&fit=crop",
    ],
    amount: "€500.00",
    date: "8 Ott 2025",
    status: "In corso",
  },
];

export const topProducts: Product[] = [
  {
    name: "La Bead della Promessa",
    reviews: "27 review",
    price: "€2,840.00",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&h=100&fit=crop",
  },
  {
    name: "Cerchio dell'Anima",
    reviews: "27 review",
    price: "€1,590.00",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&h=100&fit=crop",
  },
  {
    name: "La Gemma Imperiale",
    reviews: "127 review",
    price: "€7,940.00",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop",
  },
  {
    name: "Eredità Dorata",
    reviews: "37 review",
    price: "€2,940.00",
    image: "/jewelry4.jpg",
  },
  {
    name: "Il Loop Regalo",
    reviews: "27 review",
    price: "€2,940.00",
    image: "/jewelry5.jpg",
  },
];
