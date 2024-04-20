import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import Warehouses from "./routes/warehouses";
import ItemOnboarding from "./routes/item-onboarding";
import Warehouse from "./routes/warehouse";
import Orders from "./routes/orders";
import Order from "./routes/order";

function App() {
  return (
    <Router>
      <div className="flex text-zinc-100 min-h-screen w-screen">
        <Navigation />
        <div className="w-[calc(100vw-56px)]">
          <Routes>
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/" element={<Warehouses />} />
            <Route path="/warehouses/:warehouseId" element={<Warehouse />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:orderId" element={<Order />} />
            <Route path="/item-onboarding" element={<ItemOnboarding />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
