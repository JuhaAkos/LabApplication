import { expressjwt } from "express-jwt";

export const checkUser = expressjwt({
    secret: "mySecretKey",
    algorithms: ["HS256"]
});

export const isUserOneOf = (roles: string[]) => {
    return (req, res, next) => {
        const userRole = req.auth.role;

        if (roles.includes(userRole)) {
            next(null, req, res, next);
        } else {
            const err = new Error('This role is not having access to this function.');
            err.name = 'RoleMismatchError';
            next(err);
        }
    }
}

export const handleRoleMismatchError = (err, req, res, next) => {
    if (err.name === "RoleMismatchError") {
        res.status(403).send({ error: err.message });
    } else {
        next(err);
    }
}

export const handleAuthorizationError = (err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).send({ error: 'Authentication is required for this operation.' });
    } else {
        next(err);
    }
};