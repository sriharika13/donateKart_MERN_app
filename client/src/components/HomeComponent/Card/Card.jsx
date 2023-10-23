import React from "react";
import { useState } from "react";
import styles from './Card.module.css'

const NonProfitCard = ({ nonprofit, addToCart }) => {
    const [donationAmount, setDonationAmount] = useState("");
    const { name, location, description, logoUrl, coverImageUrl } = nonprofit;
  
    const addToCartHandler = async () => {
      if (donationAmount === "") {
        alert("Please enter a donation amount."); // Show an error message if input is empty
      } else {
        const amount = parseFloat(donationAmount);
        if (isNaN(amount) || amount <= 0) {
          alert("Please enter a valid positive number."); // Show an error message if input is not a positive number
        } else {
          nonprofit.donationAmount = donationAmount;
          addToCart(nonprofit);
        }
      }
    };
  
    return (
      <div className={`card mb-4 ${styles['fixed-card']}`}>
        <div className={styles['card-img-container']}>
          <img
            src={coverImageUrl}
            className={`card-img-top ${styles['banner-image']}`}
            alt="Banner"
          />
          <img src={logoUrl} className={styles.logo} alt={`${name} logo`} />
        </div>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text location">Location: {location}</p>
          <p className="card-text description">{description}</p>
          <div>
            <input
              className="w-30"
              type="number"
              placeholder="Enter donation amount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
            />
            INR
            <button className={`ms-2 btn ${styles['btn-green']}`} onClick={addToCartHandler}>
              Donate
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default NonProfitCard;
  