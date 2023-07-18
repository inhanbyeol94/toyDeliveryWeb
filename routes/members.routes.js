const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const { signupValidation } = require('../middlewares/validations/members.validation');

const MembersController = require('../controllers/members.controller');
const membersController = new MembersController();

router.post('/signup', signupValidation, membersController.signUp);
router.post('/signup/emailvalid', membersController.isEmailValid);
router.post('/login', membersController.login);
router.get('/logout', authMiddleware, membersController.logout);
// router.get('/member_info', membersController.getMember);
// router.put('/member_info/:member_id', membersController.updateMember);
// router.delete('/member_info/:member_id', membersController.deleteMember);

module.exports = router;
