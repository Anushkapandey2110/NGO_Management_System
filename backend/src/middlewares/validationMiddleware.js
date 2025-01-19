const { body, validationResult } = require('express-validator');

exports.validateRegister = [
    
    body('Email').isEmail().withMessage('Email is invalid'),
    body('Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('ConfirmPassword').custom((value, { req }) => {
        if (value !== req.body.Password) {
            console.log(req.body)
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    (req, res, next) => {
        console.log("Validating")
        const errors = validationResult(req);
        console.log("Erros are: ",errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];

