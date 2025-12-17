import { useState } from "react";
import {
  Plus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
} from "lucide-react";
import PrimaryButton from "../../components/ui/admin/PrimaryButton";

interface Category {
  id: number;
  name: string;
  subcategoryCount: number;
  image: string;
}

function AdminCategories() {
  const [currentPage, setCurrentPage] = useState(3);
  const totalPages = 14;
  const totalItems = 5;

  const categories: Category[] = [
    {
      id: 1,
      name: "Categoria Compleanno",
      subcategoryCount: 10,
      image:
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Categoria Anniversario",
      subcategoryCount: 10,
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Categoria Battesimo",
      subcategoryCount: 10,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Categoria Fidanzamento",
      subcategoryCount: 10,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      name: "Categoria Laurea",
      subcategoryCount: 10,
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      name: "Categoria Natale",
      subcategoryCount: 10,
      image:
        "https://images.unsplash.com/photo-1512508664475-96d9e0eb6938?w=400&h=300&fit=crop",
    },
  ];

  const handleAddCategory = () => {
    console.log("Add new category");
  };

  const handleCategoryOptions = (id: number) => {
    console.log("Category options:", id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Change to page:", page);
  };

  const renderPaginationButtons = () => {
    const pages = [];
    const maxVisible = 3;

    pages.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`px-3 py-1 text-sm rounded ${
          currentPage === 1
            ? "bg-gray-200 text-gray-900"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        1
      </button>
    );

    if (currentPage > maxVisible) {
      pages.push(
        <span key="ellipsis-start" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
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

    if (currentPage < totalPages - maxVisible + 1) {
      pages.push(
        <span key="ellipsis-end" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#57534F] mb-1">
            Gestione Delle Categorie
          </h1>
          <p className="text-sm text-[#79766F]">
            Oltre {categories.length} categorie disponibili
          </p>
        </div>
        <div onClick={handleAddCategory}>
          <PrimaryButton
            text="Aggiungi Nuova Categoria"
            icon={<Plus className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Category Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Category Info */}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-[#57534F] mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[#79766F]">
                    {category.subcategoryCount} Sottocategoria
                  </p>
                </div>
                <button
                  onClick={() => handleCategoryOptions(category.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm items-center font-semibold flex gap-1 text-[#57534F]">
          <span>Mostrando 1 di {totalItems}</span>
          <ChevronsUpDown size={16} />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {renderPaginationButtons()}
          </div>

          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 bg-[#A89472] text-white rounded-lg text-sm hover:bg-[#9A8566] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Precedente
            </button>
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
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
    </div>
  );
}

export default AdminCategories;
