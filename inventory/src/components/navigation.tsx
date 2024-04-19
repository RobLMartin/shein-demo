import { Link } from "react-router-dom";
import { MdWarehouse } from "react-icons/md";
import { FaRectangleList } from "react-icons/fa6";

import Logo from "./logo";

export default function navigation() {
  return (
    <nav className="bg-zinc-950 min-h-screen text-zinc-100 shadow-md z-30">
      <ul>
        <li>
          <Link
            to="/warehouses"
            className="flex items-center justify-center p-4 hover:bg-zinc-700"
          >
            <Logo height={40} width={40} />
          </Link>
        </li>
        <li>
          <Link
            to="/warehouses"
            className="flex items-center justify-center p-4 hover:bg-zinc-700"
          >
            <MdWarehouse fontSize="24px" />
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className="flex items-center justify-center p-4 hover:bg-zinc-700"
          >
            <FaRectangleList fontSize="24px" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
