const express = require('express');
const router = express.Router();
const { Agents } = require('../models');
const bcrypt = require('bcrypt');
const {validateAgent} = require('../middlewares/AgentMiddleWare');
const {sign} = require("jsonwebtoken");

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

    const agentToken = sign(
        { Username: agent.Username, AgentID: agent.AgentID },
        "agentsecret"
      );

    res.json({token: agentToken, Username: Username, AgentID: agent.AgentID});

});

router.get("/auth", validateAgent, (req, res) => {
    res.json(req.agent);
});


module.exports = router;