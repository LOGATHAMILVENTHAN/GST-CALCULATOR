import { useState } from 'react';
import './App.css';

function App() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [gstRate, setGstRate] = useState("");
  const [gstType, setGstType] = useState("exclusive");
  const [gstAmount, setGstAmount] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [igst, setIgst] = useState(null);
  const [cgst, setCgst] = useState(null);
  const [sgst, setSgst] = useState(null);

  const calculateGST = () => {
    
    const price = parseFloat(originalPrice);
    const rate = parseFloat(gstRate);

    if (isNaN(price) || isNaN(rate) || price <= 0 || rate <= 0) {
      return; // Invalid input, no calculation
    }

    let calculatedGstAmount;
    let calculatedTotalPrice;

    if (gstType === "exclusive") {
      // Tax exclusive: original price does not include GST
      calculatedGstAmount = (price * rate) / 100;
      calculatedTotalPrice = price + calculatedGstAmount;
    } else if (gstType === "inclusive") {
      // Tax inclusive: original price includes GST
      calculatedGstAmount = (price * rate) / (100 + rate);
      calculatedTotalPrice = price - calculatedGstAmount;
    }

    // IGST, CGST, SGST calculation
    const igstValue = gstType === "exclusive" ? (calculatedGstAmount) : (calculatedTotalPrice * rate) / (100 + rate);
    const cgstValue = gstType === "exclusive" ? (calculatedGstAmount / 2) : (calculatedTotalPrice * rate) / (2 * (100 + rate));
    const sgstValue = gstType === "exclusive" ? (calculatedGstAmount / 2) : (calculatedTotalPrice * rate) / (2 * (100 + rate));

    setGstAmount(calculatedGstAmount.toFixed(2));
    setTotalPrice(calculatedTotalPrice.toFixed(2));
    setIgst(igstValue.toFixed(2));
    setCgst(cgstValue.toFixed(2));
    setSgst(sgstValue.toFixed(2));
  };

  return (
    <div className="gst-container">
      <h1 className="gst">GST CALCULATOR</h1>
      <div className="input-group">
        <h2>Original Price (₹)</h2>
        <input
          type="number"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
          placeholder="Enter original price"
        />
      </div>
      <div className="input-group">
        <h2>GST Rate (%)</h2>
        <input
          type="number"
          value={gstRate}
          onChange={(e) => setGstRate(e.target.value)}
          placeholder="Enter GST rate"
        />
      </div>

      <div className="radio-group">
        <h2>
          <input
            type="radio"
            name="gst-type"
            value="exclusive"
            checked={gstType === "exclusive"}
            onChange={() => setGstType("exclusive")}
          />
          Tax Exclusive
        </h2>
        <h2>
          <input
            type="radio"
            name="gst-type"
            value="inclusive"
            checked={gstType === "inclusive"}
            onChange={() => setGstType("inclusive")}
          />
          Tax Inclusive
        </h2>
      </div>

      <button className="submit-btn" onClick={calculateGST}>
        Calculate GST
      </button>

      {gstAmount !== null && totalPrice !== null && (
        <div className="result">
          <h3>GST Amount: ₹{gstAmount}</h3>
          <h3>Total Price (after GST): ₹{totalPrice}</h3>
          <h3>IGST: ₹{igst}</h3>
          <h3>CGST: ₹{cgst}</h3>
          <h3>SGST: ₹{sgst}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
