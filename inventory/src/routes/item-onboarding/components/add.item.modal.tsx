import React, { useState } from "react";

type AddItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  refreshItems: () => void;
};

const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  refreshItems,
}) => {
  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const addItem = async () => {
    const response = await fetch("http://127.0.0.1:5000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });
    if (response.ok) {
      refreshItems();
      onClose();
    } else {
      alert("Failed to add item");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-zinc-800 p-6 rounded-lg">
        <h2 className="text-3xl">Add New Item</h2>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={itemData.name}
          onChange={handleChange}
          className="p-2 bg-zinc-700 text-zinc-100 placeholder-zinc-400 rounded w-full mt-4"
        />
        <input
          name="description"
          type="text"
          placeholder="Description"
          value={itemData.description}
          onChange={handleChange}
          className="p-2 bg-zinc-700 text-zinc-100 placeholder-zinc-400 rounded w-full mt-4"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={itemData.price}
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
            onClick={addItem}
            className="py-2 px-4 bg-blue-500 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
