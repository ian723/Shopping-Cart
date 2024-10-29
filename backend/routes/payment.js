const express = require('express');
const router = express.Router();
const mpesaService = require('../services/mpesaService');

router.post('/pay', async (req, res) => {
    const { phoneNumber, amount } = req.body;
    try {
        const paymentResponse = await mpesaService.initiatePayment(phoneNumber, amount);
        res.json(paymentResponse);
    } catch (error) {
        res.status(500).json({ error: 'Payment initiation failed' });
    }
});

module.exports = router;
