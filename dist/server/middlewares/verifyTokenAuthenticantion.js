"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminAuth = exports.verifyTokenAuthentication = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function verifyTokenAuthentication(req, res, next) {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: 'token missing' });
    }
    const token = header.split(' ')[1];
    try {
        const { name, adm, department, sub } = (0, jsonwebtoken_1.verify)(token, process.env.SECRET);
        req.user = {
            id: sub,
            name,
            adm,
            department
        };
        return next();
    }
    catch (error) {
        return res.status(401).json({ message: "token is not valid" });
    }
}
exports.verifyTokenAuthentication = verifyTokenAuthentication;
const verifyAdminAuth = (req, res, next) => {
    if (req.user && req.user.adm) {
        next();
    }
    else {
        return res.status(403).json({ message: 'Acesso restrito a administradores' });
    }
};
exports.verifyAdminAuth = verifyAdminAuth;
