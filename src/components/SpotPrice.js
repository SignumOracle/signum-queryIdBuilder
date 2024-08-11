import React, { useState } from 'react'
import '../styles/SpotPrice.css'
import '../styles/Button.css'
import RadioButtonCreateNew from './reusableComponents/RadioSelectCreateNew'
import Clipboard from '../assets/copy.svg'
import { ethers } from 'ethers'
import copy from 'copy-to-clipboard'
import { CustomTooltip } from './reusableComponents/CustomTooltip'

const initialFormState = {
  asset: '',
  currency: '',
}

const SpotPrice = () => {
  //Component State
  const [form, setForm] = useState(initialFormState)
  const [jsonString, setJsonString] = useState()
  const [queryData, setQueryData] = useState()
  const [queryId, setQueryId] = useState()
  const [showResults, setShowResults] = useState(false)
  const [tooltipOpen0, setTooltipOpen0] = useState(false)
  const [tooltipOpen1, setTooltipOpen1] = useState(false)
  const [tooltipOpen2, setTooltipOpen2] = useState(false)
  const [currentAsset, setCurrentAsset] = useState('')
  //Globals
  const abiCoder = new ethers.utils.AbiCoder()

  //Helpers
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
    console.log(event.target.value)
  }
  const handleGetSpotPriceId = () => {
    const jsonStringToUse = JSON.stringify(
      `{ type: "SpotPrice", asset: "${form.asset
        .toString()
        .toLowerCase()}", currency: "${form.currency
        .toString()
        .toLowerCase()}" }`
    )
    const queryDataArgs = abiCoder.encode(
      ['string', 'string'],
      [
        form.asset.toString().toLowerCase(),
        form.currency.toString().toLowerCase(),
      ]
    )
    const queryData = abiCoder.encode(
      ['string', 'bytes'],
      ['SpotPrice', queryDataArgs]
    )
    const queryId = ethers.utils.keccak256(queryData)
    setJsonString(jsonStringToUse)
    setQueryData(queryData)
    setQueryId(queryId)
    setForm(initialFormState)
    setShowResults(true)
    setCurrentAsset(form.asset)
  }
  //Clipboard Functions
  //Can both be consolidated at
  //higher level later.
  const copyToClipboard = (text) => {
    if (typeof text === 'object') {
      copy(text.join(''))
    } else {
      copy(text)
    }
  }
  const clipboardConsolidator = (content, num) => {
    switch (num) {
      case '0':
        setTooltipOpen0(true)
        copyToClipboard(content)
        setTimeout(() => {
          setTooltipOpen0(false)
        }, 2000)
        break
      case '1':
        setTooltipOpen1(true)
        copyToClipboard(content)
        setTimeout(() => {
          setTooltipOpen1(false)
        }, 2000)
        break
      case '2':
        setTooltipOpen2(true)
        copyToClipboard(content)
        setTimeout(() => {
          setTooltipOpen2(false)
        }, 2000)
        break
      default:
        return
    }
  }

  return (
    
    <div className="CreateNewSpotPriceContainer">
      <RadioButtonCreateNew props="SpotPrice" />
      <div className="SpotPriceHeroContainer">
        <div className="SpotPriceHero">
          <div className="SpotPriceJSON">
            <p>
              &#123;<span>"type": </span>"SpotPrice", <span>"asset": </span>
            </p>
            <input
              onChange={handleChange}
              value={form.asset}
              name="asset"
              id="asset"
              type="text"
              className="SpotPriceInput"
              placeholder="eth"
            />
            <p>
              , <span>"currency": </span>
            </p>
            <input
              onChange={handleChange}
              value={form.currency}
              name="currency"
              id="currency"
              type="text"
              className="SpotPriceInput"
              placeholder="usd"
            />
            <p>&#125;</p>
          </div>
          <button
            disabled={form.asset && form.currency ? false : true}
            className={
              form.asset && form.currency ? 'Button' : 'ButtonDisabled'
            }
            onClick={handleGetSpotPriceId}
          >
            Generate ID
          </button>
        </div>
        {showResults ? (
          <div className="SpotPriceResults">
            <div className="ResultTitle">
              <p>Query Descriptor:</p>
              <CustomTooltip
                open={tooltipOpen0}
                title="Copied!"
                placement="right"
                arrow
              >
                <img
                  src={Clipboard}
                  alt="copyToClipboardIcon"
                  className="CopyToClipboardIcon"
                  onClick={() =>
                    clipboardConsolidator(JSON.parse(jsonString), '0')
                  }
                />
              </CustomTooltip>
            </div>
            <p className="ResultContent">
              {jsonString ? JSON.parse(jsonString) : ''}
            </p>
            <div className="ResultTitle">
              <p>Query Data (Bytes):</p>
              <CustomTooltip
                open={tooltipOpen1}
                title="Copied!"
                placement="right"
                arrow
              >
                <img
                  src={Clipboard}
                  alt="copyToClipboardIcon"
                  className="CopyToClipboardIcon"
                  onClick={() => clipboardConsolidator(queryData, '1')}
                />
              </CustomTooltip>
            </div>
            <p className="ResultContent">{queryData ? queryData : ''}</p>
            <div className="ResultTitle">
              <p>Query ID (Hash):</p>
              <CustomTooltip
                open={tooltipOpen2}
                title="Copied!"
                placement="right"
                arrow
              >
                <img
                  src={Clipboard}
                  alt="copyToClipboardIcon"
                  className="CopyToClipboardIcon"
                  onClick={() => clipboardConsolidator(queryId, '2')}
                />
              </CustomTooltip>
            </div>
            <p className="ResultContent">{queryId ? queryId : ''}</p>
            </div>
        ) : null}
      </div>
    </div>
  )
}

export default SpotPrice
//JSON.parse(jsonString)