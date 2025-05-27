import type React from "react";
import type { Item } from "../types/cart";
import { useCartActions } from "../hooks/useCartStore";

interface CartItemProps {
  item: Item;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { increase, decrease, removeItem } = useCartActions();

  const handleIncreaseCount = () => {
    increase(item.id);
  };

  const handleDecreaseCount = () => {
    if (item.amount === 1) {
      removeItem(item.id);
      return;
    }

    decrease(item.id);
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <img
        src={item.img}
        alt={item.title}
        className="w-20 h-20 object-cover rounded mr-4"
      />
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.singer}</p>
        <p className="text-sm text-gray-600 font-bold">{item.price} 원</p>
      </div>

      <div className="flex items-center">
        <button
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-l hover:bg-gray-400 cursor-pointer"
          onClick={handleDecreaseCount}
        >
          -
        </button>
        <span className="px-3">{item.amount}</span>
        <button
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-r hover:bg-gray-400 cursor-pointer"
          onClick={handleIncreaseCount}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
