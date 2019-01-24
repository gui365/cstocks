import React from 'react';
import './Trade.css';

const Trade = ({ trades }) => {
  return (
    <>
      <p>{trades.size} shares at ${parseFloat(trades.price).toFixed(2)}</p>
    </>
  )
}

export default Trade;