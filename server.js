
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let bets = [];
const FEE_PERCENT = 5;

// Place bet
app.post('/place-bet', (req, res) => {
    const { user, amount, prediction } = req.body;
    if (!user || !amount || !prediction) {
        return res.status(400).json({ error: 'Missing bet details' });
    }
    const fee = (FEE_PERCENT / 100) * amount;
    const netAmount = amount - fee;
    bets.push({ user, amount: netAmount, prediction });
    res.json({ success: true, fee, netAmount });
});

// Get all bets
app.get('/bets', (req, res) => {
    res.json(bets);
});

// Simple homepage
app.get('/', (req, res) => {
    res.send('Stats Count Betting App is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
