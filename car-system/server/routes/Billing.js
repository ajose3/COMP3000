const express = require('express');
const router = express.Router();
const { Billing } = require('../models');

router.post("/", async (req, res) => {
    const data = {Cost: req.body.Cost};
    await Billing.create(data);
    res.json(data);
});

module.exports = router;