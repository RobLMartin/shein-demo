import { Link } from "react-router-dom";
import { MdWarehouse } from "react-icons/md";
import { FaRectangleList } from "react-icons/fa6";

import Logo from "./logo";
import { FaTshirt } from "react-icons/fa";

export default function navigation() {
  return (
    <nav className="bg-zinc-950 min-h-screen text-zinc-100 shadow-md z-30">
      <ul>
        <li>
          <Link
            to="/warehouses"
            className="flex items-center justify-center p-4 hover:bg-zinc-800"
          >
            <Logo height={35} width={35} />
          </Link>
        </li>
        <li>
          <Link
            to="/warehouses"
            className="flex items-center justify-center p-4 hover:bg-zinc-800"
          >
            <MdWarehouse fontSize="24px" />
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className="flex items-center justify-center p-4 hover:bg-zinc-800"
          >
            <FaRectangleList fontSize="24px" />
          </Link>
        </li>
        <li>
          <Link
            to="/item-onboarding"
            className="flex items-center justify-center p-4 hover:bg-zinc-800"
          >
            <FaTshirt fontSize="24px" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
