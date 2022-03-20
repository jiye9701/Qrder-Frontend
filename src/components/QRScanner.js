import React, { Component } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin.jsx";
import logoPNG from "../images/qrder-logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { QrReader } from 'react-qr-reader';

const QRScanner = () => {
  const navigate = useNavigate();
  const [decordedText, setText] = useState("");
  const [qrData, setQrData] = useState('');

  useEffect(() => {
    // if (decordedText === "123qweasd") {
    // Here we have to go to a specific restaurant based on its ID
    // navigate("/product");
    //navigate(`/product/${decordedText}`);
    // }
    if (!!qrData) {
      navigate(qrData);
    }
  }, [ qrData ]);

  const onNewScanResult = (decordedText, decodedResult) => {
    console.log("App [result]", decodedResult.decordedText);
    console.log("Decoded Text is", decordedText);
    navigate(`/tables/${decordedText}`);

    //setText(decordedText);

    // let decodedResults = this.state.decodedResults;
    // decodedResults.push(decodedResult);
    // this.setState((state, props) => {
    //   state.decodedResults.push(decodedResult);
    //   // navigate("/home");
    //   return state;
    // });
  };

  return (
    <div className="App">
      <img alt="Qrder Logo" className="logo" src={logoPNG} />
      &nbsp;&nbsp;
      <section className="App-section">
        {/* <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        /> */}
        <QrReader
          onResult={(result, error) => {
            if(!!result) {
              setQrData(result?.text);
            }
            
          }}
          style={{ width: '50%' }}
          />
      </section>
      &nbsp;
      <div className="item-center">
        <NavLink to="/product" className="btn text-center">
          {" "}
          View Menu{" "}
        </NavLink>
      </div>
    </div>
  );
};

export default QRScanner;
