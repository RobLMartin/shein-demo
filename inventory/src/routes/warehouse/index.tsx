import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MapboxGL from "../../components/mapbox-gl";
import { Warehouse, WarehouseItem } from "../../types";
import { FiChevronLeft, FiEdit, FiPlus } from "react-icons/fi";
import AuditModal from "./components/audit.modal";
import AddStockModal from "./components/add.stock.modal";

export default function WarehousePage() {
  const [warehouse, setWarehouse] = useState<Warehouse | null>();
  const { warehouseId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<WarehouseItem | null>(null);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);

  useEffect(() => {
    warehouseId && fetchWarehouse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warehouseId]);

  const fetchWarehouse = async () => {
    const response = await fetch(
      `http://127.0.0.1:5000/warehouses/${warehouseId}`
    );
    const data = await response.json();
    setWarehouse(data);
  };

  const openAuditModal = (item: WarehouseItem) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  if (!warehouse) return <div>Loading...</div>;

  return (
    <div>
      <div className="relative h-[700px]">
        <MapboxGL />
        <Controls
          warehouse={warehouse}
          openAddStock={() => setIsAddStockModalOpen(true)}
        />
      </div>
      <div className="z-10 mt-[72px]">
        {warehouse?.items?.map((item) => (
          <div
            onClick={() => openAuditModal(item)}
            key={item.id}
            className="p-6 border-t border-zinc-700 grid justify-between grid-cols-4 hover:bg-zinc-700"
          >
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p>{item.description}</p>
            <p>x {item.quantity}</p>
            <button
              className="flex justify-end p-2 rounded"
              aria-label="Edit Item"
            >
              <FiEdit size={16} />
            </button>
          </div>
        ))}
      </div>
      <AuditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={currentItem}
        warehouseId={warehouseId}
        refreshData={fetchWarehouse}
      />
      <AddStockModal
        isOpen={isAddStockModalOpen}
        onClose={() => setIsAddStockModalOpen(false)}
        warehouseId={warehouse.id}
        refreshWarehouse={fetchWarehouse}
      />
    </div>
  );
}

type ControlProps = {
  warehouse: Warehouse;
  openAddStock: () => void;
};

const Controls = ({ warehouse, openAddStock }: ControlProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full absolute top-0 left-0 p-4 bg-zinc-950 bg-opacity-10 text-white text-3xl flex items-center backdrop-filter backdrop-blur-lg justify-between">
      <div className="flex gap-4 items-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-zinc-700 hover:bg-opacity-30 p-2 rounded w-10 h-10 flex items-center justify-center"
        >
          <FiChevronLeft size={24} />
        </button>
        <h1 className="p-2">{warehouse.name}</h1>
      </div>
      <button
        onClick={openAddStock}
        className="bg-zinc-700 hover:bg-opacity-30 p-2 rounded w-10 h-10 flex items-center justify-center"
      >
        <FiPlus size={24} />
      </button>
    </div>
  );
};
