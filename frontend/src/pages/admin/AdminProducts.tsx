import { FileDown, Plus, Eye } from "lucide-react";
import AdminTable from "../../components/admin/table/AdminTable";
import PrimaryButton from "../../components/ui/admin/PrimaryButton";

interface Product {
  id: number;
  productId: string;
  name: string;
  image: string;
  category: string;
  price: string;
  date: string;
  stock: number | string;
  status: "Attivo" | "Inattivo";
}

function AdminProducts() {
  const products: Product[] = [
    {
      id: 1,
      productId: "#1234",
      name: "Anello in Moissanite",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&h=100&fit=crop",
      category: "Compleanno",
      price: "€5000,00",
      date: "8 ott 2025",
      stock: 12,
      status: "Attivo",
    },
    {
      id: 2,
      productId: "#1234",
      name: "Collana in Moissanite",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&h=100&fit=crop",
      category: "Battesimo",
      price: "€5000,00",
      date: "8 ott 2025",
      stock: 5,
      status: "Inattivo",
    },
    {
      id: 3,
      productId: "#1234",
      name: "Anello in Moissanite",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&h=100&fit=crop",
      category: "Matrimonio",
      price: "€5000,00",
      date: "8 ott 2025",
      stock: 34,
      status: "Attivo",
    },
    {
      id: 4,
      productId: "#1234",
      name: "Collana in Moissanite",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop",
      category: "Compleanno",
      price: "€5000,00",
      date: "8 ott 2025",
      stock: "-",
      status: "Inattivo",
    },
    {
      id: 5,
      productId: "#1234",
      name: "Bracciali in oro",
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&h=100&fit=crop",
      category: "Matrimonio",
      price: "€5000,00",
      date: "8 ott 2025",
      stock: 12,
      status: "Attivo",
    },
  ];

  const columns = [
    {
      key: "productId",
      label: "ID",
      render: (value: string) => (
        <div className="text-sm text-[#746F6A]">{value}</div>
      ),
    },
    {
      key: "name",
      label: "Nome del prodotto",
      render: (value: string, row: Product) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt={value}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-sm font-medium text-[#746F6A]">{value}</div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Categoria di Prodotto",
      render: (value: string) => (
        <div className="text-sm text-[#79766F]">{value}</div>
      ),
    },
    {
      key: "price",
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
      key: "stock",
      label: "Scorte",
      render: (value: number | string) => (
        <div className="text-sm text-[#746F6A]">{value}</div>
      ),
    },
    {
      key: "status",
      label: "Stato",
      sortable: true,
    },
  ];

  const handleEdit = (id: number) => {
    console.log("Edit product:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete product:", id);
  };

  const handleView = (id: number) => {
    console.log("View product:", id);
  };

  const handlePageChange = (page: number) => {
    console.log("Change to page:", page);
  };

  const handleExport = () => {
    console.log("Export products");
  };

  const handleAdd = () => {
    console.log("Add new product");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Custom Header */}
      <div className="p-6 pb-0">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#57534F] mb-3">
              Gestione Del Prodotto
            </h1>
            <div className="flex gap-6 text-sm text-[#79766F]">
              <span>4500+ Prodotti Disponibili</span>
              <span>29+ Prodotti Haiden</span>
              <span>32+ Prodotti Non Acquistati</span>
            </div>
          </div>
          <div className="flex gap-3">
            <div onClick={handleExport}>
              <PrimaryButton
                text="Esporta prodotto come file Excel o PDF"
                icon={<FileDown className="w-4 h-4" />}
              />
            </div>
            <div onClick={handleAdd}>
              <PrimaryButton
                text="Aggiungi Nuovo Prodotto"
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
        searchPlaceholder="Cerca Prodotto..."
        addButtonText=""
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        customActions={(row) => (
          <button
            onClick={() => handleView(row.id)}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Visualizza"
          >
            <Eye className="w-4 h-4 text-[#79766F]" />
          </button>
        )}
        currentPage={3}
        totalPages={14}
        totalItems={5}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AdminProducts;
