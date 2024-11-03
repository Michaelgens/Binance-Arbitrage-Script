const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// List of cryptocurrency pairs to track
const pairs = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ETHBTC', 'BNBBTC', 'BNBETH', 'LTCUSDT', 'LTCBTC', 'LTCETH', 'LTCBNB'];

// Function to fetch price data for the pairs
const fetchPrices = async () => {
    try {
        const pricePromises = pairs.map(pair => 
            axios.get(`https://data-api.binance.vision/api/v3/ticker/price?symbol=${pair}`)
        );

        const prices = await Promise.all(pricePromises);
        return prices.map(res => res.data);
    } catch (error) {
        console.error('Error fetching prices:', error);
        throw new Error('Failed to fetch prices');
    }
};

// Function to detect triangular arbitrage opportunities with at least 0.5% profit
const findArbitrage = (prices) => {
    let opportunities = [];
    const MIN_PROFIT_PERCENT = 0.5; // Minimum profit threshold for reporting arbitrage

    // Convert prices into a dictionary for easier lookup
    const priceDict = {};
    prices.forEach(priceData => {
        priceDict[priceData.symbol] = parseFloat(priceData.price);
    });

    // Now we will check possible arbitrage opportunities for various triangular combinations
    const checkTriangle = (base, intermediate, counter, priceDict) => {
        const baseToIntermediate = priceDict[`${base}${intermediate}`] || (1 / priceDict[`${intermediate}${base}`]);
        const intermediateToCounter = priceDict[`${intermediate}${counter}`] || (1 / priceDict[`${counter}${intermediate}`]);
        const counterToBase = priceDict[`${counter}${base}`] || (1 / priceDict[`${base}${counter}`]);

        if (baseToIntermediate && intermediateToCounter && counterToBase) {
            const startWithBase = 1 * baseToIntermediate * intermediateToCounter * counterToBase;
            const profitPercent = ((startWithBase - 1) * 100).toFixed(5); // Profit percentage

            // Report only if profit exceeds the minimum threshold (0.5%)
            if (profitPercent >= MIN_PROFIT_PERCENT) {
                opportunities.push(`Arbitrage opportunity: ${base} -> ${intermediate} -> ${counter} -> ${base}: Profit = ${profitPercent}%`);
            }
        }
    };

    // Checking all possible triangles for arbitrage
    // Triangles: BTC -> ETH -> USDT -> BTC, LTC -> BNB -> USDT -> LTC, etc.
    const triangles = [
        ['BTC', 'ETH', 'USDT'],
        ['BTC', 'BNB', 'USDT'],
        ['BTC', 'LTC', 'USDT'],
        ['ETH', 'BNB', 'USDT'],
        ['ETH', 'LTC', 'USDT'],
        ['BNB', 'LTC', 'USDT'],
        ['ETH', 'BNB', 'BTC'],
        ['ETH', 'LTC', 'BTC'],
        ['BNB', 'LTC', 'BTC']
    ];

    triangles.forEach(([base, intermediate, counter]) => {
        checkTriangle(base, intermediate, counter, priceDict);
    });

    return opportunities;
};

app.get('/api/arbitrage', async (req, res) => {
    try {
        const prices = await fetchPrices();
        const opportunities = findArbitrage(prices);

        if (opportunities.length > 0) {
            res.json(opportunities);
        } else {
            res.json(['No arbitrage opportunities found with a profit over 0.5% at this time.']);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch arbitrage opportunities' });
    }
});

// Serve static HTML file
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});