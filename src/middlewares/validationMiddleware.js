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

module.exports = {
  newUserValidation,
};
