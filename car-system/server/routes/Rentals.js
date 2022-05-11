const express = require('express');
const router = express.Router();
const { Rentals } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleWare");

// Reserve a vehicle
router.post("/", validateToken, async (req, res) => {

    const rentalData = {
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        PickUp: req.body.PickUp,
        DropOff: req.body.DropOff,
        Cost: req.body.Cost,
        Email: customer.Email,
    }

    const duplicate = await Rentals.findOne({ where: { Email: customer.Email, StartDate: req.body.StartDate, EndDate: req.body.EndDate } }).catch((err) => {
        console.log("Error: ", err);
    });

    if (duplicate) {
        return res.json({ error: "You have already booked a vehicle during this period!" });
    }

    const vehicleTaken = await Rentals.findOne({ where: { StartDate: req.body.StartDate, EndDate: req.body.EndDate, VehicleRegPlate: RegPlate } }).catch((err) => {
        console.log("Error: ", err);
    });

    if (vehicleTaken) {
        return res.json({ error: "Vehicle is not available!" });
    }

    await Rentals.create(rentalData);
    res.json(rentalData);


});

module.exports = router;