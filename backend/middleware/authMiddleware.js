const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not authorized, no token"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, "secret123");

        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = authMiddleware;
