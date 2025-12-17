import {
  FileDown,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import AdminTable from "../../components/admin/table/AdminTable";
import { StatCard } from "../../components/admin/dashboard/statCard";

interface Payment {
  id: number;
  orderId: string;
  customerName: string;
  customerEmail: string;
  transactionId: string;
  method: string;
  amount: string;
  date: string;
  status: "Riuscito" | "Fallito" | "In Attesa";
}

function AdminPayments() {
  const stats = [
    {
      title: "Transazione Totale",
      value: "4547",
      change: "24,5%",
      isPositive: true,
      icon: <CreditCard className="w-5 h-5" />,
      dateRange: "Dal 01 Gennaio al 30 Gennaio 2025",
    },
    {
      title: "Totale Riuscito",
      value: "453",
      change: "21,5%",
      isPositive: true,
      icon: <CheckCircle className="w-5 h-5" />,
      dateRange: "Dal 01 Gennaio al 30 Gennaio 2025",
    },
    {
      title: "Totale In Sospeso",
      value: "436",
      change: "12,5%",
      isPositive: true,
      icon: <Clock className="w-5 h-5" />,
      dateRange: "Dal 01 Gennaio al 30 Gennaio 2025",
    },
    {
      title: "Totale Fallito",
      value: "45",
      change: "9,5%",
      isPositive: false,
      icon: <XCircle className="w-5 h-5" />,
      dateRange: "Dal 01 Gennaio al 30 Gennaio 2025",
    },
  ];

  const payments: Payment[] = [
    {
      id: 1,
      orderId: "#1234",
      customerName: "Obinna Taofeek",
      customerEmail: "olakunlee899@gmail...",
      transactionId: "3K43JXM34IM3X...",
      method: "Bonifico Bancario",
      amount: "€5000,00",
      date: "8 Ott 2025",
      status: "Riuscito",
    },
    {
      id: 2,
      orderId: "#1234",
      customerName: "Obinna Taofeek",
      customerEmail: "olakunlee899@gmail...",
      transactionId: "3K43JXM34IM3X...",
      method: "Pagamento con Carta",
      amount: "€5000,00",
      date: "8 Ott 2025",
      status: "Fallito",
    },
    {
      id: 3,
      orderId: "#1234",
      customerName: "Obinna Taofeek",
      customerEmail: "olakunlee899@gmail...",
      transactionId: "3K43JXM34IM3X...",
      method: "Bonifico Bancario",
      amount: "€5000,00",
      date: "8 Ott 2025",
      status: "Riuscito",
    },
    {
      id: 4,
      orderId: "#1234",
      customerName: "Obinna Taofeek",
      customerEmail: "olakunlee899@gmail...",
      transactionId: "3K43JXM34IM3X...",
      method: "Pagamento con Carta",
      amount: "€5000,00",
      date: "8 Ott 2025",
      status: "Fallito",
    },
    {
      id: 5,
      orderId: "#1234",
      customerName: "Obinna Taofeek",
      customerEmail: "olakunlee899@gmail...",
      transactionId: "3K43JXM34IM3X...",
      method: "Bonifico Bancario",
      amount: "€5000,00",
      date: "8 Ott 2025",
      status: "In Attesa",
    },
  ];

  const columns = [
    {
      key: "orderId",
      label: "ID Ordine",
      render: (value: string) => (
        <div className="text-sm text-[#746F6A]">{value}</div>
      ),
    },
    {
      key: "customerName",
      label: "Nome Cliente",
      render: (value: string, row: Payment) => (
        <div>
          <div className="text-sm font-medium text-[#746F6A]">{value}</div>
          <div className="text-xs text-[#79766F]">{row.customerEmail}</div>
        </div>
      ),
    },
    {
      key: "transactionId",
      label: "ID Transazione",
      render: (value: string) => (
        <div className="text-sm text-[#79766F]">{value}</div>
      ),
    },
    {
      key: "method",
      label: "Metodo",
      render: (value: string) => (
        <div className="text-sm text-[#79766F]">{value}</div>
      ),
    },
    {
      key: "amount",
      label: "Importo",
      render: (value: string) => (
        <div className="text-sm font-semibold text-[#746F6A]">{value}</div>
      ),
    },
    {
      key: "date",
      label: "Data",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-[#79766F]">{value}</div>
      ),
    },
    {
      key: "status",
      label: "Stato",
      sortable: true,
    },
  ];

  const handleView = (id: number) => {
    console.log("View payment:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete payment:", id);
  };

  const handlePageChange = (page: number) => {
    console.log("Change to page:", page);
  };

  const handleExport = () => {
    console.log("Export payments");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Export Button */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Pagamento E Transazione
        </h1>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-[#A89472] text-white rounded-lg text-sm font-medium hover:bg-[#9A8566] transition-colors"
        >
          <FileDown className="w-4 h-4" />
          Esporta il pagamento come file Excel o PDF
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Table */}
      <AdminTable
        title=""
        description=""
        searchPlaceholder="Cerca Qualsiasi Cosa..."
        addButtonText=""
        columns={columns}
        data={payments}
        onView={handleView}
        onDelete={handleDelete}
        showViewAction={true}
        currentPage={3}
        totalPages={14}
        totalItems={5}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AdminPayments;
