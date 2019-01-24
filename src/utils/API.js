import axios from "axios";

export default {
  list: function() {
    return axios.get("https://api.iextrading.com/1.0/stock/market/list/mostactive");
  },
  largestTrades: function(symbol) {
    return axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/largest-trades`);
  },
  logo: function(company) {
    return axios.get(`https://api.iextrading.com/1.0/stock/${company}/logo`);
  }
};