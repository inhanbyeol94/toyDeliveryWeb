const express = require('express');
const router = express.Router();

const MembersController = require('../controllers/members.controller');
const membersController = new MembersController();

router.post('/signup', membersController.signup);
router.post('/login', membersController.login);
router.get('/member_info', membersController.getMember);
router.put('/member_info/:member_id', membersController.updateMember);
router.delete('/member_info/:member_id', membersController.deleteMember);

module.exports = router;
