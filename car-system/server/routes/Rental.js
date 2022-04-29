const express = require('express');
const router = express.Router();
const { Rental } = require('../models');

/*router.post("/", async (req, res) => {
    const rentalData = {
        Email: req.body.Email,
        Cost: req.body.Cost,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        CustomerCustomerID: req.body.CustomerCustomerID,
        VehicleRegPlate: req.body.RegPlate,
    }

    await Rental.create(rentalData);
    res.json(rentalData);
});
*/

module.exports = router;