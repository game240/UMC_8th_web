import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import type { RootState } from "../store/store";
import { useEffect } from "react";
import { CalculateTotal } from "../slices/cartSlice";

const Navbar = () => {
  const { amount, cartItems } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CalculateTotal());
  }, [dispatch, cartItems]);
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
