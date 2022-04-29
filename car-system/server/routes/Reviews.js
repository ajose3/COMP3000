const express = require('express');
const router = express.Router();
const { Reviews } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleWare");

// Get reviews for each car
router.get("/:RegPlate", async (req, res) => {
    const RegPlate = req.params.RegPlate;
    const reviews = await Reviews.findAll({ where: { VehicleRegPlate: RegPlate }});
    res.json(reviews);
});

// Posts customer details when submitting a review
router.post("/", validateToken, async (req, res) => {
    const review = req.body;
    const Email = req.customer.Email;
    review.Email = Email;
    await Reviews.create(review);
    res.json(review);
});

// Deleting a review
router.delete("/:reviewId", validateToken, async (req, res) => {
    const reviewId = req.params.reviewId;
  
    await Reviews.destroy({
      where: {
        id: reviewId,
      },
    });
  
    res.json("DELETED SUCCESSFULLY");
  });

module.exports = router;