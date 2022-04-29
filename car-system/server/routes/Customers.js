const express = require('express');
const router = express.Router();
const { Customers } = require('../models');
const bcrypt = require('bcrypt');
const { validateToken } = require("../middlewares/AuthMiddleWare"); 
const {sign} = require("jsonwebtoken");

/*router.post("/", async (req, res) => {
    const { Email, Password } = req.body;
    bcrypt.hash(Password, 10).then((hash) => {
        Customers.create({
            Email: Email,
            Password: hash,
        });
        res.json("SUCCESS");
    });
});*/

// Register Customer
router.post('/', (req, res) => {
  const userData = {
      Email: req.body.Email,
      Password: req.body.Password,
  }

  Customers.findOne({
      where: {
          Email: req.body.Email
      }
  })
      .then(user => {
          if (!user) {
              bcrypt.hash(req.body.Password, 10, (err, hash) => {
              userData.Password = hash
              Customers.create(userData)
                  .then(user => {
                      res.json({ status: user.Email + 'REGISTERED' })
                  })
                  .catch(err => {
                      res.send('ERROR: ' + err)
                  })
              })
          } else {
              res.json({ error: "USER ALREADY EXISTS" })
          }
      })
      .catch(err => {
          res.send('ERROR: ' + err)
      })
})

// Login Customer
router.post('/login',async(req,res,next)=>{
 const customer = await Customers.findOne({ where : {Email : req.body.Email }});
 if(customer){
    const password_valid = await bcrypt.compare(req.body.Password, customer.Password);
    if(password_valid){
      const accessToken = sign(
        { Email: customer.Email, CustomerID: customer.CustomerID },
        "importantsecret"
      );
      res.json({token: accessToken, Email: customer.Email, CustomerID: customer.CustomerID});
    } else {
      res.status(400).json({ error : "Password Incorrect" });
    }
  
  }else{
    res.status(404).json({ error : "User does not exist" });
  }
  
});

// Get Customer info
router.get("/auth", validateToken, (req, res) => {
    res.json(req.customer);
})


module.exports = router;