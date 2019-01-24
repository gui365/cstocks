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
      })
    })
  }

  getLargestTrades = symbol => {
    API.largestTrades(symbol)
      .then(tradesData => {
        // console.log(tradesData.data);
        this.setState({ largestTrades: tradesData.data });
        this.showHideTrades(symbol);
      });
  }

  showHideTrades = (symbol) => {
    // Check if any trades div is showing. If it is, hide it and modify the text of the button
    const allTradeDivs = document.getElementsByClassName("card-trades");
    for (let i = 0; i < allTradeDivs.length; i++) {
      if (allTradeDivs[i].classList.contains("showing")) {
        allTradeDivs[i].classList.toggle("no-show");
        allTradeDivs[i].classList.toggle("showing");
        allTradeDivs[i].previousSibling.innerHTML = "Show Largest Trades";
      }
    }    
    
    // Show / Hide trades div
    const divTrades = document.getElementById(symbol+"-trades");
    divTrades.classList.toggle("no-show");
    divTrades.classList.toggle("showing");
    
    // Change the text content of the button and its "shown" attribute value
    const shownAttValue = document.getElementById(symbol+"-btn").getAttribute("data-show");
    const getButton = document.getElementById(symbol+"-btn");
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
          this.state.logos.length > 1
          ? <Container list={this.state.list}
                       logos={this.state.logos}
                       getLargestTrades={this.getLargestTrades}
                       generateTrades={this.generateTrades}
                       largestTrades={this.state.largestTrades}
            />
          : null
        }
      </Fragment>
    );
  }
}

export default App;
