import React from 'react';
import Trade from '../Trade';
import './Card.css';

const Card = ({ index, company, logo, largestTrades, getLargestTrades }) => {
  return (
    <div className="card">
      <div className="card-title">
        <img className="company-logo" src={logo[index]} alt={`${company.symbol} logo`} />
        <div className="card-title-info">
          <p className="company-companyName">{company.companyName}</p>
          <p className="company-symbol">{company.symbol}</p>
        </div>
      </div>

      <button id={company.symbol+"-btn"} className="show-hide-btn" data-show="false" onClick={() => getLargestTrades(company.symbol)}>
          Show Largest Trades
      </button>

      <div id={company.symbol+"-trades"} className="no-show card-trades">
        <p className="card-trades-title">Trades</p>
        {
          largestTrades.length > 1
          ? largestTrades.map((trade, index) => <Trade key={company.symbol+index}
                                            trades={trade}
                                            />)
          : "No shares to show at the moment. Please try again later."
        }
      </div>
    </div>
  )
}

export default Card;