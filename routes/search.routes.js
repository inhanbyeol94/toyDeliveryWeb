const express = require('express');
const router = express.Router();

const SearchController = require('../controllers/search.controller');
const searchController = new SearchController();

router.get('/restaurant/search/keyword', searchController.keyword); //keyword 로 검색
router.get('/restaurant/search/menu', searchController.menu); //메뉴로 검색

// //category로 검색을 하려면 restaurant 테이블에 category 컬럼 추가해야할 거같아서 일단 보류
// router.get('/restaurant/search/category', searchController.category); //카테고리로 검색

module.exports = router;
