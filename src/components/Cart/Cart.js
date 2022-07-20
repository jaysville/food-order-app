import { useContext } from "react";
import CartContext from "../../Store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemove = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAdd = (item) => {
    cartCtx.addItems({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemove.bind(null, item.id)}
            onAdd={cartItemAdd.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && (
          <button
            className={classes.button}
            onClick={() => {
              alert("You'll recieve your order soon");
              props.onHideCart();
            }}
          >
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};
export default Cart;
