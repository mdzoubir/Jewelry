import {
  Clock,
  Edit,
  FileDown,
  Globe,
  MapPin,
  Phone,
} from "lucide-react";
import { stats } from "../../data/adminMockData";
import { StatCard } from "../../components/admin/dashboard/statCard";
import QuickActions from "../../components/admin/dashboard/QuickActions";
import RecentOrders from "../../components/admin/dashboard/RecentOrders";
import bg_hero from "../../assets/images/hero/hero_bg.jpg";
import PrimaryButton from "../../components/ui/admin/PrimaryButton";

function Dashboard() {


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with Date Picker and Export */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#57534F]">
            Panoramica Del Dashboard,
          </h1>
          <p className="text-sm text-[#57534F]">Bentornato Domenico</p>
        </div>
        <div className="flex items-center gap-4">
          <select className="border font-medium text-[#746F6A] border-[#EAE8E3] shadow-[6px_8px_10px_-1px_rgba(0,_0,_0,_0.1)] rounded-lg px-4 py-2 text-sm">
            <option>30 Days</option>
            <option>60 Days</option>
            <option>90 Days</option>
          </select>
          <PrimaryButton text="Esporta panoramica come file Excel o PDF" icon={<FileDown className="w-4 h-4" />} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <RecentOrders />

      {/* Three Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white border-gray-200 border text-white rounded-lg shadow-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#A89472] rounded-lg flex items-center justify-center text-2xl font-bold">
            10
          </div>
          <div className="text-[#57534F]">
            <p className="text-sm opacity-90">Disponibilità</p>
            <p className="font-semibold">Prodotti Attivi</p>
          </div>
        </div>
        <div className="bg-white border-gray-200 borde text-white rounded-lg shadow-xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#A89472] rounded-lg flex items-center justify-center text-2xl font-bold">
            2
          </div>
          <div className="text-[#57534F]">
            <p className="text-sm opacity-90">Scorte Basse</p>
            <p className="font-semibold">Necessita di Rifornimento</p>
          </div>
        </div>
        <div className="bg-white border-gray-200 borde text-white rounded-lg shadow-xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#A89472] rounded-lg flex items-center justify-center text-2xl font-bold">
            1
          </div>
          <div className="text-[#57534F]">
            <p className="text-sm opacity-90">Favorite</p>
            <p className="font-semibold">Azione Urgente</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Featured Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Sezione Ero...
              </h2>
              <button className="text-sm text-[#746F6A] font-medium hover:underline flex items-center gap-1">
                <Edit className="w-4 h-4" />
                Modifica
              </button>
            </div>
            <div className="mb-4">
              <img
                src={bg_hero}
                alt="Jewelry"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="font-medium text-[#57534F]">
              <p className="text-sm font-bold  mb-2">Titolo</p>
              <p className="text-xs  mb-3">
                Naturale con l'Oro Oro
              </p>
              <p className="text-sm font-bold  mb-2">
                Sottotitolo
              </p>
              <p className="text-xs  mb-3">
                Anelli/Oro che esprimono la vera
              </p>
              <div className="flex items-center font-medium gap-2 ">
                <Clock size={15} />
                <span className="text-xs">Ultimo aggiornamento 2 giorni fa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Informazioni di co...
              </h2>
              <button className="text-sm text-[#746F6A] hover:underline flex items-center gap-1">
                <Edit className="w-4 h-4" />
                Modifica
              </button>
            </div>
            <div className="space-y-4 text-[#57534F]">
              <div className="flex items-start gap-3 ">
                <MapPin size={20} />
                <div>
                  <p className="text-sm font-medium ">Indirizzo</p>
                  <p className="text-sm ">
                    Via Roma 123, Milano, Italia
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} />
                <div>
                  <p className="text-sm font-medium ">Telefono</p>
                  <p className="text-sm ">+39 02 1234 5678</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe size={20} />
                <div>
                  <p className="text-sm font-medium ">Email</p>
                  <p className="text-sm ">contatto@myaoro.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} />
                <div>
                  <p className="text-sm font-medium ">
                    Orari di apertura
                  </p>
                  <p className="text-sm ">
                    Lun-Ven: 9:00-18:00, Sab: 9:00-14:00
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <Clock size={15} />
                <div>
                  <p className="text-xs font-medium">
                    Ultimo aggiornamento 2 giorni fa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}

export default Dashboard;
