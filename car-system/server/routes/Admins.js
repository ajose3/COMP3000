const express = require('express');
const router = express.Router();
const { Admins } = require('../models');
const bcrypt = require('bcrypt');

// Register Admin
router.post('/', (req, res) => {
    const adminData = {
        Username: req.body.Username,
        Password: req.body.Password,
    }
  
    Admins.findOne({
        where: {
            Username: req.body.Username
        }
    })
        .then(admin => {
            if (!admin) {
                bcrypt.hash(req.body.Password, 10, (err, hash) => {
                adminData.Password = hash
                Admins.create(adminData)
                    .then(admin => {
                        res.json({ status: admin.Username + 'REGISTERED' })
                    })
                    .catch(err => {
                        res.send('ERROR: ' + err)
                    })
                })
            } else {
                res.json({ error: "ADMIN ALREADY EXISTS" })
            }
        })
        .catch(err => {
            res.send('ERROR: ' + err)
        })
});

// Login Admin 
router.post('/login', async (req, res) => {

    const { Username, Password } = req.body;

    const adminWithUsername = await Admins.findOne({ where: { Username } }).catch((err) => {
        console.log("Error: ", err);
    });

    if (!adminWithUsername) {
        return res.json({ error: "Admin does not exist!" });
    }

    const password_valid = await bcrypt.compare(Password, adminWithUsername.Password);

    if (!password_valid) {
        return res.json({ error: "Password does not match" });
    }

    res.json("LOGGED IN!");

});

module.exports = router;