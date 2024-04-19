import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Warehouse } from "../types";
export default function Warehouses() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    const response = await fetch("http://127.0.0.1:5000/warehouses");
    const data = await response.json();

    setWarehouses(data);
  };

  return (
    <div className="w-full">
      {warehouses.map((warehouse) => (
        <Link to={`/warehouses/${warehouse.id}`} className="w-full">
          <div
            key={warehouse.id}
            className="p-6 border-b border-zinc-700 hover:bg-zinc-700"
          >
            {warehouse.name} - {warehouse.latitude}, {warehouse.longitude}
          </div>
        </Link>
      ))}
    </div>
  );
}
