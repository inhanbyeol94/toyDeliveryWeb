const express = require('express');
const router = express.Router();

const PointController = require('../controllers/points.controller');
const pointController = new PointController();

// router.get('/member_info/:member_id/point', pointController.getPoint);
// router.post('/member_info/:member_id/point', pointController.createPoint);

module.exports = router;
