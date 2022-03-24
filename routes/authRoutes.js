const { Router } = require('express');
const { default: rateLimit } = require('express-rate-limit');
const authController = require('../controllers/authController');
const {requireAuth, checkUser } = require('../middleware/authMiddleware');

const router = Router();

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


router.get('/signup', authController.signup_get);
router.post('/signup',apiLimiter, authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login',apiLimiter, authController.login_post);
router.get('/logout',requireAuth, authController.logout_get);
router.get('/delete',requireAuth, authController.delete_page_get);

router.delete('/delete',requireAuth,checkUser, authController.delete_user)

module.exports = router;