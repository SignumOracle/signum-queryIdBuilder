import React, { useState, useEffect } from 'react'
import './App.css'
import TellorLogo from './assets/signum_logo.png'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SelectFeed from './components/SelectFeed'
import CustomFeed from './components/CustomFeed'
import SpotPrice from './components/SpotPrice'
import AWSSpotPrice from './components/AWSSpotPrice'
import DivaProtocolPolygon from './components/DivaProtocolPolygon'
import LeagueDAO from './components/LeagueDAO'
import LegacyRequest from './components/LegacyRequest'
import DataDecoder from './components/DataDecoder'

function App() {


  //useEffect for routing
  useEffect(() => {
    if (
      window.location.href.includes('/awsspotprice') ||
      window.location.href.includes('/custom') ||
      window.location.href.includes('/divaprotocolpolygon') ||
      window.location.href.includes('/datadecoder') ||
      window.location.href.includes('/leaguedao') ||
      window.location.href.includes('/legacyrequest') ||
      window.location.href.includes('/spotprice')
    ) {
     
    }
  }, [])



  return (
    <div className="App">
      <nav className="Nav">
        <a href="https://signum.win/">
          <img src={TellorLogo} style={{width: "100px"}} alt="TellorLogo" />
        </a>
      </nav>
      <div className="BodyContainer">
        <h1 className="BodyHeader">Query ID Station</h1>
        <p className="BodyDescription">
        A 'query id' is the unique identifier of a 'query type' for data that's requested, 
          reported, and retrieved by Signum oracles. Use the tools below to generate a query id for your data, or decode an already submitted value. <br></br><br></br>For 
          a more detailed explanation of queries, see {' '}
          <a
            className="DescriptionLink"
            href="https://github.com/AvantgardeBlockchainSolutions/signum-dataSpecs"
            target="_blank"
            rel="noopener noreferrer"
          >
            this 'data specs' repo
          </a>
            .
        </p>
        
        <Router>
          <div className="HeroNavLinks">
            
            
          </div>
          <div className="HeroSection">
            <Routes>
            <Route path="/" element={<SpotPrice />} /> {/* Set the SpotPrice component as the default route */}
  <Route path="/spotprice" element={<SpotPrice />} />
              <Route path="/awsspotprice" element={<AWSSpotPrice />} />
              <Route path="/custom" element={<CustomFeed />} />
              <Route
                path="/divaprotocolpolygon"
                element={<DivaProtocolPolygon />}
              />
              <Route path="/leaguedao" element={<LeagueDAO />} />
              <Route path="/legacyrequest" element={<LegacyRequest />} />
              <Route path="/datadecoder" element={<DataDecoder />} />
            </Routes>
          </div>
        </Router>
    
      </div>
    </div>
  )
}

export default App
