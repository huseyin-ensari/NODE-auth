const { body } = require('express-validator');

const newUserValidation = () => {
  return [
    body('name', 'Name is required')
      .isLength({ min: 2 })
      .withMessage('Name must be minimum 2 character')
      .exists(),
    body('lastname', 'Lastname is required').exists(),
    body('email', 'Email is required').exists().isEmail().trim(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be 6 character')
      .trim()
      .exists(),
    body('repassword')
      .trim()
      .exists()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password must be same');
        }
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body('email', 'Email is not valid').isEmail().trim().exists(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password in not valid')
      .trim()
      .exists(),
  ];
};

const emailValidation = () => {
  return [body('email', 'Email is not valid').isEmail().trim().exists()];
};

const newPasswordValidation = () => {
  return [
    body('password', 'Password required')
      .isLength({ min: 6 })
      .withMessage('Password was be 6 character')
      .trim()
      .exists(),
    body('repassword')
      .trim()
      .exists()
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error('Passwords must be some');
        }
        return true;
      }),
  ];
};

module.exports = {
  newUserValidation,
  loginValidation,
  emailValidation,
  newPasswordValidation,
};
