const express = require('express');
const router = express.Router();

const KeywordController = require('../controllers/keywords.controller');
const keywordController = new KeywordController();

router.post('/restaurant/:restaurant_id/keyword', keywordController.createKeyword);
router.get('/restaurant/:restaurant_id/keyword', keywordController.getKeyword);
router.put('/restaurant/:restaurant_id/keyword/:keyword_id', keywordController.updateKeyword);
router.delete('/restaurant/:restaurant_id/keyword/:keyword_id', keywordController.deleteKeyword);

module.exports = router;
