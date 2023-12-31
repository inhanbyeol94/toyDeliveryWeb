const express = require('express');
const router = express.Router();

const { allAuthMiddleware } = require('../middlewares/api.auth.middleware');

const PointController = require('../controllers/points.controller');
const pointController = new PointController();

router.get('/member_info/point', allAuthMiddleware, pointController.getPoint);
router.get('/member_info/point/history', allAuthMiddleware, pointController.getPointHistory);
router.post('/member_info/point', allAuthMiddleware, pointController.createPoint);

module.exports = router;
