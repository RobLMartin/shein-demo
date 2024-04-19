import React, { useState } from "react";

type AddStockModalProps = {
  isOpen: boolean;
  onClose: () => void;
  warehouseId: number;
  refreshWarehouse: () => void;
};

const AddStockModal: React.FC<AddStockModalProps> = ({
  isOpen,
  onClose,
  warehouseId,
  refreshWarehouse,
}) => {
  const [stockData, setStockData] = useState({
    itemId: "",
    quantity: 0,
  });

  const addStockItem = async () => {
    const response = await fetch(
      `http://127.0.0.1:5000/warehouses/${warehouseId}/items`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stockData),
      }
    );
    if (response.ok) {
      refreshWarehouse();
      onClose();
    } else {
      alert("Failed to add stock item");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStockData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value, 10) : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-zinc-800 p-6 rounded-lg">
        <h2 className="text-3xl">Add Stock Item</h2>
        {/* Inputs for item ID and quantity */}
        <input
          name="itemId"
          type="text"
          placeholder="Item ID"
          value={stockData.itemId}
          onChange={handleChange}
          className="p-2 bg-zinc-700 text-zinc-100 placeholder-zinc-400 rounded w-full mt-4"
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={stockData.quantity}
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
            onClick={addStockItem}
            className="py-2 px-4 bg-blue-500 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStockModal;
