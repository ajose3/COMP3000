const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) return res.json({ error: "Customer not logged in!" });

    try {
        const validToken = verify(accessToken, "importantsecret");
        req.customer = validToken;

        if (validToken) {
            return next();
        }
    } catch (err) {
        return res.json({ error: "Please login to continue" });
    }
};

module.exports = { validateToken };