const express = require('express');
const router = express.Router();
const { Billing } = require('../models');

// Get all vehicles
router.get("/", async (req, res) => {
    const listOfBills = await Billing.findAll();
    res.json(listOfBills);
});

router.post("/", async (req, res) => {
    const data = {Cost: req.body.Cost};
    await Billing.create(data);
    res.json(data);
});

module.exports = router;