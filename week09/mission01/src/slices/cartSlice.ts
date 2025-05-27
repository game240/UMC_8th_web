import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import type { Item } from "../types/cart";

export interface CartState {
  cartItems: Item[];
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementAmount: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((item) => item.id === itemId);

      if (item) {
        item.amount += 1;
      }
    },
    decrementAmount: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((item) => item.id === itemId);

      if (item) {
        item.amount -= 1;
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    CalculateTotal: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

export const {
  incrementAmount,
  decrementAmount,
  removeItem,
  clearCart,
  CalculateTotal,
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default cartReducer;
