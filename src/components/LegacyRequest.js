import React, { useState } from 'react'
import '../styles/LegacyRequest.css'
import '../styles/Button.css'
import RadioButtonCreateNew from './reusableComponents/RadioSelectCreateNew'
import Clipboard from '../assets/copy.svg'
import { ethers } from 'ethers'
import copy from 'copy-to-clipboard'
import { CustomTooltip } from './reusableComponents/CustomTooltip'

const initialFormState = {
  requestId: '',
}

const LegacyRequest = () => {
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
  const handleGetLegacyRequestId = () => {
    setErrMessage(null)
    try {
      const jsonStringToUse = JSON.stringify(
        `{ type: "LegacyRequest", requestId: "${parseInt(form.requestId)}" }`
      )
      const queryDataArg = abiCoder.encode(
        ['uint256'],
        [parseInt(form.requestId)]
      )
      const queryData = abiCoder.encode(
        ['string', 'bytes'],
        ['LegacyRequest', queryDataArg]
      )
      const queryId = ethers.utils.keccak256(queryData)
      setJsonString(jsonStringToUse)
      setQueryData(queryData)
      setQueryId(queryId)
      setForm(initialFormState)
      setShowResults(true)
    } catch (err) {
      // console.log(err)
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
    <div className="CreateNewLegacyRequestContainer">
      <RadioButtonCreateNew props="LegacyRequest" />
      <div className="LegacyRequestHeroContainer">
        <div className="LegacyRequestHero">
          <div className="LegacyRequestJSON">
            <p>
              &#123;<span>"type": </span>"LegacyRequest",{' '}
              <span>"requestId": </span>
            </p>
            <input
              onChange={handleChange}
              value={form.requestId}
              name="requestId"
              id="requestId"
              type="text"
              className="LegacyRequestInput"
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
            disabled={form.requestId ? false : true}
            className={form.requestId ? 'Button' : 'ButtonDisabled'}
            onClick={handleGetLegacyRequestId}
          >
            Generate ID
          </button>
        </div>
        {showResults ? (
          <div className="LegacyRequestResults">
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

export default LegacyRequest
