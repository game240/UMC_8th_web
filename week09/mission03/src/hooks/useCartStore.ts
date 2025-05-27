import { create } from "zustand";
import type { Item } from "../types/cart";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";
import cartItems from "../constants/cartItems";

interface CartState {
  cartItems: Item[];
  amount: number;
  total: number;

  actions: CartActions;
}

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  calculateTotal: () => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  immer((set, _) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id: string) => {
        set((state) => {
          const item = state.cartItems.find((item) => item.id === id);
          if (item) {
            item.amount += 1;
          }
        });
      },
      decrease: (id: string) => {
        set((state) => {
          const item = state.cartItems.find((item) => item.id === id);
          if (item) {
            item.amount -= 1;
          }
        });
      },
      removeItem: (id: string) => {
        set((state) => {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        });
      },
      calculateTotal: () => {
        set((state) => {
          let amount = 0;
          let total = 0;
          state.cartItems.forEach((item) => {
            amount += item.amount;
            total += item.amount * item.price;
          });
          state.amount = amount;
          state.total = total;
        });
      },
      clearCart: () => {
        set((state) => {
          state.cartItems = [];
        });
      },
    },
  }))
);

export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    }))
  );

export const useCartActions = () =>
  useCartStore(useShallow((state) => state.actions));
