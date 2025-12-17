import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Eye,
} from "lucide-react";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface AdminTableProps {
  title: string;
  description: string;
  searchPlaceholder: string;
  addButtonText: string;
  columns: Column[];
  data: any[];
  onAdd?: () => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
  customActions?: (row: any) => React.ReactNode;
  showActions?: boolean;
  showViewAction?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

function AdminTable({
  title,
  description,
  searchPlaceholder,
  addButtonText,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  onView,
  customActions,
  showActions = true,
  showViewAction = false,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
}: AdminTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: string) => {
    const statusColors: { [key: string]: string } = {
      Attivo: "bg-green-100 text-green-700",
      Inattivo: "bg-orange-100 text-orange-700",
      Completato: "bg-green-100 text-green-700",
      Annulla: "bg-orange-100 text-orange-700",
      "In corso": "bg-yellow-100 text-yellow-700",
      Scaduto: "bg-red-100 text-red-700",
      Riuscito: "bg-green-100 text-green-700",
      Fallito: "bg-orange-100 text-orange-700",
      "In Attesa": "bg-yellow-100 text-yellow-700",
    };

    return (
      <span
        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
          statusColors[status] || "bg-gray-100 text-gray-700"
        }`}
      >
        {status}
      </span>
    );
  };

  const renderPaginationButtons = () => {
    const pages = [];
    const maxVisible = 3;

    // Always show first page
    pages.push(
      <button
        key={1}
        onClick={() => onPageChange?.(1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-sm rounded ${
          currentPage === 1
            ? "bg-gray-200 text-gray-900"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        1
      </button>
    );

    // Show ellipsis if needed
    if (currentPage > maxVisible) {
      pages.push(
        <span key="ellipsis-start" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange?.(i)}
          className={`px-3 py-1 text-sm rounded ${
            currentPage === i
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - maxVisible + 1) {
      pages.push(
        <span key="ellipsis-end" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange?.(totalPages)}
          className={`px-3 py-1 text-sm rounded ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 text-[#57534F]">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>

      {/* Search and Actions Bar */}
      <div className="mb-6 flex justify-between items-center gap-4">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A89472] focus:border-transparent"
          />
        </div>

        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-[#746F6A] font-medium hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filtra per
          </button>

          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-[#746F6A] font-medium focus:outline-none focus:ring-2 focus:ring-[#A89472] focus:border-transparent">
            <option>7 Giorni</option>
            <option>30 Giorni</option>
            <option>90 Giorni</option>
          </select>

          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-2 bg-[#A89472] text-white rounded-lg text-sm font-medium hover:bg-[#9A8566] transition-colors"
            >
              <Plus className="w-4 h-4" />
              {addButtonText}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F2F1F0] text-[#79766F] font-medium">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-sm tracking-wider"
                >
                  <div className="flex gap-1 items-center">
                    <span>{column.label}</span>
                    {column.sortable && <ChevronsUpDown size={16} />}
                  </div>
                </th>
              ))}
              {showActions && (
                <th className="px-6 py-3 text-left text-sm tracking-wider">
                  Azione
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4">
                    {column.render ? (
                      column.render(row[column.key], row)
                    ) : column.key === "status" ? (
                      getStatusBadge(row[column.key])
                    ) : (
                      <div className="text-sm text-[#746F6A]">
                        {row[column.key]}
                      </div>
                    )}
                  </td>
                ))}
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {customActions ? (
                        customActions(row)
                      ) : (
                        <>
                          {showViewAction && onView && (
                            <button
                              onClick={() => onView(row.id)}
                              className="text-[#79766F] hover:text-gray-600 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          {onEdit && (
                            <button
                              onClick={() => onEdit(row.id)}
                              className="text-[#79766F] hover:text-gray-600 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(row.id)}
                              className="text-[#79766F] hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm items-center font-semibold flex gap-1 text-[#57534F]">
            <span>
              Mostrando {totalItems > 0 ? "1" : "0"} di {totalItems}
            </span>
            <ChevronsUpDown size={16} />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderPaginationButtons()}
            </div>

            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-4 py-2 bg-[#A89472] text-white rounded-lg text-sm hover:bg-[#9A8566] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Precedente
              </button>
              <button
                onClick={() =>
                  onPageChange?.(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-4 py-2 bg-[#A89472] text-white rounded-lg text-sm hover:bg-[#9A8566] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Successivo
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTable;
