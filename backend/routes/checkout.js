const express= require('express')
const stripe= require('stripe')("sk_test_51NwhP3SFLsJhFriigULP8sL1KMtMdVKHYnFmOI53Rh9gJox5INS7hNsluqHk3RP2bLsv3TIZiCm6eDpNRV2utlQ800npPrNwGg")

const router= express.Router()
require('dotenv').config(); // Load environment variables from .env file

const YOUR_DOMAIN = process.env.DOMAIN;

router.post('/', async (req, res) => {
    const {donations}= req.body
    const lineItems= donations.map((donation)=>{
        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: donation.name
                },
                unit_amount: parseInt(donation.donationAmount)*100 //stripe spage shown price in decimal 
            },
            quantity: 1 //mandatory
        }
    })
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });
  console.log(session)
  res.json({status: 'ok', id:session.id})
});


module.exports= router