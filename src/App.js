import React, { Component, Fragment } from 'react';
import Container from './Components/Container';
import API from "./utils/API";
import Header from './Components/Header';

class App extends Component {
  state = {
    list: [],
    symbols: [],
    logos: [],
    largestTrades: []
  }

  componentDidMount() {
    API.list()
    .then(list => {
      // console.log(list.data[0]);
      this.setState({ list: list.data });
      this.getSymbols();
    })
    .catch(error => console.log(error));
  }

  getSymbols = () => {
    const symbols = this.state.list.map(company => company.symbol);
    // console.log(symbols);
    this.setState({ symbols });
    this.getLogos();
  }

  getLogos = () => {
    return new Promise(resolve => {
      let logos = [];
      this.state.symbols.forEach(symbol => logos.push(API.logo(symbol)))
      Promise.all(logos)
      .then(logoData => {
        let logosArray = logoData.map(logo => logo.data.url);
        // console.log(logosArray);
        this.setState({ logos: logosArray })
        this.getLargestTrades();
      })
    })
  }

  getLargestTrades = () => {
    return new Promise(resolve => {
      let trades = [];
      this.state.symbols.forEach(symbol => trades.push(API.largestTrades(symbol)))
      Promise.all(trades)
      .then(tradesData => {
        // There may be some problem with the API (largestTrades returns an empty array...)
        // See api.png under the public folder
        let tradesArray = tradesData.map(trade => trade.data);
        console.log(tradesData);
        // console.log(tradesArray);
        this.setState({ largestTrades: tradesArray })
        console.log(this.state.largestTrades);
      })
    })
  }

  showHideTrades = symbol => {
    // Show / Hide trades div
    const divTrades = document.getElementById(symbol+"-trades");
    divTrades.classList.toggle("no-show");

    // Change the text content of the button and its "shown" attribute value
    const getButton = document.getElementById(symbol+"-btn");
    const shownAttValue = document.getElementById(symbol+"-btn").getAttribute("data-show");

    if (shownAttValue === "false") {
      getButton.innerHTML = "Hide Largest Trades";
      getButton.setAttribute("data-show", "true")
    } else {
      getButton.innerHTML = "Show Largest Trades";
      getButton.setAttribute("data-show", "false")
    }
  }
  
  render() {
    return (
      <Fragment>
        <Header />
        {
          this.state.logos.length > 1 && this.state.largestTrades.length > 1
          ? <Container list={this.state.list}
                       logos={this.state.logos}
                       largestTrades={this.state.largestTrades}
                       symbols={this.state.symbols}
                       showHideTrades={this.showHideTrades}
            />
          : null
        }
      </Fragment>
    );
  }
}

export default App;
