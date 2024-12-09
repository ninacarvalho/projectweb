const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach user info to the request object
        next(); // Continue to the next middleware or route handler
    } catch (err) {
        res.status(403).json({ message: 'Invalid Token' });
    }
};

module.exports = { verifyToken };
