const express = require('express');
const router = express.Router();
const { Vehicles } = require('../models');

// Get all vehicles
router.get("/", async (req, res) => {
    const listOfVehicles = await Vehicles.findAll();
    res.json(listOfVehicles);
});

// Get individual vehicles
router.get("/byReg/:RegPlate", async (req, res) => {
    const RegPlate = req.params.RegPlate;
    const vehicle = await Vehicles.findByPk(RegPlate);
    res.json(vehicle);
});

// Create a vehicle
router.post("/", async (req, res) => {
    const vehicle = req.body;
    await Vehicles.create(vehicle);
    res.json(vehicle);
});

// Get vehicle with 5 seats
router.get("/5seats", async (req, res) => {
    const vehicles = await Vehicles.findAll({
        where: {
            CarSeats: "5"
        }
    });
    res.json(vehicles);
});

// Get vehicle with 4 seats
router.get("/4seats", async (req, res) => {
    const vehicles = await Vehicles.findAll({
        where: {
            CarSeats: "4"
        }
    });
    res.json(vehicles);
});

// Get vehicle with 2 seats
router.get("/2seats", async (req, res) => {
    const vehicles = await Vehicles.findAll({
        where: {
            CarSeats: "2"
        }
    });
    res.json(vehicles);
});

// Edit Vehicle NEEDS WORKING..........
router.put("/editVehicle/:RegPlate", async (req, res) => {
    
    const RegPlate = req.params.RegPlate;

    const { CarMake, CarModel, CarYear, CarImage, CarPrice, CarCategory, CarTransmission, CarSeats, } = req.body;

    const vehicle = await Vehicles.findOne({ where : {RegPlate : RegPlate }});

    if (vehicle) {
        Vehicles.update(
            { CarMake: CarMake, CarModel: CarModel, CarYear: CarYear, CarImage: CarImage, CarPrice: CarPrice, CarCategory: CarCategory, CarTransmission: CarTransmission, CarSeats: CarSeats },
            { where: { RegPlate: RegPlate }}
        );
        return res.json("Success");
    }

    return res.json("Error");
});


// Delete Vehicle
router.delete('/:RegPlate', async (req, res) => {
    const { RegPlate } = req.params;

    const row = await Vehicles.findOne({
        where: { RegPlate: RegPlate },
      }).catch((err) => {
        console.log("Error: ", err);
    });
      
      if (row) {
        await row.destroy(); // deletes the row
      }

      res.json("Deleted successfully!")

});

module.exports = router;