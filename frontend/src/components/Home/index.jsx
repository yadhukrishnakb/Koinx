import {useEffect, useMemo, useState} from "react"

import {FaExclamationCircle} from "react-icons/fa"
import {FaAngleDown} from "react-icons/fa6"

import Navbar from "../Navbar"

import "./index.css"

const Home = () => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [holdings, setHoldings] = useState([])
  const [capitalData, setCapitalData] = useState(null)
  const [selectedCoins, setSelectedCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [viewAll, setViewAll] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const holdingsResponse = await fetch("http://localhost:5000/api/holdings")
      const holdingsResult = await holdingsResponse.json()

      const updatedData = holdingsResult.map((each, index) => ({
        ...each,
        id: `${each.coin}-${index}`,
      }))

      const gainsResponse = await fetch(
        "http://localhost:5000/api/capital-gains"
      )
      const gainsResult = await gainsResponse.json()

      setHoldings(updatedData)
      setCapitalData(gainsResult.capitalGains)
    } catch (e) {
      setError("Failed to fetch data")
    }

    setLoading(false)
  }

  const toggleCoin = id => {
    if (selectedCoins.includes(id)) {
      setSelectedCoins(selectedCoins.filter(each => each !== id))
    } else {
      setSelectedCoins([...selectedCoins, id])
    }
  }

  const toggleAll = () => {
    if (selectedCoins.length === holdings.length) {
      setSelectedCoins([])
    } else {
      setSelectedCoins(holdings.map(each => each.id))
    }
  }

  const afterHarvest = useMemo(() => {
    if (capitalData === null) return null

    let stProfit = capitalData.stcg.profits
    let stLoss = capitalData.stcg.losses
    let ltProfit = capitalData.ltcg.profits
    let ltLoss = capitalData.ltcg.losses

    holdings.forEach(each => {
      if (selectedCoins.includes(each.id)) {
        if (each.stcg.gain >= 0) {
          stProfit += each.stcg.gain
        } else {
          stLoss += Math.abs(each.stcg.gain)
        }

        if (each.ltcg.gain >= 0) {
          ltProfit += each.ltcg.gain
        } else {
          ltLoss += Math.abs(each.ltcg.gain)
        }
      }
    })

    return {stProfit, stLoss, ltProfit, ltLoss}
  }, [capitalData, holdings, selectedCoins])

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error !== "") {
    return <h1>{error}</h1>
  }

  const preStNet =
    capitalData.stcg.profits - capitalData.stcg.losses

  const preLtNet =
    capitalData.ltcg.profits - capitalData.ltcg.losses

  const preTotal = preStNet + preLtNet

  const postStNet =
    afterHarvest.stProfit - afterHarvest.stLoss

  const postLtNet =
    afterHarvest.ltProfit - afterHarvest.ltLoss

  const postTotal = postStNet + postLtNet

  const savedAmount = preTotal - postTotal

  const visibleRows = viewAll ? holdings : holdings.slice(0, 5)

  return (
    <div className="home-bg-container">
      <Navbar />

      <div className="content-container">
        <div className="header-container">
          <h1 className="heading">Tax Harvesting</h1>
          <p className="guide-text">How it works?</p>
        </div>

        <div className="important-notes-container">
          <div className="important-notes-header">
            <div className="important-notes-left">
              <FaExclamationCircle className="important-notes-icon" />
              <p className="important-notes-heading">
                Important Notes & Disclaimers
              </p>
            </div>

            <button
              type="button"
              className="important-notes-toggle"
              onClick={() => setDetailsVisible(prev => !prev)}
            >
              <FaAngleDown
                className={detailsVisible ? "rotate-icon" : ""}
              />
            </button>
          </div>

          {detailsVisible && (
            <div className="important-notes-details">
              <p className="important-notes-detail-text">
                Tax harvesting may reduce gains by offsetting profits
                with losses. Please verify with your tax advisor.
              </p>
            </div>
          )}
        </div>

        <div className="cards-container">
          <div className="tax-card">
            <h2 className="title">Pre Harvesting</h2>

            <div className="table-header">
              <span></span>
              <span>Short-term</span>
              <span>Long-term</span>
            </div>

            <div className="row">
              <span>Profits</span>
              <span>₹ {capitalData.stcg.profits.toFixed(2)}</span>
              <span>₹ {capitalData.ltcg.profits.toFixed(2)}</span>
            </div>

            <div className="row">
              <span>Losses</span>
              <span>- ₹ {capitalData.stcg.losses.toFixed(2)}</span>
              <span>- ₹ {capitalData.ltcg.losses.toFixed(2)}</span>
            </div>

            <div className="row">
              <span>Net Capital Gains</span>
              <span>₹ {preStNet.toFixed(2)}</span>
              <span>₹ {preLtNet.toFixed(2)}</span>
            </div>

            <div className="footer">
              Realised Capital Gains:
              <span> ₹ {preTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="tax-card after-harvesting-card">
            <h2 className="title">After Harvesting</h2>

            <div className="table-header">
              <span></span>
              <span>Short-term</span>
              <span>Long-term</span>
            </div>

            <div className="row">
              <span>Profits</span>
              <span>₹ {afterHarvest.stProfit.toFixed(2)}</span>
              <span>₹ {afterHarvest.ltProfit.toFixed(2)}</span>
            </div>

            <div className="row">
              <span>Losses</span>
              <span>- ₹ {afterHarvest.stLoss.toFixed(2)}</span>
              <span>- ₹ {afterHarvest.ltLoss.toFixed(2)}</span>
            </div>

            <div className="row">
              <span>Net Capital Gains</span>
              <span>₹ {postStNet.toFixed(2)}</span>
              <span>₹ {postLtNet.toFixed(2)}</span>
            </div>

            <div className="footer">
              Effective Capital Gains:
              <span> ₹ {postTotal.toFixed(2)}</span>
            </div>

            {savedAmount > 0 && (
              <div className="save-text">
                🎉 You are going to save upto
                <span> ₹ {savedAmount.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="holdings-card">
          <h2 className="holdings-title">Holdings</h2>

          <div className="holdings-header">
            <div className="left-section">
              <input
                type="checkbox"
                checked={
                  holdings.length > 0 &&
                  selectedCoins.length === holdings.length
                }
                onChange={toggleAll}
              />
              <span>Asset</span>
            </div>

            <span>Holdings</span>
            <span>Current Price</span>
            <span>ST Gain</span>
            <span>LT Gain</span>
            <span>Amount to Sell</span>
          </div>

          {visibleRows.map(each => (
            <div className="holding-row" key={each.id}>
              <div className="left-section">
                <input
                  type="checkbox"
                  checked={selectedCoins.includes(each.id)}
                  onChange={() => toggleCoin(each.id)}
                />

                <img
                  src={each.logo}
                  alt={each.coin}
                  className="coin-icon"
                />

                <div>
                  <p className="coin-name">{each.coinName}</p>
                  <p className="coin-symbol">{each.coin}</p>
                </div>
              </div>

              <div className="right-section">
                <p className="amount">{each.totalHolding}</p>
                <p className="usd-value">
                  ₹ {each.currentPrice}
                </p>
              </div>

              <p>₹ {each.stcg.gain.toFixed(2)}</p>

              <p>₹ {each.ltcg.gain.toFixed(2)}</p>

              <p>
                {selectedCoins.includes(each.id)
                  ? each.totalHolding
                  : "-"}
              </p>
            </div>
          ))}

          {holdings.length > 5 && (
            <button
              type="button"
              className="important-notes-toggle"
              onClick={() => setViewAll(!viewAll)}
            >
              {viewAll ? "View Less" : "View All"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home