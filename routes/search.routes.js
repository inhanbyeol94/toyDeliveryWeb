const express = require('express');
const router = express.Router();

const SearchController = require('../controllers/search.controller');
const searchController = new SearchController();

//인코딩으로 값을 받기 때문에 validation은 사용x

router.get('/search/keyword/:search', searchController.keyword); //keyword 로 검색
router.get('/search/menu/:search', searchController.menu); //메뉴로 검색
router.get('/search/category/:search', searchController.category); //카테고리로 검색

module.exports = router;
