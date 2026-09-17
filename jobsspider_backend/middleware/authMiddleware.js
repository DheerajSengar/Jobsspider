const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'jobspider_super_secret_jwt_key_2026';

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
    }

    if (!token) {
        return res.status(401).json({ status: false, message: 'Access denied. Authorization token missing.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        return res.status(401).json({ status: false, message: 'Invalid or expired authentication token.' });
    }
}

function verifyAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
    }

    if (!token) {
        return res.status(401).json({ status: false, message: 'Access denied. Admin authorization token missing.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ status: false, message: 'Forbidden. Admin credentials required.' });
        }
        req.admin = decoded;
        next();
    } catch (ex) {
        return res.status(401).json({ status: false, message: 'Invalid or expired admin token.' });
    }
}

function generateToken(payload, expiresIn = '7d') {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

module.exports = {
    verifyToken,
    verifyAdmin,
    generateToken,
    JWT_SECRET
};
