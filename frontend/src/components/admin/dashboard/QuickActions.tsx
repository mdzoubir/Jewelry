import {
  ShoppingCart,
  BarChart,
  Settings,
  Plus,
  Users,
  Image,
} from "lucide-react";

function QuickActions() {
  const quickActions = [
    { title: "Aggiungi Amministratore", icon: Plus },
    { title: "Visualizza Ordine", icon: ShoppingCart },
    { title: "Gestisce Categorie", icon: Users },
    { title: "Visualizza Analisi", icon: BarChart },
    { title: "Cerca Prodotto", icon: Image },
    { title: "Impostazioni", icon: Settings },
  ];

  return (
    <div className="bg-white rounded-lg shadow  p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Azioni Veloci
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 font-bold text-[#57534F]">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 bg-[#A89472] text-white rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs text-gray-700 text-center">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;
