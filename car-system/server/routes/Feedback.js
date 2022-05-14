const express = require('express');
const router = express.Router();
const { Feedback } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleWare");

// Get reviews for each car
router.get("/:RegPlate", async (req, res) => {
    const RegPlate = req.params.RegPlate;
    const feedback = await Feedback.findAll({ where: { VehicleRegPlate: RegPlate }});
    res.json(feedback);
});

// Posts customer details when submitting a review
router.post("/:RegPlate", validateToken, async (req, res) => {

    const review = req.body;
    const FirstName = req.customer.FirstName;
    review.FirstName = FirstName;
    
    
    
    const feedback = req.body;

    const Email = req.customer.Email;
    feedback.Email = Email;
    const CustomerID = req.customer.CustomerID;
    feedback.CustomerCustomerID = CustomerID;
    //const VehicleRegPlate = req.params.RegPlate;
    await Feedback.create(feedback);
    res.json(feedback);
});

module.exports = router;