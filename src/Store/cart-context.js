import React, { createContext } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItems: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
