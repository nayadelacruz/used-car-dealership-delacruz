// src/middleware/validation/validationErrorHandler.js

import { validationResult } from 'express-validator';

const validationErrorHandler = (redirectTarget) => {
    return (req, res, next) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next();
        }

        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });

        const redirectPath =
            typeof redirectTarget === 'function'
                ? redirectTarget(req)
                : redirectTarget;

        return res.redirect(redirectPath);
    };
};

export default validationErrorHandler;