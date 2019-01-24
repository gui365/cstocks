import React from 'react';
import "./Container.css";
import Card from "../Card";

const Container = ({ list, logos, largestTrades, showHideTrades }) => {
  return (
    <div className="container">
      {
        list.map((company, index) => <Card index={index}
                                           key={company.symbol}
                                           company={company}
                                           logo={logos}
                                           largestTrades={largestTrades}
                                           showHideTrades={showHideTrades}
                                     />
                )
      }
    </div>
  )
}

export default Container;