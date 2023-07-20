const express = require('express');
const router = express.Router();

const { adminAuthMiddleware } = require('../middlewares/api.auth.middleware');
const { keywordValidation } = require('../middlewares/validations/keywords.validation');

const KeywordController = require('../controllers/keywords.controller');
const keywordController = new KeywordController();

router.post('/restaurant/:restaurant_id/keyword', adminAuthMiddleware, keywordValidation, keywordController.createKeyword);
router.get('/restaurant/:restaurant_id/keyword', keywordController.getKeyword);
router.put('/restaurant/:restaurant_id/keyword/:keyword_id', adminAuthMiddleware, keywordController.updateKeyword);
router.delete('/restaurant/:restaurant_id/keyword/:keyword_id', adminAuthMiddleware, keywordController.deleteKeyword);

module.exports = router;
