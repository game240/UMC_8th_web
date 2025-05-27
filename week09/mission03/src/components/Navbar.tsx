import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useEffect } from "react";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const Navbar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotal } = useCartActions();

  useEffect(() => {
    calculateTotal();
  }, [cartItems, calculateTotal]);
  return (
    <nav className="flex justify-between items-center p-5 bg-gray-800 text-white">
      <h1 className="text-2xl font-semibold">Music</h1>
      <div className="flex items-center space-x-2">
        <ShoppingCartOutlinedIcon />
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </nav>
  );
};

export default Navbar;
