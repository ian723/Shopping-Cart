const axios = require("axios");
const dayjs = require("dayjs");
require("dotenv").config();

const baseUrl = "https://sandbox.safaricom.co.ke";
const shortcode = process.env.SHORTCODE;
const passkey = process.env.PASSKEY;
const timestamp = dayjs().format("YYYYMMDDHHmmss");
const lipaNaMpesaOnline = `${baseUrl}/mpesa/stkpush/v1/processrequest`;
const oauthUrl = `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`;
const callbackurl = process.env.CALLBACK_URL;
const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

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
    console.error(
      "Error getting access token:",
      error.response ? error.response.data : error.message
    );
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

  const password = Buffer.from(shortcode + passkey + timestamp).toString(
    "base64"
  );

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: shortcode,
    PhoneNumber: phoneNumber,
    CallBackURL: `${callbackurl}/callback`,
    AccountReference: "shopping-purchase",
    TransactionDesc: "Payment for testing",
  };

  console.log("Payload to M-Pesa:", JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(lipaNaMpesaOnline, payload, { headers });
    console.log("M-Pesa response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error initiating payment:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Payment initiation failed.");
  }
}

module.exports = {
  initiatePayment,
};
