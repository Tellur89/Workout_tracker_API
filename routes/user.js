const { Router } = require('express');
const { loginUser, signupUser } = require('../controllers/userController');

const router = Router();

router.route('/login').post(loginUser);
router.route('/signup').post(signupUser);

module.exports = router;
