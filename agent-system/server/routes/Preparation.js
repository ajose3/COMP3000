const express = require('express');
const router = express.Router();
const { Preparation } = require('../models');

router.get("/:RentingID", async (req, res) => {
    const RentingID = req.params.RentingID;

    const preparation = await Preparation.findAll({
        where: {
            RentalRentingID: RentingID
        }
    });
    res.json(preparation);
});

router.put("/:RentingID", async (req, res) => {

    const data = {
        VehicleReadyDate: req.body.VehicleReadyDate,
        PickUp: req.body.PickUp,
        DropOff: req.body.DropOff,
        Status: req.body.Status,
    }
    
    const RentingID = req.params.RentingID;
    data.RentalRentingID = RentingID;

    await Preparation.create(data);
    res.json(data);

});

// Prepare a vehicle
router.post("/:RentingID", async (req, res) => {

    const data = {
        VehicleReadyDate: req.body.VehicleReadyDate,
        PickUp: req.body.PickUp,
        DropOff: req.body.DropOff,
        Status: req.body.Status,
    }
    
    const RentingID = req.params.RentingID;
    data.RentalRentingID = RentingID;

    await Preparation.create(data);
    res.json(data);

});


module.exports = router;