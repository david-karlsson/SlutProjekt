const { Router } = require('express');
const radioController = require('../controllers/radioController');
const { requireAuth } = require('../middleware/authMiddleware');
// const { apiFetch }  = require('../middleware/apiGetter');
const router = Router();

router.post('/favorite', requireAuth, radioController.selectFavoriteStation);
router.get('/favorite', radioController.radioStations_get);
router.get('/radioStations',requireAuth, radioController.radioStationsSelection_get);
router.post('/addRadio',radioController.radioAdd)

module.exports = router;