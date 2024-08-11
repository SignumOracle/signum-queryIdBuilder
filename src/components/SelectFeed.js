import React, { useState, useEffect } from 'react'
import '../styles/SelectFeed.css'
import { supportedDataHelper } from '../helpers'
import Clipboard from '../assets/copy.svg'
import copy from 'copy-to-clipboard'
import { CustomTooltip } from './reusableComponents/CustomTooltip'

function SelectFeed() {
  //Component State
  const [jsonString, setJsonString] = useState(null)
  const [queryData, setQueryData] = useState(null)
  const [queryId, setQueryId] = useState(null)
  const [tooltipOpen0, setTooltipOpen0] = useState(false)
  const [tooltipOpen1, setTooltipOpen1] = useState(false)
  const [tooltipOpen2, setTooltipOpen2] = useState(false)

  //useEffects resetting state on app load
  useEffect(() => {
    const objectToUse = supportedDataHelper('eth/usd')
    setJsonString(objectToUse[0])
    setQueryData(objectToUse[1])
    setQueryId(objectToUse[2])
    const target = document.getElementById('eth/usd')
    const classes = document.querySelectorAll('.RadioButtonInner')
    classes.forEach((el) => el.classList.remove('display'))
    target.classList.add('display')
    return () => {
      setJsonString(null)
      setQueryData(null)
      setQueryId(null)
    }
  }, [])

  //Helpers
  const handleTransition = () => {
    const container = document.querySelector('.TransitionContainer')
    container.classList.add('SelectionHidden')
    setTimeout(() => {
      container.classList.remove('SelectionHidden')
      container.classList.add('SelectionVisible')
    }, 300)
  }
  const handleGetIdFromSupported = (feed) => {
    handleTransition()
    const target = document.getElementById(feed)
    const classes = document.querySelectorAll('.RadioButtonInner')
    classes.forEach((el) => el.classList.remove('display'))
    target.classList.add('display')
    setTimeout(() => {
      const objectToUse = supportedDataHelper(feed)
      setJsonString(objectToUse[0])
      setQueryData(objectToUse[1])
      setQueryId(objectToUse[2])
    }, 305)
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
    <div className="SelectFeedContainer">
      <div className="RadioSelect">
        <div
          className="Selection"
          onClick={() => handleGetIdFromSupported('eth/usd')}
        >
          <div className="RadioButton">
            <div id="eth/usd" className="RadioButtonInner"></div>
          </div>
          <span>ETH/USD</span>
        </div>
        <div
          className="Selection"
          onClick={() => handleGetIdFromSupported('btc/usd')}
        >
          <div className="RadioButton">
            <div id="btc/usd" className="RadioButtonInner"></div>
          </div>
          <span>BTC/USD</span>
        </div>
        <div
          className="Selection"
          onClick={() => handleGetIdFromSupported('ampl/usd')}
        >
          <div className="RadioButton">
            <div id="ampl/usd" className="RadioButtonInner"></div>
          </div>
          <span>AMPL/USD</span>
        </div>
        <div
          className="Selection"
          onClick={() => handleGetIdFromSupported('uspce')}
        >
          <div className="RadioButton">
            <div id="uspce" className="RadioButtonInner"></div>
          </div>
          <span>USPCE</span>
        </div>
        <div
          className="Selection"
          onClick={() => handleGetIdFromSupported('trb/usd')}
        >
          <div className="RadioButton">
            <div id="trb/usd" className="RadioButtonInner"></div>
          </div>
          <span>TRB/USD</span>
        </div>
        <div
          className="Selection"
          onClick={() => handleGetIdFromSupported('eth/jpy')}
        >
          <div className="RadioButton">
            <div id="eth/jpy" className="RadioButtonInner"></div>
          </div>
          <span>ETH/JPY</span>
        </div>
        <div
          className="Selection"
          onClick={() => handleGetIdFromSupported('ohm/eth')}
        >
          <div className="RadioButton">
            <div id="ohm/eth" className="RadioButtonInner"></div>
          </div>
          <span>OHM/ETH</span>
        </div>
        <div
          className="Selection"
          onClick={() => handleGetIdFromSupported('vsq/usd')}
        >
          <div className="RadioButton">
            <div id="vsq/usd" className="RadioButtonInner"></div>
          </div>
          <span>VSQ/USD</span>
        </div>
        <div
          className="Selection"
          onClick={() => handleGetIdFromSupported('awsSpotPrice')}
        >
          <div className="RadioButton">
            <div id="awsSpotPrice" className="RadioButtonInner"></div>
          </div>
          <span>AWS SpotPrice</span>
        </div>
        <div
          className="Selection"
          onClick={() => handleGetIdFromSupported('bct/usd')}
        >
          <div className="RadioButton">
            <div id="bct/usd" className="RadioButtonInner"></div>
          </div>
          <span>BCT/USD</span>
        </div>
        <div
          className="Selection"
          onClick={() => handleGetIdFromSupported('dai/usd')}
        >
          <div className="RadioButton">
            <div id="dai/usd" className="RadioButtonInner"></div>
          </div>
          <span>DAI/USD</span>
        </div>
      </div>
      <div className="SelectFeedResults">
        <div className="TransitionContainer">
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
              id="1"
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
      </div>
    </div>
  )
}

export default SelectFeed
