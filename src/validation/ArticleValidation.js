const { check, validationResult } = require('express-validator/check');

exports.validate = [
  check('title','Title must not empty').isLength({min: 1}),
  check('content', 'Content must not empty').isLength({min: 1}),
  check('images').isLength({ min: 0 }),
  (req, res, next) => { 
    try {
      validationResult(req).throw();
      next();
    } catch (e) {
      console.log(req.body.images)
      res.status(422).json({ errors: e.mapped() });
    }
  }
]
