import React from 'react';
import "./Container.css";
import Card from "../Card";

const Container = ({ list, logos, getLargestTrades, generateTrades, largestTrades}) => {
  return (
    <div className="container">
      {
        list.map((company, index) => <Card index={index}
                                           key={company.symbol}
                                           company={company}
                                           logo={logos}
                                           getLargestTrades={getLargestTrades}
                                           generateTrades={generateTrades}
                                           largestTrades={largestTrades}
                                     />
                )
      }
    </div>
  )
}

export default Container;