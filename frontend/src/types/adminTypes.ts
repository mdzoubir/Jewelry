
export interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  dateRange: string;
}


export interface Order {
  id: string;
  items: string[];
  amount: string;
  date: string;
  status: "Completato" | "Annulla" | "In corso";
}

export interface Product {
  name: string;
  reviews: string;
  price: string;
  image: string;
}