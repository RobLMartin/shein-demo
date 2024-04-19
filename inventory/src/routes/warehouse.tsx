import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MapboxGL from "../components/mapbox-gl";
import { Warehouse } from "../types";

export default function WarehousePage() {
  const [warehouse, setWarehouse] = useState<Warehouse | null>();
  const { warehouseId } = useParams();

  useEffect(() => {
    warehouseId && fetchWarehouses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warehouseId]);

  const fetchWarehouses = async () => {
    const response = await fetch(
      `http://127.0.0.1:5000/warehouses/${warehouseId}`
    );
    const data = await response.json();
    setWarehouse(data);
  };

  if (!warehouse) return <div>Loading...</div>;

  return (
    <div>
      <div className="relative h-[700px]">
        <MapboxGL lat={warehouse.latitude} long={warehouse.longitude} />
        <div className="absolute top-0 left-0 p-4 bg-opacity-75  text-white text-3xl">
          <h1>{warehouse.name}</h1>
        </div>
      </div>
      <div className="z-10 mt-20">
        {warehouse?.items?.map((item) => (
          <div
            key={item.id}
            className="p-6 border-t border-zinc-700 grid justify-between grid-cols-3 hover:bg-zinc-700"
          >
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p>{item.description}</p>
            <p>x {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
