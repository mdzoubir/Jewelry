import AdminTable from "../../admin/table/AdminTable";

interface Role {
  id: number;
  name: string;
  description: string;
  status: "Attivo" | "Inattivo";
}

function SettingPermissions() {
  const roles: Role[] = [
    {
      id: 1,
      name: "Responsabile prodotto",
      description: "Carica nuovi articoli in oro con tutti i dettagli",
      status: "Attivo",
    },
    {
      id: 2,
      name: "Responsabile promozioni e sconti",
      description: "Può creare, modificare o eliminare promozioni",
      status: "Inattivo",
    },
    {
      id: 3,
      name: "Responsabile ordini",
      description: "Può visualizzare, aggiornare e gestire tutti gli ordi...",
      status: "Attivo",
    },
    {
      id: 4,
      name: "Responsabile prodotto",
      description: "Pubblica o Annulla la pubblicazione dei prodotti",
      status: "Inattivo",
    },
    {
      id: 5,
      name: "Responsabile categoria",
      description: "Può caricare una nuova categoria",
      status: "Attivo",
    },
  ];

  const columns = [
    {
      key: "name",
      label: "Ruolo",
      render: (value: string) => (
        <div className="text-sm text-[#746F6A]">{value}</div>
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
      key: "status",
      label: "Stato",
      sortable: true,
    },
  ];

  const handleAdd = () => {
    console.log("Add new role");
  };

  const handleEdit = (id: number) => {
    console.log("Edit role:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete role:", id);
  };

  const handlePageChange = (page: number) => {
    console.log("Change to page:", page);
  };

  return (
    <AdminTable
      title="Permessi dei ruoli"
      description="Gestisci e aggiorna i ruoli e i permessi degli amministratori per la gestione del tuo negozio"
      searchPlaceholder="Cerca Permesso Di Ruolo..."
      addButtonText="Aggiungi Nuovo Ruolo"
      columns={columns}
      data={roles}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      currentPage={3}
      totalPages={14}
      totalItems={5}
      onPageChange={handlePageChange}
    />
  );
}

export default SettingPermissions;
