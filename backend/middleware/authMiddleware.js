const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log("AUTH MIDDLEWARE HIT");
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not authorized, no token"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, "secret123");

        console.log("USER FROM TOKEN:", decoded);

        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = authMiddleware;
