import { useEffect, useState } from "react";
import { Item } from "../../types";
import AddItemModal from "./components/add.item.modal";
import { FiPlus } from "react-icons/fi";

export default function ItemOnboarding() {
  const [items, setItems] = useState<Item[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch("http://127.0.0.1:5000/items");
    const data = await response.json();

    setItems(data);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-6 border-b border-zinc-700">
        <h1 className="text-2xl">Items</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className=" bg-zinc-500 bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-sm p-2 rounded"
        >
          <FiPlus size={20} />
        </button>
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          className="w-full p-6 border-b border-zinc-700 hover:bg-zinc-700 grid grid-cols-4 justify-between text-left"
        >
          <p>{item.id}</p>
          <p>{item.name}</p>
          <p>{item.description ? item.description : "N/A"}</p>
          <p className="text-right">${item.price.toFixed(2)}</p>
        </div>
      ))}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        refreshItems={fetchItems}
      />
    </div>
  );
}
