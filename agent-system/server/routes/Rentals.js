const express = require('express');
const router = express.Router();
const { Rentals, sequelize } = require('../models');

// Get All Rent
router.get("/", async (req, res) => {
    const listOfReservations = await Rentals.findAll();
    res.json(listOfReservations);
});

router.get("/status/:RegPlate", async (req, res) => {
    const RegPlate = req.params.RegPlate;
    const StartDate = req.body.StartDate;
    const EndDate = req.body.EndDate;

    

    const notAvaialble = Rentals.findOne({
        where: {
            StartDate: StartDate,
            EndDate: EndDate,
            VehicleRegPlate: RegPlate            
        }
        
    }).catch((err) => {
        console.log("Error: ", err);
    });

    if (notAvaialble) {
        return res.json({ message: "Available" });
    } 

    //return res.json({ error: "Not Available" });
    
   // if (!notAvaialble) {
     //   return res.json({ message: "Available"});
    //}
    
});

// View all Customer rentals
router.get("/:CustomerID", async (req, res) => {
    const CustomerID = req.params.CustomerID;

    const rentals = await Rentals.findAll({
        where: {
            CustomerCustomerID: CustomerID
        }
    });
    res.json(rentals);
});

router.get("/getInfo/:RentingID", async (req, res) => {
    const RentingID = req.params.RentingID;

    const rentals = await Rentals.findAll({
        where: {
            RentingID: RentingID
        }
    });
    res.json(rentals);
});

// Reserve a vehicle
router.post("/:RegPlate", async (req, res) => {

    const data = {
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        PickUp: req.body.PickUp,
        DropOff: req.body.DropOff,
        Cost: req.body.Cost,
    }

    const Email = req.customer.Email;
    data.Email = Email;
    const CustomerID = req.customer.CustomerID;
    data.CustomerCustomerID = CustomerID;
    const VehicleRegPlate = req.params.RegPlate;
    data.VehicleRegPlate = VehicleRegPlate;
    await Rentals.create(data);
    res.json(data);

});

// Deleting a review
router.delete("/:RentingID", async (req, res) => {
    const { RentingID } = req.params;

    const row = await Rentals.findOne({
        where: { RentingID: RentingID },
      }).catch((err) => {
        console.log("Error: ", err);
    });
      
      if (row) {
        await row.destroy(); // deletes the row
      }

      res.json("Deleted successfully!")
});

module.exports = router;