import React from 'react'
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className='row text-center'>
      <h2>Payment Successful! Thank you for your purchase.</h2>
      <h3><Link to="/">Go to Home Page.</Link></h3>
    </div>
  )
}

export default Success