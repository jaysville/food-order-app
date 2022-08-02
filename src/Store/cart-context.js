import { createContext } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItems: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
