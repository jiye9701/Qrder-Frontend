import { useRef } from "react";
import logoPNG from "../images/qrder-logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import QrReader from 'react-qr-reader';
import { Button, Col } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
const QRScanner = () => {
  const navigate = useNavigate();
  const [qrData, setQrData] = useState('');
  const qrRef = useRef(null);

  useEffect(() => {
    if (!!qrData) {
      navigate(qrData);
    }
  }, [ qrData ]);

  
  const handleScanQrButton = () => {
    qrRef.current.openImageDialog();
  } 

  const handleScan= (result) => {
    if(result) {
      setQrData(result);
    }
  }

  const handleScanError = (error) => {
    console.log(error);
  }

  return (
    <div className="App">
      <img alt="Qrder Logo" className="logo-custom" src={logoPNG} />
      &nbsp;&nbsp;

      
      <Container>
      <Row style={{ padding: '1em' }}>
        <Col/>
        <Col xs='auto' md='auto' ls='auto'>
          Scan the Restaurant's QR Code to Begin Ordering!
        </Col>
        <Col/>
      </Row>
      <Row >
            <QrReader
              delay={300}
              style={{width: '100%'}}
              onError={handleScanError}
              onScan={handleScan} />

      </Row>
      <Row style={{ padding: '5em'}}>
      <Col />
      <Col xs='auto' md='auto' ls='auto' >
        <Button onClick={handleScanQrButton}>Scan From Image File</Button>
      </Col>
      <Col />
      </Row>
      <Row>
        <QrReader
          id='fileScanner'
          ref={qrRef}
          delay={300}
          style={{display: 'none'}}
          onError={handleScanError}
          onScan={handleScan}
          legacyMode />
      </Row>
      </Container>
    </div>
  );
};

export default QRScanner;
