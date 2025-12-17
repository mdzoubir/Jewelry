import { Search, Bell } from 'lucide-react';

function AdminHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Search Bar & Notification */}
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cerca Qualsiasi Cosa..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C9B997] focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Notification Bell */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Right Section - User Profile */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <img src="https://i.pravatar.cc/40" alt="Admin Avatar" className="w-10 h-10 rounded-full border-2 border-white" />
          </div>
          <div className="text-start">
            <p className="text-sm font-medium text-gray-900">SeifEdge Solutions</p>
            <p className="text-xs text-gray-500">edgeseif@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;