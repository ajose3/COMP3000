const express = require('express');
const router = express.Router();
const { Customers } = require('../models');
const bcrypt = require('bcrypt');

const {sign} = require("jsonwebtoken");

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

  
router.post('/login',async(req,res,next)=>{
 const customer = await Customers.findOne({ where : {Email : req.body.Email }});
 if(customer){
    const password_valid = await bcrypt.compare(req.body.Password, customer.Password);
    if(password_valid){
      const accessToken = sign(
        { Email: customer.Email, CustomerID: customer.CustomerID },
        "importantsecret"
      );
      res.json(accessToken);
    } else {
      res.status(400).json({ error : "Password Incorrect" });
    }
  
  }else{
    res.status(404).json({ error : "User does not exist" });
  }
  
  });

module.exports = router;