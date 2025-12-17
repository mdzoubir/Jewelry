import { FileDown } from "lucide-react";
import AdminTable from "../../components/admin/table/AdminTable";
import PrimaryButton from "../../components/ui/admin/PrimaryButton";

interface Client {
  id: number;
  clientId: string;
  name: string;
  email: string;
  date: string;
  status: "Attivo" | "Inattivo";
}

function AdminClients() {
  const clients: Client[] = [
    {
      id: 1,
      clientId: "#1234",
      name: "Obinna Taofeek",
      email: "olakunlee899@gmail.com",
      date: "8 ott 2025",
      status: "Attivo",
    },
    {
      id: 2,
      clientId: "#1234",
      name: "Obinna Taofeek",
      email: "olakunlee899@gmail.com",
      date: "8 ott 2025",
      status: "Inattivo",
    },
    {
      id: 3,
      clientId: "#1234",
      name: "Obinna Taofeek",
      email: "olakunlee899@gmail.com",
      date: "8 ott 2025",
      status: "Attivo",
    },
    {
      id: 4,
      clientId: "#1234",
      name: "Obinna Taofeek",
      email: "olakunlee899@gmail.com",
      date: "8 ott 2025",
      status: "Inattivo",
    },
    {
      id: 5,
      clientId: "#1234",
      name: "Obinna Taofeek",
      email: "olakunlee899@gmail.com",
      date: "8 ott 2025",
      status: "Attivo",
    },
  ];

  const columns = [
    {
      key: "clientId",
      label: "ID",
      render: (value: string) => (
        <div className="text-sm text-[#746F6A]">{value}</div>
      ),
    },
    {
      key: "name",
      label: "Nome del cliente",
      render: (value: string, row: Client) => (
        <div>
          <div className="text-sm font-medium text-[#746F6A]">{value}</div>
          <div className="text-xs text-[#79766F]">{row.email}</div>
        </div>
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
    console.log("Edit client:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete client:", id);
  };

  const handlePageChange = (page: number) => {
    console.log("Change to page:", page);
  };

  const handleExport = () => {
    console.log("Export clients");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Custom Header */}
      <div className="p-6 pb-0">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#57534F] mb-1">
              Gestione Clienti
            </h1>
            <p className="text-sm text-[#79766F]">Oltre 5000 Clienti</p>
          </div>
          <div onClick={handleExport}>
            <PrimaryButton
              text="Esporta cliente come file Excel o PDF"
              icon={<FileDown className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <AdminTable
        title=""
        description=""
        searchPlaceholder="Cerca Il Cliente Per Nome..."
        addButtonText=""
        columns={columns}
        data={clients}
        onEdit={handleEdit}
        onDelete={handleDelete}
        currentPage={3}
        totalPages={14}
        totalItems={5}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AdminClients;
