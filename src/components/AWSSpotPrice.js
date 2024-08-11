import React, { useState } from 'react'
import '../styles/AWSSpotPrice.css'
import '../styles/Button.css'
import RadioButtonCreateNew from './reusableComponents/RadioSelectCreateNew'
import { ethers } from 'ethers'
import copy from 'copy-to-clipboard'
import Clipboard from '../assets/copy.svg'
import { CustomTooltip } from './reusableComponents/CustomTooltip'

const initialFormState = {
  zone: '',
  instance: '',
}

const AWSSpotPrice = () => {
  //Component State
  const [form, setForm] = useState(initialFormState)
  const [jsonString, setJsonString] = useState()
  const [queryData, setQueryData] = useState()
  const [queryId, setQueryId] = useState()
  const [showResults, setShowResults] = useState(false)
  const [errMessage, setErrMessage] = useState(null)
  const [tooltipOpen0, setTooltipOpen0] = useState(false)
  const [tooltipOpen1, setTooltipOpen1] = useState(false)
  const [tooltipOpen2, setTooltipOpen2] = useState(false)
  //Globals
  const abiCoder = new ethers.utils.AbiCoder()

  //Helpers
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const handleGetAWSSpotPriceId = () => {
    setErrMessage(null)
    try {
      const jsonStringToUse = JSON.stringify(
        `{ type: "AWSSpotPrice", zone: "${form.zone
          .toString()
          .toLowerCase()}", instance: "${form.instance
          .toString()
          .toLowerCase()}" }`
      )
      const queryDataArgs = abiCoder.encode(
        ['string', 'string'],
        [
          form.zone.toString().toLowerCase(),
          form.instance.toString().toLowerCase(),
        ]
      )
      const queryData = abiCoder.encode(
        ['string', 'bytes'],
        ['AWSSpotPrice', queryDataArgs]
      )
      const queryId = ethers.utils.keccak256(queryData)
      setJsonString(jsonStringToUse)
      setQueryData(queryData)
      setQueryId(queryId)
      setForm(initialFormState)
      setShowResults(true)
    } catch (err) {
      //console.log(err)
      setErrMessage(err.message)
      setShowResults(false)
    }
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
    <div className="CreateNewAWSSpotPriceContainer">
      <RadioButtonCreateNew props="AWSSpotPrice" />
      <div className="AWSSpotPriceHeroContainer">
        <div className="AWSSpotPriceHero">
          <div className="AWSSpotPriceJSON">
            <p>
              &#123;<span>"type": </span>"AWSSpotPrice", <span>"zone": </span>
            </p>
            <input
              onChange={handleChange}
              value={form.zone}
              name="zone"
              id="zone"
              type="text"
              className="AWSSpotPriceInput"
            />
            <p>
              , <span>"instance": </span>
            </p>
            <input
              onChange={handleChange}
              value={form.instance}
              name="instance"
              id="instance"
              type="text"
              className="AWSSpotPriceInput"
            />
            <p>&#125;</p>
          </div>
          {errMessage ? (
            <div className="ErrorMessage">
              <span>ERROR: </span>
              {errMessage}
            </div>
          ) : null}
          <button
            disabled={form.zone && form.instance ? false : true}
            className={form.zone && form.instance ? 'Button' : 'ButtonDisabled'}
            onClick={handleGetAWSSpotPriceId}
          >
            Generate ID
          </button>
        </div>
        {showResults ? (
          <div className="AWSSpotPriceResults">
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

export default AWSSpotPrice
