// backend/server.js

const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 5000

// ---------------- HOLDINGS API ----------------
app.get("/api/holdings", (req, res) => {
  res.json([
    {
      coin: "BTC",
      coinName: "Bitcoin",
      logo: "https://res.cloudinary.com/dvzcnvazm/image/upload/v1776420418/CryptoLogos_bjy8i6.png",
      currentPrice: 5532015,
      totalHolding: 0.63776,
      averageBuyPrice: 4800000,
      stcg: {
        balance: 0.25,
        gain: 25000,
      },
      ltcg: {
        balance: 0.38776,
        gain: -12000,
      },
    },
    {
      coin: "ETH",
      coinName: "Ethereum",
      logo: "https://res.cloudinary.com/dvzcnvazm/image/upload/v1776420458/ETH_logo_ctss6h.png",
      currentPrice: 285000,
      totalHolding: 5.6736,
      averageBuyPrice: 240000,
      stcg: {
        balance: 2.5,
        gain: 32000,
      },
      ltcg: {
        balance: 3.1736,
        gain: -18000,
      },
    },
    {
      coin: "USDT",
      coinName: "Tether",
      logo: "https://res.cloudinary.com/dvzcnvazm/image/upload/v1776420434/Vector_pcj8xb.png",
      currentPrice: 85,
      totalHolding: 3096.542,
      averageBuyPrice: 83,
      stcg: {
        balance: 3096.542,
        gain: 4200,
      },
      ltcg: {
        balance: 0,
        gain: 0,
      },
    },
    {
      coin: "MATIC",
      coinName: "Polygon",
      logo: "https://res.cloudinary.com/dvzcnvazm/image/upload/v1776420449/POL_logo_p1bqdk.png",
      currentPrice: 62,
      totalHolding: 2210,
      averageBuyPrice: 75,
      stcg: {
        balance: 1000,
        gain: -9500,
      },
      ltcg: {
        balance: 1210,
        gain: -6200,
      },
    },
    {
      coin: "SOL",
      coinName: "Solana",
      logo: "https://res.cloudinary.com/dvzcnvazm/image/upload/v1776420605/solana_logo_w5kcg0.webp",
      currentPrice: 14200,
      totalHolding: 8.4,
      averageBuyPrice: 11800,
      stcg: {
        balance: 5,
        gain: 15500,
      },
      ltcg: {
        balance: 3.4,
        gain: 8300,
      },
    },
  ])
})

// ---------------- CAPITAL GAINS API ----------------
app.get("/api/capital-gains", (req, res) => {
  res.json({
    capitalGains: {
      stcg: {
        profits: 70200.88,
        losses: 1548.53,
      },
      ltcg: {
        profits: 5020,
        losses: 3050,
      },
    },
  })
})

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})