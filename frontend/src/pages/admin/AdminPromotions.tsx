import AdminTable from "../../components/admin/table/AdminTable";

interface Promotion {
  id: number;
  code: string;
  description: string;
  discount: string;
  startDate: string;
  endDate: string;
  status: "Attivo" | "Inattivo" | "Scaduto";
}

function AdminPromotions() {
  const promotions: Promotion[] = [
    {
      id: 1,
      code: "SUMMER2025",
      description: "Sconto estivo per tutti i prodotti in oro",
      discount: "20%",
      startDate: "01 Giu 2025",
      endDate: "31 Ago 2025",
      status: "Attivo",
    },
    {
      id: 2,
      code: "WINTER2024",
      description: "Promozione invernale su anelli e braccialetti",
      discount: "15%",
      startDate: "01 Dic 2024",
      endDate: "28 Feb 2025",
      status: "Scaduto",
    },
    {
      id: 3,
      code: "NEWCLIENT",
      description: "Sconto per i nuovi clienti",
      discount: "10%",
      startDate: "01 Gen 2025",
      endDate: "31 Dic 2025",
      status: "Attivo",
    },
    {
      id: 4,
      code: "VIP50",
      description: "Sconto esclusivo per clienti VIP",
      discount: "50%",
      startDate: "01 Mar 2025",
      endDate: "30 Apr 2025",
      status: "Inattivo",
    },
    {
      id: 5,
      code: "EASTER2025",
      description: "Promozione Pasquale",
      discount: "25%",
      startDate: "10 Apr 2025",
      endDate: "20 Apr 2025",
      status: "Scaduto",
    },
  ];

  const columns = [
    {
      key: "code",
      label: "Codice",
      render: (value: string) => (
        <div className="text-sm font-medium text-[#746F6A]">{value}</div>
      ),
    },
    {
      key: "description",
      label: "Descrizione",
      render: (value: string) => (
        <div className="text-sm text-[#79766F]">{value}</div>
      ),
    },
    {
      key: "discount",
      label: "Sconto",
      render: (value: string) => (
        <div className="text-sm font-semibold text-[#746F6A]">{value}</div>
      ),
    },
    {
      key: "startDate",
      label: "Data Inizio",
      render: (value: string) => (
        <div className="text-sm text-[#79766F]">{value}</div>
      ),
    },
    {
      key: "endDate",
      label: "Data Fine",
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
    console.log("Add new promotion");
  };

  const handleEdit = (id: number) => {
    console.log("Edit promotion:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete promotion:", id);
  };

  const handlePageChange = (page: number) => {
    console.log("Change to page:", page);
  };

  return (
    <AdminTable
      title="Promozioni e Sconti"
      description="Gestisci tutte le promozioni e gli sconti per i tuoi clienti"
      searchPlaceholder="Cerca Promozione..."
      addButtonText="Aggiungi Nuova Promozione"
      columns={columns}
      data={promotions}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      currentPage={1}
      totalPages={3}
      totalItems={5}
      onPageChange={handlePageChange}
    />
  );
}

export default AdminPromotions;
