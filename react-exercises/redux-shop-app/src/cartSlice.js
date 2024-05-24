import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addCart(state, action) {
      const { payload } = action;
      state.cart = [...state.cart, payload];
    },
    removeCart(state, action) {
      const { payload } = action;

      const updatedCart = state.cart.filter((c) => c.id !== payload.id);
      state.cart = updatedCart;
    },
  },
});

export const { addCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
