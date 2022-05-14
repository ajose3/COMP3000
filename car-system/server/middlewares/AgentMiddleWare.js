const { verify } = require("jsonwebtoken");

const validateAgent = (req, res, next) => {
    const agentToken = req.header("agentToken");

    if(!agentToken) return res.json({ error: "Agent not authenticated" });

    try {
        const validAgent = verify(agentToken, "agentsecret");
        req.agent = validAgent;
        if (validAgent) {
            return next();
        }
    } catch (err) {
        return res.json({ error: err });
    }
};

module.exports = { validateAgent };