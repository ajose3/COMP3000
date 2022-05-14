const express = require('express');
const router = express.Router();
const { Agents } = require('../models');
const bcrypt = require('bcrypt');
const { validateToken } = require("../middlewares/AuthMiddleware");
const {sign} = require("jsonwebtoken");

// Get All Admins
router.get("/", async (req, res) => {
    const listOfAgents = await Agents.findAll();
    res.json(listOfAgents);
});

router.post('/regAgent', (req, res) => {
    const agentData = {
        Username: req.body.Username,
        Password: req.body.Password,
    }
  
    Agents.findOne({
        where: {
            Username: req.body.Username
        }
    })
        .then(agent => {
            if (!agent) {
                bcrypt.hash(req.body.Password, 10, (err, hash) => {
                agentData.Password = hash
                Agents.create(agentData)
                    .then(agent => {
                        res.json({ status: agent.Username + 'REGISTERED' })
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

    const agent = await Agents.findOne({ where: { Username } }).catch((err) => {
        console.log("Error: ", err);
    });

    if (!agent) {
        return res.json({ error: "Admin does not exist!" });
    }

    const password_valid = await bcrypt.compare(Password, agent.Password);

    if (!password_valid) {
        return res.json({ error: "Password does not match" });
    }

    const accessToken = sign(
        { Username: agent.Username, AgentID: agent.AgentID },
        "importantsecret"
      );
    
    res.json({ token: accessToken, Username: agent.Username, AgentID: agent.AgentID });

});

router.get("/auth", validateToken, (req, res) => {
    res.json(req.agent);
});


// Change Password
router.put("/changepassword", validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const agent = await Agents.findOne({ where : {Username : req.agent.Username }});

    if (agent) {
        const compareOld = await bcrypt.compare(oldPassword, agent.Password);
        const compareNew = await bcrypt.compare(oldPassword, newPassword);

        if (!compareOld) {
            return res.json({ error: "Old password is not correct" });
        }

        if (oldPassword === newPassword) {
            return res.json({ error: "Password cannot be the same as previous "});
        }

        bcrypt.hash(newPassword, 10).then((hash) => {
            Agents.update(
                { Password: hash },
                { where: { Username: req.agent.Username }}
            );
            return res.json("Success");
        });
        
    }

});


// Delete Agents

router.delete('/:Username', async (req, res) => {
    const { Username } = req.params;

    const row = await Agents.findOne({
        where: { Username: Username },
      }).catch((err) => {
        console.log("Error: ", err);
    });
      
      if (row) {
        await row.destroy(); // deletes the row
      }

      res.json("Deleted successfully!")

});


module.exports = router;