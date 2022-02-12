import React, { Component } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin.jsx";
import logoPNG from "../images/qrder-logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export class QRCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decodedResults: [],
    };

    // This binding is necessary to make `this` work in the callback.
    this.onNewScanResult = this.onNewScanResult.bind(this);
  }

  render() {
    return (
      <div className="App">
        <img alt="Qrder Logo" className="logo" src={logoPNG} />
        &nbsp;&nbsp;
        <section className="App-section">
          <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={this.onNewScanResult}
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
  }

  // Redirect to the menu page - WIP
  onNewScanResult(decodedText, decodedResult) {
    console.log("App [result]", decodedResult.decodedText);
    console.log("Decoded Text is", decodedText);

    // const navigate = useNavigate();

    // let decodedResults = this.state.decodedResults;
    // decodedResults.push(decodedResult);
    this.setState((state, props) => {
      state.decodedResults.push(decodedResult);
      return state;
    });
  }
}

export default QRCode;
