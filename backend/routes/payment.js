const express = require("express");
const router = express.Router();
const mpesaService = require("../services/mpesaService");

router.post("/pay", async (req, res) => {
  const { phoneNumber, amount } = req.body;
  console.log("Received payment request:", { phoneNumber, amount });

  try {
    const paymentResponse = await mpesaService.initiatePayment(
      phoneNumber,
      amount
    );
    res.json(paymentResponse);
  } catch (error) {
    console.error("Payment initiation error:", error.message);
    res.status(500).json({ error: "Payment initiation failed" });
  }
});

router.post("/callback", async (req, res) => {
  console.log({ message: res.body });
});

module.exports = router;
