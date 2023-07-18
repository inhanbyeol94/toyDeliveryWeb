const express = require('express');
const router = express.Router();

const { allAuthMiddleware, nonAuthMiddleware } = require('../middlewares/auth.middleware');
const { signupValidation, loginValidation, isEmailValidation } = require('../middlewares/validations/members.validation');

const MembersController = require('../controllers/members.controller');
const membersController = new MembersController();

router.post('/user/signup', nonAuthMiddleware, signupValidation, membersController.signUp);
router.post('/admin/signup', nonAuthMiddleware, signupValidation, membersController.signUp);
router.post('/signup/emailvalid', nonAuthMiddleware, isEmailValidation, membersController.isEmailValid);
router.post('/user/login', nonAuthMiddleware, loginValidation, membersController.login);
router.post('/admin/login', nonAuthMiddleware, loginValidation, membersController.login);
router.get('/logout', allAuthMiddleware, membersController.logout);
// router.get('/member_info', membersController.getMember);
// router.put('/member_info/:member_id', membersController.updateMember);
// router.delete('/member_info/:member_id', membersController.deleteMember);

module.exports = router;
