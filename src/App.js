import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./Store/CartProvider";

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const showCartHandler = () => {
    setCartIsOpen(true);
  };
  const hideCartHandler = () => {
    setCartIsOpen(false);
  };
  return (
    <CartProvider>
      {cartIsOpen && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} onHideCart={hideCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
