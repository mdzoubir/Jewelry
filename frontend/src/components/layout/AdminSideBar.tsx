import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/ui/logo.png';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  UserCog, 
  FolderTree, 
  CreditCard, 
  Tag, 
  Settings, 
  Store, 
  LogOut 
} from 'lucide-react';

function AdminSideBar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Cruscotto', path: '/admin', icon: LayoutDashboard },
    { name: 'Gestione Ordini', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Gestione Prodotti', path: '/admin/products', icon: Package },
    { name: 'Gestione Clienti', path: '/admin/clients', icon: Users },
    { name: 'Gestione Amministrativa', path: '/admin/administration', icon: UserCog },
    { name: 'Gestione Categorie', path: '/admin/categories', icon: FolderTree },
    { name: 'Pagamenti E Transazioni', path: '/admin/payments', icon: CreditCard },
    { name: 'Promozione E Sconto', path: '/admin/promotions', icon: Tag },
    { name: 'Impostazioni', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-[#E8E0D5] h-screen flex flex-col font-medium">
      {/* Logo Section */}
      <div className="p-6 border-b border-[#D4C5B0]">
        <img
          src={logo}
          alt="Admin Logo"
          className="w-full h-auto"
        />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-6 py-2 text-sm transition-colors m-2
                ${active 
                  ? 'bg-[#A89472] text-white font-medium rounded-lg' 
                  : 'text-[#57534F] hover:bg-[#DDD4C7]'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="border-t border-[#D4C5B0] py-4">
        <Link
          to="/"
          className="flex items-center gap-3 px-6 py-3 text-sm text-[#57534F] hover:bg-[#DDD4C7] transition-colors"
        >
          <Store className="w-4 h-4" />
          <span>Visita Negozio</span>
        </Link>
        <button
          onClick={() => {
            // Handle logout logic here
            console.log('Logout clicked');
          }}
          className="w-full flex items-center gap-3 px-6 py-3 text-sm text-[#57534F] hover:bg-[#DDD4C7] transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Disconnetti</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSideBar;