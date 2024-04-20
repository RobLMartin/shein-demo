import { useEffect, useState } from "react";
import { Order } from "../types";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    const response = await fetch("http://127.0.0.1:5000/orders");
    const data = await response.json();

    setOrders(data);
  };

  return (
    <div className="w-full grid">
      {orders.map((order) => (
        <div className="p-6 grid grid-cols-3 border-b border-zinc-700 hover:bg-zinc-700">
          <h3 className="text-lg font-semibold">{order.user_id}</h3>
          <p>status: {order.status}</p>
        </div>
      ))}
    </div>
  );
}
