const express = require('express');
const router = express.Router();

const KeywordController = require('../controllers/keywords.controller');
const keywordController = new KeywordController();

// router.post('/restaurant/:restaurant_id', keywordController.createKeyword);
// router.get('/restaurant/:restaurant_id', keywordController.getKeyword);
// router.put('/restaurant/:restaurant_id', keywordController.updateKeyword);
// router.delete('/restaurant/:restaurant_id', keywordController.deleteKeyword);

module.exports = router;
