const axios = require("axios");

const baseUrl = "https://sandbox.safaricom.co.ke";
const shortcode = "";
const lipaNaMpesaOnline = `${baseUrl}/mpesa/stkpush/v1/processrequest`;
const oauthUrl = `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`;

// Replace with your actual consumer key and secret
const consumerKey = "ASR06QGXhcMlTek7drzNxfj6wuURDYGu8iOG88MY0pIeEKY5"; 
const consumerSecret = "EEWHFtM12jcu7GH50oQ4Aj40fuJFOFLit5FuCF6aqMerisHPSAxDGvCH29tdzjoe";

// Function to get the access token
async function getAccessToken() {
  try {
    const response = await axios.get(oauthUrl, {
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error.response ? error.response.data : error.message);
    throw new Error("Could not retrieve access token.");
  }
}

// Function to initiate payment
async function initiatePayment(phoneNumber, amount) {
  const accessToken = await getAccessToken();
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const password = Buffer.from(
    `${shortcode}MY_LIPA_NA_MPESA_ONLINE_PASSWORD${new Date().toISOString().replace(/[-:]/g, "").slice(0, 14)}`
  ).toString("base64");

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: new Date().toISOString().replace(/[-:]/g, "").slice(0, 14),
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: shortcode,
    PhoneNumber: phoneNumber,
    CallBackURL: "MY_CALLBACK_URL",
    AccountReference: "Test123",
    TransactionDesc: "Payment for testing",
  };

  console.log("Payload to M-Pesa:", JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(lipaNaMpesaOnline, payload, { headers });
    console.log("M-Pesa response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error initiating payment:", error.response ? error.response.data : error.message);
    throw new Error("Payment initiation failed.");
  }
}

module.exports = {
  initiatePayment,
};
