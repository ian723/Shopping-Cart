const axios = require("axios");
const querystring = require("querystring");

const baseUrl = "https://sandbox.safaricom.co.ke"
const shortcode = "N/A";
const lipaNaMpesaOnline = `${baseUrl}/mpesa/stkpush/v1/processrequest`;
const oauthUrl = `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`;
const consumerKey = "ASR06QGXhcMlTek7drzNxfj6wuURDYGu8iOG88MY0pIeEKY5";
const consumerSecret = "EEWHFtM12jcu7GH50oQ4Aj40fuJFOFLit5FuCF6aqMerisHPSAxDGvCH29tdzjoe";

async function getAccessToken() {
  const response = await axios.get(oauthUrl, {
    auth: {
      username: consumerKey,
      password: consumerSecret,
    },
  });
  return response.data.access_token;
}

async function initiatePayment(phoneNumber, amount) {
  const accessToken = await getAccessToken();
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const payload = {
    BusinessShortCode: shortcode,
    Password: Buffer.from(
      `${shortcode}YOUR_LIPA_NA_MPESA_ONLINE_PASSWORD${new Date()
        .toISOString()
        .replace(/[-:.]/g, "")}`
    ).toString("base64"),
    Timestamp: new Date().toISOString().replace(/[-:.]/g, ""),
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: shortcode,
    PhoneNumber: phoneNumber,
    CallBackURL: "YOUR_CALLBACK_URL",
    AccountReference: "Test123",
    TransactionDesc: "Payment for testing",
  };

  try {
    const response = await axios.post(lipaNaMpesaOnline, payload, { headers });
    return response.data;
  } catch (error) {
    console.error("Error initiating payment:", error.response.data);
    throw error;
  }
}

module.exports = {
  initiatePayment,
};
