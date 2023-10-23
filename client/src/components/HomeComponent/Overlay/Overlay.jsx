import React from "react";
import styles from "./Overlay.module.css";

import { loadStripe } from "@stripe/stripe-js";

const Overlay = ({ cart, onClose }) => {

  const makePaymentHandler = async () => {
    const stripe = await loadStripe(
      "pk_test_51NwhP3SFLsJhFriiTSrjtQxTM4IAwD3RX6a2kdEMpdR1rIQW7PpUg46YbFWm8Nj2anVsbe3OlAx1dE02PrIdLJFG00mZw03BSM"
    );
    const body = {
      donations: cart,
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/create-checkout-session`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    if (data.status === "ok") {
      const result = stripe.redirectToCheckout({ sessionId: data.id }); //stripe checkout page will open
      if (result.error) {
        console.log(result.error);
      }
    } else {
      console.error("Error fetching stripe api:", data.status);
    }
  };
  return (
    <div className={styles["overlay"]}>
      <div className={`${styles["overlay-content"]} text-center`}>
        {cart.length===0 ? <h2>Your cart is empty!</h2> : (
        <h2>Cart Summary</h2> )}
        {cart.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <p>{item.name}</p>
            <span>{item.donationAmount} INR</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "center", gap:"20px" }}>
        {cart.length>0 && (<button onClick={makePaymentHandler} className="btn btn-primary">
            Checkout
          </button>)}
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;