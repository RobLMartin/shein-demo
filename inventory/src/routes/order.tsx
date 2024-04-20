import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Order } from "../types";

export default function WarehousePage() {
  const [order, setOrder] = useState<Order | null>();
  const { orderId } = useParams();

  useEffect(() => {
    orderId && fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const fetchOrder = async () => {
    const response = await fetch(`http://127.0.0.1:5000/orders/${orderId}`);
    const data = await response.json();
    setOrder(data);
  };

  if (!order) return <div>Loading...</div>;

  return <div>hello</div>;
}
