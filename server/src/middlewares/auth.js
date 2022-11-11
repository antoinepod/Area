const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../configs/auth.config").SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }
    jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(404).json({ error: "Unauthorized" });
        }
        req.user = decoded;
        res.json({ auth: "true" });
        next();
    }
    );
    }


module.exports = {
  verifyToken,
};
