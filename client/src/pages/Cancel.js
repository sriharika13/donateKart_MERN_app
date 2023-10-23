import React from 'react'
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className='row text-center'>
      <h2>Payment Canceled. Your order has not been processed.</h2>
      <h3><Link to="/">Go to Home Page.</Link></h3>
    </div>
  )
}

export default Cancel