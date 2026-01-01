import { recentOrders, topProducts } from "../../../data/adminMockData";
import AdminTable from "../table/AdminTable";

function RecentOrders() {
  const columns = [
    {
      key: "id",
      label: "ID",
      render: (value: string) => (
        <div className="text-sm text-[#746F6A]">{value}</div>
      ),
    },
    {
      key: "items",
      label: "Ordini",
      render: (value: string[]) => (
        <div className="flex justify-center items-center -space-x-2">
          {value.map((imageUrl, i) => (
            <img
              key={i}
              src={imageUrl}
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
        <div className="text-sm text-[#746F6A]">{value}</div>
      ),
    },
    {
      key: "date",
      label: "Data",
      render: (value: string) => (
        <div className="text-sm text-[#79766F]">{value}</div>
      ),
    },
    {
      key: "status",
      label: "Stato",
    },
  ];

  const handleEdit = (id: number) => {

  };

  const handleView = (id: number) => {

  };

  const ordersWithIds = recentOrders.map((order, index) => ({
    ...order,
    id: order.id,
    rowId: index + 1,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Recent Orders - Takes 2 columns */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Ordini recenti
          </h2>
          <button className="text-sm text-[#C9B997] hover:underline">
            Visualizza tutto
          </button>
        </div>
        <AdminTable
          title=""
          description=""
          searchPlaceholder=""
          addButtonText=""
          columns={columns}
          data={ordersWithIds}
          onEdit={(id) => handleEdit(id)}
          onView={(id) => handleView(id)}
          showViewAction={true}
          showActions={true}
          currentPage={1}
          totalPages={1}
          totalItems={ordersWithIds.length}
        />
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Prodotti Top
            </h2>
            <button className="text-sm text-[#C9B997] hover:underline">
              Gestisci
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-[#57534F]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {product.name}
                  </p>
                  <p className="text-xs ">{product.reviews}</p>
                </div>
                <p className="text-sm font-semibold">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentOrders;
