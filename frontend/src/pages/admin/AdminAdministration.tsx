import { FileDown, Plus } from "lucide-react";
import AdminTable from "../../components/admin/table/AdminTable";
import PrimaryButton from "../../components/ui/admin/PrimaryButton";

interface Administrator {
  id: number;
  adminId: string;
  name: string;
  email: string;
  role: string;
  date: string;
  status: "Attivo" | "Inattivo";
}

function AdminAdministration() {
  const administrators: Administrator[] = [
    {
      id: 1,
      adminId: "#1234",
      name: "Obinna Taofeek",
      email: "olakunlee899@gmail.com",
      role: "Gestione Ordini",
      date: "8 Ott 2025",
      status: "Attivo",
    },
    {
      id: 2,
      adminId: "#1234",
      name: "Obinna Taofeek",
      email: "olakunlee899@gmail.com",
      role: "Gestione Prodotti",
      date: "8 Ott 2025",
      status: "Inattivo",
    },
    {
      id: 3,
      adminId: "#1234",
      name: "Obinna Taofeek",
      email: "olakunlee899@gmail.com",
      role: "Panoramica Dashboard",
      date: "8 Ott 2025",
      status: "Attivo",
    },
    {
      id: 4,
      adminId: "#1234",
      name: "Obinna Taofeek",
      email: "olakunlee899@gmail.com",
      role: "Pagamento e Transazione",
      date: "8 Ott 2025",
      status: "Inattivo",
    },
    {
      id: 5,
      adminId: "#1234",
      name: "Obinna Taofeek",
      email: "olakunlee899@gmail.com",
      role: "Gestione Clienti",
      date: "8 Ott 2025",
      status: "Attivo",
    },
  ];

  const columns = [
    {
      key: "adminId",
      label: "ID",
      render: (value: string) => (
        <div className="text-sm text-[#746F6A]">{value}</div>
      ),
    },
    {
      key: "name",
      label: "Nome Admin",
      render: (value: string, row: Administrator) => (
        <div>
          <div className="text-sm font-medium text-[#746F6A]">{value}</div>
          <div className="text-xs text-[#79766F]">{row.email}</div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Ruoli",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-[#79766F]">{value}</div>
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

  const handleAdd = () => {
    console.log("Add new administrator");
  };

  const handleEdit = (id: number) => {
    console.log("Edit administrator:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete administrator:", id);
  };

  const handleView = (id: number) => {
    console.log("View administrator:", id);
  };

  const handlePageChange = (page: number) => {
    console.log("Change to page:", page);
  };

  const handleExport = () => {
    console.log("Export administrators");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Custom Header */}
      <div className="p-6 pb-0">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#57534F] mb-1">
              Gestione Amministrativa
            </h1>
            <p className="text-sm text-[#79766F]">10+ Amministratori</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-lg text-sm text-[#746F6A] font-medium hover:bg-gray-50 transition-colors"
            >
              <FileDown className="w-4 h-4" />
              Esporta Admin come file Excel o PDF
            </button>
            <div onClick={handleAdd}>
              <PrimaryButton
                text="Aggiungi Nuovo Amministratore"
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
        searchPlaceholder="Cerca L'amministratore Per Nome..."
        addButtonText=""
        columns={columns}
        data={administrators}
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

export default AdminAdministration;
