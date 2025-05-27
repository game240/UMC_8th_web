import CartItem from "./CartItem";
import { useCartInfo } from "../hooks/useCartStore";

const CartList = () => {
  const { cartItems } = useCartInfo();
  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;
