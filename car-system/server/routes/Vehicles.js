const express = require('express');
const router = express.Router();
const { Vehicles } = require('../models');

router.get("/", async (req, res) => {
    const listOfVehicles = await Vehicles.findAll();
    res.json(listOfVehicles);
});

router.get("/byReg/:RegPlate", async (req, res) => {
    const RegPlate = req.params.RegPlate;
    const vehicle = await Vehicles.findByPk(RegPlate);
    res.json(vehicle);
});

router.post("/", async (req, res) => {
    const vehicle = req.body;
    await Vehicles.create(vehicle);
    res.json(vehicle);
});

module.exports = router;