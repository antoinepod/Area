const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../configs/auth.config").SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }
    jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = decoded;
        // res.json({ auth: "true" });
        next();
    }
    );
    }

// function verifyToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(403);
//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) return res.sendStatus(404);
//     req.user = user;
//     next();
//   });
// }

module.exports = {
  verifyToken,
};
