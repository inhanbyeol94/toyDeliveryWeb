const express = require('express');
const router = express.Router();

const { searchValidation } = require('../middlewares/validations/keywords.validation');

const SearchController = require('../controllers/search.controller');
const searchController = new SearchController();

router.post('/search/keyword', searchValidation, searchController.keyword); //keyword 로 검색
router.post('/search/menu', searchValidation, searchController.menu); //메뉴로 검색
router.post('/search/category', searchValidation, searchController.category); //카테고리로 검색

module.exports = router;
