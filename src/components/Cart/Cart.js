import { useContext, useState } from "react";
import CartContext from "../../Store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const orderHandler = () => {
    setShowCheckout(true);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-app-d915a-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderdItems: cartCtx.items,
        }),
      }
    );

    setIsSubmitting(false);
    cartCtx.clearCart();
    setSubmitSuccess(true);
  };
  const modalActions = (
    <>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && (
          <button
            className={classes.button}
            onClick={() => {
              orderHandler();
            }}
          >
            Order
          </button>
        )}
      </div>
    </>
  );
  const isSubmittingModalContent = <p>Sending order data...</p>;
  const submitSuccessModalContent = (
    <>
      <p>Order recieved, will response shortly :)</p>
      <div className={classes.actions}>
        <button className={classes["button"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </>
  );
  const cartModalContent = (
    <>
      {cartItems}
      {showCheckout && (
        <Checkout
          onHideCart={props.onHideCart}
          onSubmitOrder={submitOrderHandler}
        />
      )}
      {!showCheckout && modalActions}
    </>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !submitSuccess && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && submitSuccess && submitSuccessModalContent}
    </Modal>
  );
};
export default Cart;
