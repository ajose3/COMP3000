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

    const { Email, Password } = req.body;

    const customer = await Customers.findOne({ where: { Email } }).catch((err) => {
        console.log("Error: ", err);
    });

    if (!customer) {
        return res.json({ error: "Customer does not exist!" });
    }

    
    const password_valid = await bcrypt.compare(Password, customer.Password);

    if (!password_valid) {
        return res.json({ error: "Password does not match" });
    }


    const accessToken = sign(
        { Email: customer.Email, CustomerID: customer.CustomerID },
        "importantsecret"
      );
      res.json({token: accessToken, Email: customer.Email, CustomerID: customer.CustomerID});

     
});




// Get Customer info
router.get("/auth", validateToken, (req, res) => {
    res.json(req.customer);
});

router.get("/userInfo/:CustomerID", async (req, res) => {
    const CustomerID = req.params.CustomerID;
    
    const userInfo = await Customers.findByPk(CustomerID, { 
        attributes: { exclude: ['Password'] }, 
    });

    res.json(userInfo);
});


// Change Password
router.put("/changepassword", validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const customer = await Customers.findOne({ where : {Email : req.customer.Email }});

    if (customer) {
        const compareOld = await bcrypt.compare(oldPassword, customer.Password);
        const compareNew = await bcrypt.compare(oldPassword, newPassword);

        if (!compareOld) {
            return res.json({ error: "Old password is not correct" });
        }

        if (oldPassword === newPassword) {
            return res.json({ error: "Password cannot be the same as previous "});
        }

        bcrypt.hash(newPassword, 10).then((hash) => {
            Customers.update(
                { Password: hash },
                { where: { Email: req.customer.Email }}
            );
            return res.json("Success");
        });
        
    }

});

module.exports = router;