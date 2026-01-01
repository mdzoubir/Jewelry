import { FileDown, Plus } from "lucide-react";
import AdminTable from "../../components/admin/table/AdminTable";
import PrimaryButton from "../../components/ui/admin/PrimaryButton";

interface Order {
  id: number;
  orderId: string;
  customerName: string;
  customerEmail: string;
  products: string[];
  amount: string;
  date: string;
  status: "Completato" | "In corso" | "Annulla";
}

function AdminOrders() {
  const orders: Order[] = [
    {
      id: 1,
      orderId: "#1234",
      customerName: "Obinna Taofeek",
      customerEmail: "olakunlee899@gmail.com",
      products: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=50&h=50&fit=crop",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=50&h=50&fit=crop",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=50&h=50&fit=crop",
      ],
      amount: "€5000,00",
      date: "8 ott 2025",
      status: "Completato",
    },
    {
      id: 2,
      orderId: "#1234",
      customerName: "Obinna Taofeek",
      customerEmail: "olakunlee899@gmail.com",
      products: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=50&h=50&fit=crop",
      ],
      amount: "€5000,00",
      date: "8 ott 2025",
      status: "Completato",
    },
    {
      id: 3,
      orderId: "#1234",
      customerName: "Obinna Taofeek",
      customerEmail: "olakunlee899@gmail.com",
      products: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=50&h=50&fit=crop",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=50&h=50&fit=crop",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=50&h=50&fit=crop",
      ],
      amount: "€5000,00",
      date: "8 ott 2025",
      status: "In corso",
    },
    {
      id: 4,
      orderId: "#1234",
      customerName: "Obinna Taofeek",
      customerEmail: "olakunlee899@gmail.com",
      products: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=50&h=50&fit=crop",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=50&h=50&fit=crop",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=50&h=50&fit=crop",
      ],
      amount: "€5000,00",
      date: "8 ott 2025",
      status: "Annulla",
    },
    {
      id: 5,
      orderId: "#1234",
      customerName: "Obinna Taofeek",
      customerEmail: "olakunlee899@gmail.com",
      products: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=50&h=50&fit=crop",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=50&h=50&fit=crop",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=50&h=50&fit=crop",
      ],
      amount: "€5000,00",
      date: "8 ott 2025",
      status: "In corso",
    },
  ];

  const columns = [
    {
      key: "orderId",
      label: "ID",
      render: (value: string) => (
        <div className="text-sm text-[#746F6A]">{value}</div>
      ),
    },
    {
      key: "customerName",
      label: "Nome del cliente",
      render: (value: string, row: Order) => (
        <div>
          <div className="text-sm font-medium text-[#746F6A]">{value}</div>
          <div className="text-xs text-[#79766F]">{row.customerEmail}</div>
        </div>
      ),
    },
    {
      key: "products",
      label: "Prodotto",
      render: (value: string[]) => (
        <div className="flex items-center justify-center -space-x-2">
          {value.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Product"
              className="w-8 h-8 rounded-full object-cover"
            />
          ))}
        </div>
      ),
    },
    {
      key: "amount",
      label: "Importo",
      render: (value: string) => (
        <div className="text-sm font-medium text-[#746F6A]">{value}</div>
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

  const handleEdit = (id: number) => {

  };

  const handleDelete = (id: number) => {

  };

  const handleView = (id: number) => {

  };

  const handlePageChange = (page: number) => {

  };

  const handleExport = () => {

  };

  const handleAdd = () => {

  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Custom Header */}
      <div className="p-6 pb-0">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#57534F]">Gestione Ordini</h1>
          <div className="flex gap-3">
            <div onClick={handleExport}>
              <PrimaryButton
                text="Esporta l'ordine come file Excel or PDF"
                icon={<FileDown className="w-4 h-4" />}
              />
            </div>
            <div onClick={handleAdd}>
              <PrimaryButton
                text="Aggiungi nuovo Ordine"
                icon={<Plus className="w-4 h-4" />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <AdminTable
        title=""
        description=""
        searchPlaceholder="Cerca L'elenco Degli Ordini..."
        addButtonText=""
        columns={columns}
        data={orders}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        showViewAction={true}
        currentPage={3}
        totalPages={14}
        totalItems={5}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AdminOrders;
