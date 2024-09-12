const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.cookies.token;
    const token = authHeader && authHeader.split(' ')[1]; 
    console.log("IS HERE 2")
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token is required'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Invalid token'
            });
        }
        req.user = user; 
        next(); 
    });
};

module.exports = verifyToken;
