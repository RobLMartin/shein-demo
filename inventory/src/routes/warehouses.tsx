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
    <div className="w-full grid">
      {warehouses.map((warehouse) => (
        <Link
          key={warehouse.id}
          to={`/warehouses/${warehouse.id}?lat=${warehouse.latitude}&long=${warehouse.longitude}`}
          className="block border-b border-zinc-700 hover:bg-zinc-700"
        >
          <div className="p-6 grid grid-cols-3">
            <h3 className="text-lg font-semibold">{warehouse.name}</h3>
            <p>Latitude: {warehouse.latitude}</p>
            <p>Longitude: {warehouse.longitude}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
