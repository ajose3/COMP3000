const express = require('express');
const router = express.Router();
const { Customers } = require('../models');
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    const { Email, Password } = req.body;
    bcrypt.hash(Password, 10).then((hash) => {
        Customers.create({
            Email: Email,
            Password: hash,
        });
        res.json("SUCCESS");
    });
});
// Watch from  14:30
module.exports = router;