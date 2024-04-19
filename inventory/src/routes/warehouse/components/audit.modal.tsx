import React, { useEffect, useState } from "react";
import { WarehouseItem } from "../../../types";

type ItemAuditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  item: WarehouseItem | null;
  warehouseId?: string;
  refreshData: () => void;
};

const ItemAuditModal: React.FC<ItemAuditModalProps> = ({
  isOpen,
  onClose,
  item,
  warehouseId,
  refreshData,
}) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
  }, [item]);

  const updateQuantity = async () => {
    if (!item || !warehouseId) return;

    await fetch(
      `http://127.0.0.1:5000/warehouses/${warehouseId}/items/${item.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          refreshData();
          onClose();
        } else {
          alert("Failed to update quantity");
        }
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-zinc-800 p-6 rounded-lg">
        <h2 className="text-3xl">Update Quantity for {item.name}</h2>
        <input
          type="number"
          value={quantity}
          onChange={handleChange}
          className="p-2 bg-zinc-700 text-zinc-100 placeholder-zinc-400 rounded w-full mt-4"
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={updateQuantity}
            className="py-2 px-4 bg-blue-500 text-white rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemAuditModal;
