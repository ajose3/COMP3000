const express = require('express');
const router = express.Router();
const { Reviews } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleWare");

router.get("/:RegPlate", async (req, res) => {
    const RegPlate = req.params.RegPlate;
    const reviews = await Reviews.findAll({ where: { VehicleRegPlate: RegPlate }});
    res.json(reviews);
});

router.post("/", validateToken, async (req, res) => {
    const review = req.body;
    await Reviews.create(review);
    res.json(review);
});

module.exports = router;