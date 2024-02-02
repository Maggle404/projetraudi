




exports.checkCompta = (req, res, next) => {
    if (req.user && req.user.role === 'comptable') {
        next();
    } else {
        res.status(403).json({ message: 'NUH UH' });
    }
}