<p align="center">
  <img src="./images/binance.png" style="border-radius: 50%;" height="120" alt="Binance">
</p>

<h1 align="center">
  Binance Arbitrage Script
</h1>

This project is a **Binance Arbitrage Script** developed in **Node.js**. The script monitors cryptocurrency price differences across multiple trading pairs and identifies arbitrage trade opportunities by capitalizing on discrepancies in real-time prices. It is designed to run efficiently, leveraging Binance's API for fast and accurate data retrieval.

## 🚀 Features

- **Real-Time Price Monitoring**: Fetches live data from Binance API to track price fluctuations.
- **Automated Arbitrage Detection**: Calculates potential profit from price differences across pairs.
- **Trade Execution**: *Does not execute trades*. Executing trades requires more confidential information from the trader's account.
- **Configurable Parameters**: Adjust thresholds, trading pairs, and other parameters for optimal performance.
- **Error Handling and Logging**: Comprehensive error handling and logging for tracking trades and issues.

## 📈 How the Script Works
1. **Price Monitoring:** The script retrieves price information for selected pairs using a triangular arbitrage model. There cannot be an opportunity for arbitrage within a single cryptocurrency pair, but there may be arbitrage opportunities between two or more cryptocurrency pairs.
2. **Arbitrage Calculation:** Calculates possible profit margins by comparing pairs and accounts for maker fees and Binance charges before declaring it as a profitable opportunity.
3. **Arbitrage Detection:** When a profitable opportunity is detected, it is displayed in the HTML front-end.
4. **Logging:** Records all trades, errors, and performance metrics for analysis.

## 🛠️ Technologies Used

- **Node.js**: Backend logic and API integration.
- **Binance API**: Fetching live market data.
- **Axios**: HTTP requests for Binance API interactions.

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [Binance Account](https://www.binance.com/) with API keys (API access is optional for viewing trade opportunities)
- Basic knowledge of arbitrage and trading strategies is helpful

## 🏗️ Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Michaelgens/Binance-Arbitrage-Script.git  

   cd binance-arbitrage-script
2. **Install Dependencies**
   ```bash
   npm install
   ```

## ⚙️ Usage
Run the script with the following command:
   ```bash
   node app.js
   ```

### Upon execution, the script will:
- Connect to the Binance API.
- Continuously monitor selected trading pairs.
- Detect arbitrage opportunities based on the defined profit threshold.
- Display only the detected arbitrage opportunities in the HTML front end.


## 📑 Configuration Options
You can customize several parameters in the script to suit your trading strategy:

- **MIN_PROFIT_PERCENT:** Minimum profit threshold for reporting arbitrage opportunities.  
- **PAIRS:** Specify which trading pairs to monitor (e.g., BTC/USDT, ETH/BTC). The script currently has 10 pairs defined; add or remove pairs as needed. 
- **Triangles:** Checking all possible triangles for arbitrage. If you change PAIRS, you must also update Triangles; otherwise, it may cause an error.

### Note
Consider Binance charges (0.05%) and maker fees (0.046%) when evaluating arbitrage opportunities. You may need to increase MIN_PROFIT_PERCENT to 0.1%, add more pairs, or adjust triangles.

## ⚠️ Important Considerations
- **API Rate Limits:** Binance imposes rate limits. Exceeding these may result in temporary bans. Adjust polling frequency as needed.
- **Market Volatility:** Cryptocurrency markets are highly volatile. Test thoroughly in a sandbox or test environment.
- **Risk Management:** Arbitrage trading is not without risk. Ensure proper configuration to avoid losses.
- **Trading Fees:** Binance charges fees on each trade, which may affect overall profitability.  

## 📄 License
This project is licensed under the MIT License.

## 🤝 Contributing
Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

## 📬 Contact
For questions, feel free to reach out:  
[![LinkedIn](./images/linkedin.png)](https://www.linkedin.com/in/michael-genesis-ii-68835a195?trk=contact-info) LinkedIn  
[![Twitter](./images/twitter.png)](https://x.com/MichaelGen4521) Twitter ( X )  
[![Email](./images/gmail.png)](mailto:michaelgenesis26@gmail.com) Gmail