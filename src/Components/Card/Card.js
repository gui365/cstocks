import React from 'react';
import Trade from '../Trade';
import './Card.css';
// import tradesMock from '../../tradesMock.json';

const Card = ({ index, company, logo, largestTrades, showHideTrades }) => {
  return (
    <div className="card">
      <div className="card-title">
        <img className="company-logo" src={logo[index]} alt={`${company.symbol} logo`} />
        <div className="card-title-info">
          <p className="company-companyName">{company.companyName}</p>
          <p className="company-symbol">{company.symbol}</p>
        </div>
      </div>

      <button id={company.symbol+"-btn"} className="show-hide-btn" data-show="false" onClick={() => showHideTrades(company.symbol)}>
          Show Largest Trades
      </button>

      <div id={company.symbol+"-trades"} className="no-show card-trades">
        <p className="card-trades-title">Trades</p>
        {
          largestTrades[index].length > 1
          ? largestTrades[index].map(trade => <Trade key={company.name+index}
                                            trades={trade}
                                            />)
          : "No shares to show at the moment. Please try again later."

          // ******************** IMPORTANT ************************
          // Sometimes there seems to be an issue with the API when trying to get the largest trades
          // If that is the case, please try the following when reviewing the app:
          // 1. Comment lines 24 to 28 and
          // 2. Uncomment lines 4, and 36 to 40

        //   tradesMock[index].length > 1
        //   ? tradesMock[index].map(trade => <Trade key={company.name+index}
        //                                       trades={trade}
        //                                       />)
        //   : "No shares to show at the moment. Please try again later."
        }
      </div>
    </div>
  )
}

export default Card;